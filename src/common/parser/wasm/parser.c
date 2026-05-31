/* Copyright (c) 2026 The xterm.js authors. All rights reserved.
 * @license MIT */

#include "parser.h"
#include "transition_table.h"
#include <stddef.h>

/* Static transition table is linked at 65536; scratch must sit above it. */
#define MEM_BASE 65536
#define PARSER_TABLE_BYTE_SIZE (PARSER_TABLE_SIZE * sizeof(uint16_t))
#define MEM_STATE (((MEM_BASE + PARSER_TABLE_BYTE_SIZE) + 255u) & ~255u)
/* ParserWasmState is ~2.3KB; keep header and op buffers past it */
#define MEM_HEADER (MEM_STATE + 2048)
#define MEM_KINDS (MEM_HEADER + 64)
#define MEM_STARTS (MEM_KINDS + PARSER_MAX_OPS)
#define MEM_LENGTHS (MEM_STARTS + PARSER_MAX_OPS * 4)
#define MEM_AUX (MEM_LENGTHS + PARSER_MAX_OPS * 4)
#define MEM_PARAM_STARTS (MEM_AUX + PARSER_MAX_OPS * 4)
#define MEM_PARAM_COUNTS (MEM_PARAM_STARTS + PARSER_MAX_OPS * 4)
#define MEM_PARAMS_ARENA (MEM_PARAM_COUNTS + PARSER_MAX_OPS * 2) /* uint16 param counts */
#define MEM_INPUT_BASE (MEM_PARAMS_ARENA + PARSER_MAX_PARAMS * 4)

static ParserWasmState *state(void) { return (ParserWasmState *)(uintptr_t)MEM_STATE; }
static ParserScanHeader *header(void) { return (ParserScanHeader *)(uintptr_t)MEM_HEADER; }
static uint8_t *kinds(void) { return (uint8_t *)(uintptr_t)MEM_KINDS; }
static uint32_t *starts(void) { return (uint32_t *)(uintptr_t)MEM_STARTS; }
static uint32_t *lengths(void) { return (uint32_t *)(uintptr_t)MEM_LENGTHS; }
static uint32_t *aux(void) { return (uint32_t *)(uintptr_t)MEM_AUX; }
static uint32_t *param_starts(void) { return (uint32_t *)(uintptr_t)MEM_PARAM_STARTS; }
static uint16_t *param_counts(void) { return (uint16_t *)(uintptr_t)MEM_PARAM_COUNTS; }
static int32_t *params_arena(void) { return (int32_t *)(uintptr_t)MEM_PARAMS_ARENA; }
static uint32_t *input(void) { return (uint32_t *)(uintptr_t)MEM_INPUT_BASE; }

static uint32_t transition_lookup(uint32_t st, uint32_t code) {
  uint32_t idx = code < PARSER_NON_ASCII_PRINTABLE ? code : PARSER_NON_ASCII_PRINTABLE;
  return PARSER_TRANSITION_TABLE[st << PARSER_TABLE_INDEX_STATE_SHIFT | idx];
}

static void params_reset_zdm(ParserWasmState *s) {
  s->params_len = 1;
  s->subparams_len = 0;
  s->reject_digits = 0;
  s->reject_sub_digits = 0;
  s->digit_is_sub = 0;
  s->subparams_idx[0] = 0;
  s->params[0] = 0;
}

static void params_reset(ParserWasmState *s) {
  s->params_len = 0;
  s->subparams_len = 0;
  s->reject_digits = 0;
  s->reject_sub_digits = 0;
  s->digit_is_sub = 0;
}

static void params_add_param(ParserWasmState *s, int32_t value) {
  s->digit_is_sub = 0;
  if (s->params_len >= PARSER_PARAMS_MAX_LEN) {
    s->reject_digits = 1;
    return;
  }
  s->subparams_idx[s->params_len] = (uint16_t)(s->subparams_len << 8 | s->subparams_len);
  if (value < 0) value = 0;
  if (value > 0x7FFFFFFF) value = 0x7FFFFFFF;
  s->params[s->params_len++] = value;
}

static void params_add_subparam(ParserWasmState *s, int32_t value) {
  s->digit_is_sub = 1;
  if (!s->params_len) return;
  if (s->reject_digits || s->subparams_len >= PARSER_SUBPARAMS_MAX_LEN) {
    s->reject_sub_digits = 1;
    return;
  }
  if (value < 0) value = -1;
  if (value > 0x7FFFFFFF) value = 0x7FFFFFFF;
  s->subparams[s->subparams_len++] = value;
  s->subparams_idx[s->params_len - 1]++;
}

static void params_add_digit(ParserWasmState *s, int32_t digit) {
  uint32_t len;
  if (s->reject_digits) return;
  len = s->digit_is_sub ? s->subparams_len : s->params_len;
  if (!len) return;
  if (s->digit_is_sub && s->reject_sub_digits) return;
  int32_t *store = s->digit_is_sub ? s->subparams : s->params;
  int32_t cur = store[len - 1];
  store[len - 1] = cur >= 0 ? (cur * 10 + digit > 0x7FFFFFFF ? 0x7FFFFFFF : cur * 10 + digit) : digit;
}

static int params_is_zdm_default(const ParserWasmState *s) {
  return s->params_len == 1 && s->params[0] == 0 && s->subparams_len == 0;
}

static void copy_params_to_arena(uint32_t op_idx, ParserWasmState *s) {
  uint32_t start = header()->params_arena_len;
  param_starts()[op_idx] = start;
  param_counts()[op_idx] = (uint16_t)s->params_len;
  if (s->subparams_len == 0) {
    for (uint32_t pi = 0; pi < s->params_len; pi++) {
      if (header()->params_arena_len >= PARSER_MAX_PARAMS) return;
      params_arena()[header()->params_arena_len++] = s->params[pi];
    }
    return;
  }
  for (uint32_t i = 0; i < s->params_len; i++) {
    if (header()->params_arena_len >= PARSER_MAX_PARAMS) return;
    params_arena()[header()->params_arena_len++] = s->params[i];
    uint16_t idx = s->subparams_idx[i];
    uint32_t sub_start = idx >> 8;
    uint32_t sub_end = idx & 0xFF;
    for (uint32_t k = sub_start; k < sub_end; k++) {
      if (header()->params_arena_len >= PARSER_MAX_PARAMS) return;
      int32_t sv = s->subparams[k];
      uint32_t encoded = 0x80000000u | (uint32_t)(sv < 0 ? 0x7FFFFFFF : sv);
      params_arena()[header()->params_arena_len++] = encoded;
    }
  }
}

static int emit_op(uint8_t kind, uint32_t start, uint32_t length, uint32_t aux_val, ParserWasmState *s) {
  uint32_t idx = header()->op_count;
  if (idx > 0) {
    uint32_t prev = idx - 1;
    if (kind == OP_EXECUTE && kinds()[prev] == OP_EXECUTE && aux()[prev] == aux_val) {
      lengths()[prev] += length ? length : 1;
      return (int)prev;
    }
    if (kind == OP_ESC && kinds()[prev] == OP_ESC && aux()[prev] == aux_val) {
      lengths()[prev] += length ? length : 1;
      return (int)prev;
    }
    if (kind == OP_PRINT && kinds()[prev] == OP_PRINT && aux()[prev] == 0) {
      lengths()[prev] += length;
      return (int)prev;
    }
  }
  if (idx >= PARSER_MAX_OPS) return -1;
  kinds()[idx] = kind;
  starts()[idx] = start;
  if ((kind == OP_EXECUTE || kind == OP_ESC) && length == 0) {
    lengths()[idx] = 1;
  } else {
    lengths()[idx] = length;
  }
  aux()[idx] = aux_val;
  if (kind == OP_CSI || kind == OP_DCS_HOOK) {
    uint32_t input_pos = start;
    if (params_is_zdm_default(s)) {
      param_starts()[idx] = 0;
      param_counts()[idx] = 0;
    } else {
      copy_params_to_arena(idx, s);
    }
    lengths()[idx] = input_pos;
    starts()[idx] = param_starts()[idx];
  } else if (kind == OP_ESC) {
    uint32_t input_pos = start;
    uint32_t repeat = lengths()[idx];
    copy_params_to_arena(idx, s);
    starts()[idx] = input_pos;
    lengths()[idx] = repeat;
  } else {
    param_starts()[idx] = 0;
    param_counts()[idx] = 0;
  }
  header()->op_count++;
  return (int)idx;
}

static int is_printable(uint32_t code) {
  return (code >= 0x20 && code <= 0x7e) || code >= PARSER_NON_ASCII_PRINTABLE;
}

__attribute__((export_name("reset")))
void reset(void) {
  ParserWasmState *s = state();
  s->current_state = PARSER_STATE_GROUND;
  s->collect = 0;
  s->preceding_join_state = 0;
  s->osc_start = 0;
  s->dcs_start = 0;
  s->apc_start = 0;
  params_reset_zdm(s);
  header()->op_count = 0;
  header()->input_len = 0;
  header()->params_arena_len = 0;
  header()->scan_offset = 0;
}

__attribute__((export_name("get_input_ptr")))
uint32_t get_input_ptr(void) { return MEM_INPUT_BASE; }

__attribute__((export_name("get_kinds_ptr")))
uint32_t get_kinds_ptr(void) { return MEM_KINDS; }

__attribute__((export_name("get_starts_ptr")))
uint32_t get_starts_ptr(void) { return MEM_STARTS; }

__attribute__((export_name("get_lengths_ptr")))
uint32_t get_lengths_ptr(void) { return MEM_LENGTHS; }

__attribute__((export_name("get_aux_ptr")))
uint32_t get_aux_ptr(void) { return MEM_AUX; }

__attribute__((export_name("get_param_starts_ptr")))
uint32_t get_param_starts_ptr(void) { return MEM_PARAM_STARTS; }

__attribute__((export_name("get_param_counts_ptr")))
uint32_t get_param_counts_ptr(void) { return MEM_PARAM_COUNTS; }

__attribute__((export_name("get_params_ptr")))
uint32_t get_params_ptr(void) { return MEM_PARAMS_ARENA; }

__attribute__((export_name("get_state_ptr")))
uint32_t get_state_ptr(void) { return MEM_STATE; }

__attribute__((export_name("get_header_ptr")))
uint32_t get_header_ptr(void) { return MEM_HEADER; }

__attribute__((export_name("set_state")))
void set_state(uint32_t current_state, uint32_t collect) {
  state()->current_state = current_state;
  state()->collect = collect;
}

__attribute__((export_name("export_params_to")))
void export_params_to(uint32_t dst_ptr, uint32_t max_len) {
  ParserWasmState *s = state();
  int32_t *dst = (int32_t *)(uintptr_t)dst_ptr;
  uint32_t n = s->params_len < max_len ? s->params_len : max_len;
  for (uint32_t i = 0; i < n; i++) {
    dst[i] = s->params[i];
  }
}

__attribute__((export_name("get_params_len")))
uint32_t get_params_len(void) {
  return state()->params_len;
}

__attribute__((export_name("get_subparams_len")))
uint32_t get_subparams_len(void) {
  return state()->subparams_len;
}

__attribute__((export_name("get_subparams_ptr")))
uint32_t get_subparams_ptr(void) {
  return (uint32_t)(uintptr_t)state()->subparams;
}

__attribute__((export_name("get_subparams_idx_ptr")))
uint32_t get_subparams_idx_ptr(void) {
  return (uint32_t)(uintptr_t)state()->subparams_idx;
}

__attribute__((export_name("sync_params_from")))
void sync_params_from(uint32_t src_ptr, uint32_t len) {
  ParserWasmState *s = state();
  const int32_t *src = (const int32_t *)(uintptr_t)src_ptr;
  s->params_len = len > PARSER_PARAMS_MAX_LEN ? PARSER_PARAMS_MAX_LEN : len;
  for (uint32_t i = 0; i < s->params_len; i++) {
    s->params[i] = src[i];
  }
  s->subparams_len = 0;
  s->reject_digits = 0;
  s->reject_sub_digits = 0;
  s->digit_is_sub = 0;
}

__attribute__((export_name("probe_action")))
uint32_t probe_action(uint32_t state_id, uint32_t code) {
  uint32_t tr = transition_lookup(state_id, code);
  return tr >> PARSER_TABLE_ACTION_SHIFT;
}

static int emit_or_stop(uint8_t kind, uint32_t start, uint32_t length, uint32_t aux_val, ParserWasmState *s, uint32_t stop_at) {
  if (emit_op(kind, start, length, aux_val, s) < 0) {
    header()->scan_offset = stop_at;
    return 0;
  }
  return 1;
}

static __attribute__((always_inline)) int emit_esc_dispatch(uint32_t pos, uint32_t ident, uint32_t stop_at, ParserWasmState *s) {
  ParserScanHeader *h = header();
  uint32_t idx = h->op_count;
  if (idx > 0) {
    uint32_t prev = idx - 1;
    if (kinds()[prev] == OP_ESC && aux()[prev] == ident) {
      lengths()[prev] += 1;
      return (int)prev;
    }
  }
  if (idx >= PARSER_MAX_OPS) {
    h->scan_offset = stop_at;
    return -1;
  }
  kinds()[idx] = OP_ESC;
  starts()[idx] = pos;
  lengths()[idx] = 1;
  aux()[idx] = ident;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  h->op_count++;
  return (int)idx;
}

static __attribute__((always_inline)) int emit_csi_zdm(uint32_t final_idx, uint32_t ident, uint32_t stop_at) {
  ParserScanHeader *h = header();
  uint32_t idx = h->op_count;
  if (idx >= PARSER_MAX_OPS) {
    h->scan_offset = stop_at;
    return -1;
  }
  kinds()[idx] = OP_CSI;
  starts()[idx] = 0;
  lengths()[idx] = final_idx;
  aux()[idx] = ident;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  h->op_count++;
  return (int)idx;
}

static __attribute__((always_inline)) int emit_csi_params_direct(
  uint32_t final_idx,
  uint32_t ident,
  const int32_t *parsed_params,
  uint32_t count,
  uint32_t stop_at
) {
  ParserScanHeader *h = header();
  uint32_t idx = h->op_count;
  uint32_t start = h->params_arena_len;
  if (idx >= PARSER_MAX_OPS) {
    h->scan_offset = stop_at;
    return -1;
  }
  kinds()[idx] = OP_CSI;
  starts()[idx] = start;
  lengths()[idx] = final_idx;
  aux()[idx] = ident;
  param_starts()[idx] = start;
  param_counts()[idx] = (uint16_t)count;
  for (uint32_t pi = 0; pi < count; pi++) {
    if (h->params_arena_len >= PARSER_MAX_PARAMS) break;
    params_arena()[h->params_arena_len++] = parsed_params[pi];
  }
  h->op_count++;
  return (int)idx;
}

static __attribute__((always_inline)) int is_dcs_payload(uint32_t code) {
  return code != 0x18 && code != 0x1a && code != 0x1b &&
    (code <= 0x7f || code >= PARSER_NON_ASCII_PRINTABLE);
}

static __attribute__((always_inline)) int is_apc_payload(uint32_t code) {
  return (code >= 0x20 && code < 0x7f) ||
    (code >= 0x08 && code < 0x0e) ||
    code >= PARSER_NON_ASCII_PRINTABLE;
}

static __attribute__((always_inline)) int emit_dcs_sequence_direct(
  uint32_t hook_pos,
  uint32_t ident,
  uint32_t payload_start,
  uint32_t payload_len,
  uint32_t term_pos,
  uint32_t stop_at
) {
  ParserScanHeader *h = header();
  uint32_t idx = h->op_count;
  uint32_t needed = 2 + (payload_len > 0);
  if (idx + needed > PARSER_MAX_OPS) {
    h->scan_offset = stop_at;
    return -1;
  }
  kinds()[idx] = OP_DCS_HOOK;
  starts()[idx] = 0;
  lengths()[idx] = hook_pos;
  aux()[idx] = ident;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  idx++;
  if (payload_len > 0) {
    kinds()[idx] = OP_DCS_PUT;
    starts()[idx] = payload_start;
    lengths()[idx] = payload_len;
    aux()[idx] = 0;
    param_starts()[idx] = 0;
    param_counts()[idx] = 0;
    idx++;
  }
  kinds()[idx] = OP_DCS_UNHOOK;
  starts()[idx] = term_pos;
  lengths()[idx] = 0;
  aux()[idx] = 0x1b;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  h->op_count = idx + 1;
  return (int)idx;
}

static __attribute__((always_inline)) int emit_apc_sequence_direct(
  uint32_t start_pos,
  uint32_t ident,
  uint32_t payload_start,
  uint32_t payload_len,
  uint32_t term_pos,
  uint32_t stop_at
) {
  ParserScanHeader *h = header();
  uint32_t idx = h->op_count;
  uint32_t needed = 2 + (payload_len > 0);
  if (idx + needed > PARSER_MAX_OPS) {
    h->scan_offset = stop_at;
    return -1;
  }
  kinds()[idx] = OP_APC_START;
  starts()[idx] = start_pos;
  lengths()[idx] = 0;
  aux()[idx] = ident;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  idx++;
  if (payload_len > 0) {
    kinds()[idx] = OP_APC_PUT;
    starts()[idx] = payload_start;
    lengths()[idx] = payload_len;
    aux()[idx] = 0;
    param_starts()[idx] = 0;
    param_counts()[idx] = 0;
    idx++;
  }
  kinds()[idx] = OP_APC_END;
  starts()[idx] = term_pos;
  lengths()[idx] = 0;
  aux()[idx] = 0x1b;
  param_starts()[idx] = 0;
  param_counts()[idx] = 0;
  h->op_count = idx + 1;
  return (int)idx;
}

__attribute__((export_name("scan")))
int32_t scan(uint32_t offset, uint32_t length) {
  ParserWasmState *s = state();
  ParserScanHeader *h = header();
  h->op_count = 0;
  h->params_arena_len = 0;
  h->input_len = length;
  uint32_t i = offset;
  uint32_t code;
  uint32_t transition;
  uint32_t action;
  uint32_t print_start;

  while (i < length) {
    code = input()[i];

    if (s->current_state == PARSER_STATE_GROUND && is_printable(code)) {
      print_start = i;
      uint32_t c = i;
      uint32_t l4 = length > 4 ? length - 4 : 0;
      while (c < l4 && is_printable(input()[c]) && is_printable(input()[c + 1]) &&
             is_printable(input()[c + 2]) && is_printable(input()[c + 3])) {
        c += 4;
      }
      while (c < length && is_printable(input()[c])) c++;
      if (!emit_or_stop(OP_PRINT, print_start, c - print_start, 0, s, i)) {
        return h->op_count > 0 ? (int32_t)h->op_count : -1;
      }
      i = c;
      continue;
    }

    if (code < 0x18 && s->current_state <= PARSER_STATE_CSI_PARAM + 2) {
      uint32_t run = 1;
      while (i + run < length && input()[i + run] == code) run++;
      if (!emit_or_stop(OP_EXECUTE, i, run, code, s, i + run - 1)) {
        return h->op_count > 0 ? (int32_t)h->op_count : -1;
      }
      s->preceding_join_state = 0;
      i += run;
      continue;
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 2 < length &&
        input()[i + 1] >= 0x20 && input()[i + 1] <= 0x2f && input()[i + 2] >= 0x40 &&
        input()[i + 2] <= 0x7e) {
      while (i + 2 < length && input()[i] == 0x1b) {
        uint32_t im = input()[i + 1];
        uint32_t fin = input()[i + 2];
        if (im < 0x20 || im > 0x2f || fin < 0x40 || fin > 0x7e) break;
        uint32_t ident = (im << 8) | fin;
        if (emit_esc_dispatch(i + 2, ident, i + 2, s) < 0) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->current_state = PARSER_STATE_GROUND;
        s->preceding_join_state = 0;
        params_reset_zdm(s);
        s->collect = 0;
        i += 3;
      }
      continue;
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 1 < length &&
        input()[i + 1] >= 0x40 && input()[i + 1] <= 0x7e && input()[i + 1] != 0x5b &&
        input()[i + 1] != 0x5d && input()[i + 1] != 0x50) {
      while (i < length && input()[i] == 0x1b) {
        uint32_t fin = input()[i + 1];
        if (fin < 0x40 || fin > 0x7e || fin == 0x5b || fin == 0x5d || fin == 0x50) break;
        uint32_t ident = fin;
        if (emit_esc_dispatch(i + 1, ident, i + 1, s) < 0) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->current_state = PARSER_STATE_GROUND;
        s->preceding_join_state = 0;
        params_reset_zdm(s);
        s->collect = 0;
        i += 2;
      }
      continue;
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 1 < length && input()[i + 1] == 0x5d) {
      while (i < length && input()[i] == 0x1b && input()[i + 1] == 0x5d) {
        if (!emit_or_stop(OP_OSC_START, i, 0, 0, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        uint32_t j = i + 2;
        while (j < length && input()[j] >= 0x30 && input()[j] <= 0x39) j++;
        if (j < length && input()[j] == 0x3b) {
          uint32_t payload = j + 1;
          j = payload;
          while (j + 3 < length && input()[j] >= 0x20 && input()[j] <= 0x7e && input()[j + 1] >= 0x20 &&
                 input()[j + 1] <= 0x7e && input()[j + 2] >= 0x20 && input()[j + 2] <= 0x7e &&
                 input()[j + 3] >= 0x20 && input()[j + 3] <= 0x7e) {
            j += 4;
          }
          while (j < length) {
            uint32_t cj = input()[j];
            if (cj < 0x20 || (cj > 0x7f && cj < PARSER_NON_ASCII_PRINTABLE)) break;
            if (cj == 0x1b) break;
            j++;
          }
          if (j > payload && !emit_or_stop(OP_OSC_PUT, payload, j - payload, 0, s, payload)) {
            return h->op_count > 0 ? (int32_t)h->op_count : -1;
          }
          if (j + 1 < length && input()[j] == 0x1b && input()[j + 1] == 0x5c) {
            if (!emit_or_stop(OP_OSC_END, j, 0, 0x1b, s, j)) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            s->current_state = PARSER_STATE_ESCAPE;
            params_reset_zdm(s);
            s->collect = 0;
            s->preceding_join_state = 0;
            i = j + 2;
            continue;
          }
        }
        break;
      }
      continue;
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 3 < length && input()[i + 1] == 0x50) {
      uint32_t fin = input()[i + 2];
      if (fin >= 0x40 && fin <= 0x7e) {
        uint32_t payload = i + 3;
        uint32_t j = payload;
        while (j < length && is_dcs_payload(input()[j])) j++;
        if (j + 1 < length && input()[j] == 0x1b && input()[j + 1] == 0x5c) {
          params_reset_zdm(s);
          s->collect = 0;
          if (emit_dcs_sequence_direct(i + 2, fin, payload, j - payload, j, i) < 0) {
            return h->op_count > 0 ? (int32_t)h->op_count : -1;
          }
          s->current_state = PARSER_STATE_GROUND;
          s->preceding_join_state = 0;
          params_reset_zdm(s);
          s->collect = 0;
          i = j + 2;
          continue;
        }
      }
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 3 < length && input()[i + 1] == 0x5f) {
      uint32_t fin = input()[i + 2];
      if (fin >= 0x30 && fin <= 0x7e) {
        uint32_t payload = i + 3;
        uint32_t j = payload;
        while (j < length && is_apc_payload(input()[j])) j++;
        if (j + 1 < length && input()[j] == 0x1b && input()[j + 1] == 0x5c) {
          params_reset_zdm(s);
          s->collect = 0;
          if (emit_apc_sequence_direct(i + 2, fin, payload, j - payload, j, i) < 0) {
            return h->op_count > 0 ? (int32_t)h->op_count : -1;
          }
          s->current_state = PARSER_STATE_GROUND;
          s->preceding_join_state = 0;
          params_reset_zdm(s);
          s->collect = 0;
          i = j + 2;
          continue;
        }
      }
    }

    if (code == 0x1b && s->current_state < PARSER_STATE_OSC_STRING && i + 2 < length && input()[i + 1] == 0x5b) {
      while (i < length && input()[i] == 0x1b && input()[i + 1] == 0x5b) {
        if (i + 2 < length) {
          uint32_t fin = input()[i + 2];
          if (fin >= 0x40 && fin <= 0x7e) {
            if (emit_csi_zdm(i + 2, fin, i + 2) < 0) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            s->current_state = PARSER_STATE_GROUND;
            s->preceding_join_state = 0;
            i += 3;
            continue;
          }
        }
        if (i + 3 < length) {
          uint32_t im = input()[i + 2];
          uint32_t fin = input()[i + 3];
          if (im >= 0x3c && im <= 0x3f && fin >= 0x40 && fin <= 0x7e) {
            uint32_t ident = (im << 8) | fin;
            if (emit_csi_zdm(i + 3, ident, i + 3) < 0) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            s->current_state = PARSER_STATE_GROUND;
            s->preceding_join_state = 0;
            i += 4;
            continue;
          }
        }
        if (i + 3 < length && input()[i + 2] >= 0x30 && input()[i + 2] <= 0x39) {
          uint32_t k = i + 2;
          uint32_t count = 1;
          int32_t value = 0;
          int32_t parsed_params[PARSER_PARAMS_MAX_LEN];
          int direct_done = 0;
          for (; k < length; k++) {
            uint32_t ch = input()[k];
            if (ch >= 0x30 && ch <= 0x39) {
              uint32_t digit = ch - 48;
              if (value > 214748364 || (value == 214748364 && digit > 7)) break;
              value = value * 10 + (int32_t)digit;
            } else if (ch == 0x3b) {
              parsed_params[count - 1] = value;
              if (count >= PARSER_PARAMS_MAX_LEN) break;
              count++;
              value = 0;
            } else if (ch >= 0x40 && ch <= 0x7e) {
              parsed_params[count - 1] = value;
              s->params_len = count;
              s->subparams_len = 0;
              s->reject_digits = 0;
              s->reject_sub_digits = 0;
              s->digit_is_sub = 0;
              for (uint32_t pi = 0; pi < count; pi++) {
                s->params[pi] = parsed_params[pi];
                s->subparams_idx[pi] = 0;
              }
              s->collect = 0;
              if (emit_csi_params_direct(k, ch, parsed_params, count, k) < 0) {
                return h->op_count > 0 ? (int32_t)h->op_count : -1;
              }
              s->preceding_join_state = 0;
              i = k + 1;
              s->current_state = PARSER_STATE_GROUND;
              direct_done = 1;
              break;
            } else {
              break;
            }
          }
          if (direct_done) continue;
        }
        params_reset_zdm(s);
        s->collect = 0;
        uint32_t k = i + 2;
        uint32_t ch = input()[k];
        if (ch >= 0x3c && ch <= 0x3f) {
          s->collect = ch;
          k++;
        }
        int csi_done = 0;
        for (; k < length; k++) {
          ch = input()[k];
          if (ch >= 0x30 && ch <= 0x39) {
            params_add_digit(s, ch - 48);
          } else if (ch == 0x3b) {
            params_add_param(s, 0);
          } else if (ch == 0x3a) {
            params_add_subparam(s, -1);
          } else if (ch >= 0x40 && ch <= 0x7e) {
            uint32_t ident = (s->collect << 8) | ch;
            if (params_is_zdm_default(s)) {
              if (emit_csi_zdm(k, ident, k) < 0) {
                return h->op_count > 0 ? (int32_t)h->op_count : -1;
              }
            } else if (!emit_or_stop(OP_CSI, k, 0, ident, s, k)) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            s->preceding_join_state = 0;
            i = k + 1;
            s->current_state = PARSER_STATE_GROUND;
            csi_done = 1;
            break;
          } else {
            break;
          }
        }
        if (!csi_done) {
          i = k - 1;
          s->current_state = PARSER_STATE_CSI_PARAM;
          i++;
          break;
        }
      }
      continue;
    }

    transition = transition_lookup(s->current_state, code);
    action = transition >> PARSER_TABLE_ACTION_SHIFT;
    {
      uint32_t next_state = transition & PARSER_TABLE_STATE_MASK;
      if (action != 1) {
        s->current_state = next_state;
      }
      switch (action) {
      case 1: /* ERROR - report state before transition (matches TS parser) */
        if (!emit_or_stop(OP_ERROR, i, 0, (s->current_state << 16) | code, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->current_state = next_state;
        break;
      case PARSER_ACTION_PRINT: {
        print_start = i;
        uint32_t c = i;
        uint32_t l4 = length > 4 ? length - 4 : 0;
        while (c < l4 && is_printable(input()[c]) && is_printable(input()[c + 1]) &&
               is_printable(input()[c + 2]) && is_printable(input()[c + 3])) {
          c += 4;
        }
        while (c < length && is_printable(input()[c])) c++;
        if (!emit_or_stop(OP_PRINT, print_start, c - print_start, 0, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        i = c - 1;
        break;
      }
      case PARSER_ACTION_EXECUTE:
        if (!emit_or_stop(OP_EXECUTE, i, 0, code, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->preceding_join_state = 0;
        break;
      case PARSER_ACTION_IGNORE:
        break;
      case PARSER_ACTION_CSI_DISPATCH: {
        uint32_t ident = (s->collect << 8) | code;
        if (!emit_or_stop(OP_CSI, i, 0, ident, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->preceding_join_state = 0;
        break;
      }
      case 8: /* PARAM */
        do {
          switch (code) {
            case 0x3b: params_add_param(s, 0); break;
            case 0x3a: params_add_subparam(s, -1); break;
            default: params_add_digit(s, code - 48); break;
          }
        } while (++i < length && (code = input()[i]) > 0x2f && code < 0x3c);
        i--;
        break;
      case 9: /* COLLECT */
        s->collect <<= 8;
        s->collect |= code;
        break;
      case PARSER_ACTION_ESC_DISPATCH: {
        uint32_t ident = (s->collect << 8) | code;
        if (!emit_or_stop(OP_ESC, i, 0, ident, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->preceding_join_state = 0;
        break;
      }
      case 11: /* CLEAR */
        params_reset_zdm(s);
        s->collect = 0;
        break;
      case 4: /* OSC_START */
        if (!emit_or_stop(OP_OSC_START, i, 0, 0, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->osc_start = i + 1;
        break;
      case 5: /* OSC_PUT */
        for (uint32_t j = i + 1; ; j++) {
          if (j >= length || (code = input()[j]) < 0x20 ||
              (code > 0x7f && code < PARSER_NON_ASCII_PRINTABLE)) {
            if (j > i && !emit_or_stop(OP_OSC_PUT, i, j - i, 0, s, i)) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            i = j - 1;
            break;
          }
        }
        break;
      case PARSER_ACTION_OSC_END: {
        if (!emit_or_stop(OP_OSC_END, i, 0, code, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->osc_term = code;
        if (code == 0x1b) s->current_state = PARSER_STATE_ESCAPE;
        params_reset_zdm(s);
        s->collect = 0;
        s->preceding_join_state = 0;
        break;
      }
      case 12: /* DCS_HOOK */
        s->dcs_hook_ident = (s->collect << 8) | code;
        if (!emit_or_stop(OP_DCS_HOOK, i, 0, s->dcs_hook_ident, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->dcs_start = i + 1;
        break;
      case 13: /* DCS_PUT */
        for (uint32_t j = i + 1; ; j++) {
          if (j >= length || (code = input()[j]) == 0x18 || code == 0x1a || code == 0x1b ||
              (code > 0x7f && code < PARSER_NON_ASCII_PRINTABLE)) {
            if (j > i && !emit_or_stop(OP_DCS_PUT, i, j - i, 0, s, i)) {
              return h->op_count > 0 ? (int32_t)h->op_count : -1;
            }
            i = j - 1;
            break;
          }
        }
        break;
      case PARSER_ACTION_DCS_UNHOOK: {
        if (!emit_or_stop(OP_DCS_UNHOOK, i, 0, code, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        if (code == 0x1b) s->current_state = PARSER_STATE_ESCAPE;
        params_reset_zdm(s);
        s->collect = 0;
        s->preceding_join_state = 0;
        break;
      }
      case 15: /* APC_START */
        s->apc_hook_ident = (s->collect << 8) | code;
        if (!emit_or_stop(OP_APC_START, i, 0, s->apc_hook_ident, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        s->apc_start = i + 1;
        break;
      case 16: /* APC_PUT */
        for (uint32_t j = i + 1; ; j++) {
          if (j < length && (
            (input()[j] >= 0x20 && input()[j] < 0x7f) ||
            (input()[j] >= 0x08 && input()[j] < 0x0e) ||
            input()[j] >= PARSER_NON_ASCII_PRINTABLE
          )) continue;
          if (j > i && !emit_or_stop(OP_APC_PUT, i, j - i, 0, s, i)) {
            return h->op_count > 0 ? (int32_t)h->op_count : -1;
          }
          i = j - 1;
          break;
        }
        break;
      case PARSER_ACTION_APC_END: {
        if (!emit_or_stop(OP_APC_END, i, 0, code, s, i)) {
          return h->op_count > 0 ? (int32_t)h->op_count : -1;
        }
        if (code == 0x1b) s->current_state = PARSER_STATE_ESCAPE;
        params_reset_zdm(s);
        s->collect = 0;
        s->preceding_join_state = 0;
        break;
      }
      default:
        break;
      }
    }
    i++;
  }
  h->scan_offset = length;
  return (int32_t)h->op_count;
}
