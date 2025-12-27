/**
 * Copyright (c) 2021 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { CustomGlyphDefinitionType, CustomGlyphScaleType, CustomGlyphVectorType, type CustomGlyphCharacterDefinition, type CustomGlyphDefinitionPart, type CustomGlyphPathDrawFunctionDefinition } from './Types';

/* eslint-disable max-len */

namespace GitBranchSymbolsParts {
  // Lines
  export const LINE_H: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 1 });
  export const LINE_V: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 1 });

  // Fading lines
  export const FADE_RIGHT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L.28,.5 M.32,.5 L.52,.5 M.60,.5 L.72,.5 M.84,.5 L.90,.5', strokeWidth: 1 });
  export const FADE_LEFT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.10,.5 L.16,.5 M.28,.5 L.40,.5 M.48,.5 L.68,.5 M.72,.5 L1,.5', strokeWidth: 1 });
  export const FADE_DOWN: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L.5,.28 M.5,.32 L.5,.52 M.5,.60 L.5,.72 M.5,.84 L.5,.90', strokeWidth: 1 });
  export const FADE_UP: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,.10 L.5,.16 M.5,.28 L.5,.40 M.5,.48 L.5,.68 M.5,.72 L.5,1', strokeWidth: 1 });

  // Curved corners
  export const CURVE_DOWN_RIGHT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp: number, yp: number) => `M.5,1 L.5,${.5 + (yp / .15 * .5)} C.5,${.5 + (yp / .15 * .5)},.5,.5,1,.5`, strokeWidth: 1 });
  export const CURVE_DOWN_LEFT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp: number, yp: number) => `M.5,1 L.5,${.5 + (yp / .15 * .5)} C.5,${.5 + (yp / .15 * .5)},.5,.5,0,.5`, strokeWidth: 1 });
  export const CURVE_UP_RIGHT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp: number, yp: number) => `M.5,0 L.5,${.5 - (yp / .15 * .5)} C.5,${.5 - (yp / .15 * .5)},.5,.5,1,.5`, strokeWidth: 1 });
  export const CURVE_UP_LEFT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp: number, yp: number) => `M.5,0 L.5,${.5 - (yp / .15 * .5)} C.5,${.5 - (yp / .15 * .5)},.5,.5,0,.5`, strokeWidth: 1 });

  // Node parts
  export const NODE_FILL: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'ANmAB1ktAP//JoAHWS0A///ZgA==' });
  export const NODE_STROKE: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'ANmAB1ktAP//JoAHWS0A///ZgA==', strokeWidth: 1 });
  export const NODE_LINE_RIGHT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AP+AAdmA', strokeWidth: 1 });
  export const NODE_LINE_LEFT: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACAASaA', strokeWidth: 1 });
  export const NODE_LINE_DOWN: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/AYCz', strokeWidth: 1 });
  export const NODE_LINE_UP: CustomGlyphDefinitionPart = Object.freeze({ type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAYBN', strokeWidth: 1 });
}

export const customGlyphDefinitions: { [index: string]: CustomGlyphCharacterDefinition | undefined } = {
  // #region Box Drawing (2500-257F)

  // https://www.unicode.org/charts/PDF/U2500.pdf

  // Light and heavy solid lines (2500-2503)
  '─': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 1 },
  '━': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 3 },
  '│': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 1 },
  '┃': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 3 },

  // Light and heavy dashed lines (2504-250B)
  '┄': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.THREE_DASHES_HORIZONTAL, strokeWidth: 1 },
  '┅': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.THREE_DASHES_HORIZONTAL, strokeWidth: 3 },
  '┆': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.THREE_DASHES_VERTICAL, strokeWidth: 1 },
  '┇': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.THREE_DASHES_VERTICAL, strokeWidth: 3 },
  '┈': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.FOUR_DASHES_HORIZONTAL, strokeWidth: 1 },
  '┉': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.FOUR_DASHES_HORIZONTAL, strokeWidth: 3 },
  '┊': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.FOUR_DASHES_VERTICAL, strokeWidth: 1 },
  '┋': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.FOUR_DASHES_VERTICAL, strokeWidth: 3 },

  // Light and heavy line box components (250C-254B)
  '┌': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 1 },
  '┍': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┎': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '┏': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 3 },
  '┐': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 1 },
  '┑': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┒': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '┓': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 3 },
  '└': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 1 },
  '┕': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┖': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '┗': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 3 },
  '┘': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 1 },
  '┙': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┚': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '┛': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 3 },
  '├': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_RIGHT, strokeWidth: 1 },
  '┝': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┞': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '┟': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '┠': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 3 }],
  '┡': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 3 }],
  '┢': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 3 }],
  '┣': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_RIGHT, strokeWidth: 3 },
  '┤': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_LEFT, strokeWidth: 1 },
  '┥': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┦': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '┧': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '┨': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 3 }],
  '┩': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 3 }],
  '┪': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 3 }],
  '┫': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_LEFT, strokeWidth: 3 },
  '┬': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_BOTTOM, strokeWidth: 1 },
  '┭': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┮': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┯': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 3 }],
  '┰': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '┱': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 3 }],
  '┲': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 3 }],
  '┳': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_BOTTOM, strokeWidth: 3 },
  '┴': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_TOP, strokeWidth: 1 },
  '┵': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┶': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┷': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 3 }],
  '┸': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '┹': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 3 }],
  '┺': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 3 }],
  '┻': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.T_TOP, strokeWidth: 3 },
  '┼': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.CROSS, strokeWidth: 1 },
  '┽': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.TOP_TO_BOTTOM} ${Shapes.MIDDLE_TO_RIGHT}`, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '┾': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.TOP_TO_BOTTOM} ${Shapes.MIDDLE_TO_LEFT}`, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '┿': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 3 }],
  '╀': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.LEFT_TO_RIGHT} ${Shapes.MIDDLE_TO_BOTTOM}`, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],
  '╁': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.MIDDLE_TO_TOP} ${Shapes.LEFT_TO_RIGHT}`, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '╂': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_BOTTOM, strokeWidth: 3 }],
  '╃': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 3 }],
  '╄': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 3 }],
  '╅': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.LEFT_TO_BOTTOM, strokeWidth: 3 }],
  '╆': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TOP_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.RIGHT_TO_BOTTOM, strokeWidth: 3 }],
  '╇': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.MIDDLE_TO_TOP} ${Shapes.LEFT_TO_RIGHT}`, strokeWidth: 3 }],
  '╈': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.LEFT_TO_RIGHT} ${Shapes.MIDDLE_TO_BOTTOM}`, strokeWidth: 3 }],
  '╉': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.TOP_TO_BOTTOM} ${Shapes.MIDDLE_TO_LEFT}`, strokeWidth: 3 }],
  '╊': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.TOP_TO_BOTTOM} ${Shapes.MIDDLE_TO_RIGHT}`, strokeWidth: 3 }],
  '╋': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.CROSS, strokeWidth: 3 },

  // Light and heavy dashed lines (254C-254F)
  '╌': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TWO_DASHES_HORIZONTAL, strokeWidth: 1 },
  '╍': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TWO_DASHES_HORIZONTAL, strokeWidth: 3 },
  '╎': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TWO_DASHES_VERTICAL, strokeWidth: 1 },
  '╏': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.TWO_DASHES_VERTICAL, strokeWidth: 3 },

  // Double lines (2550-2551)
  '═': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 - yp} L1,${.5 - yp} M0,${.5 + yp} L1,${.5 + yp}`, strokeWidth: 1 },
  '║': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 - xp},0 L${.5 - xp},1 M${.5 + xp},0 L${.5 + xp},1`, strokeWidth: 1 },

  // Light and double line box components (2552-256C)
  '╒': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,1 L.5,${.5 - yp} L1,${.5 - yp} M.5,${.5 + yp} L1,${.5 + yp}`, strokeWidth: 1 },
  '╓': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 - xp},1 L${.5 - xp},.5 L1,.5 M${.5 + xp},.5 L${.5 + xp},1`, strokeWidth: 1 },
  '╔': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M1,${.5 - yp} L${.5 - xp},${.5 - yp} L${.5 - xp},1 M1,${.5 + yp} L${.5 + xp},${.5 + yp} L${.5 + xp},1`, strokeWidth: 1 },
  '╕': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 - yp} L.5,${.5 - yp} L.5,1 M0,${.5 + yp} L.5,${.5 + yp}`, strokeWidth: 1 },
  '╖': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 + xp},1 L${.5 + xp},.5 L0,.5 M${.5 - xp},.5 L${.5 - xp},1`, strokeWidth: 1 },
  '╗': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 + yp} L${.5 - xp},${.5 + yp} L${.5 - xp},1 M0,${.5 - yp} L${.5 + xp},${.5 - yp} L${.5 + xp},1`, strokeWidth: 1 },
  '╘': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,0 L.5,${.5 + yp} L1,${.5 + yp} M.5,${.5 - yp} L1,${.5 - yp}`, strokeWidth: 1 },
  '╙': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M1,.5 L${.5 - xp},.5 L${.5 - xp},0 M${.5 + xp},.5 L${.5 + xp},0`, strokeWidth: 1 },
  '╚': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M1,${.5 - yp} L${.5 + xp},${.5 - yp} L${.5 + xp},0 M1,${.5 + yp} L${.5 - xp},${.5 + yp} L${.5 - xp},0`, strokeWidth: 1 },
  '╛': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 + yp} L.5,${.5 + yp} L.5,0 M0,${.5 - yp} L.5,${.5 - yp}`, strokeWidth: 1 },
  '╜': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,.5 L${.5 + xp},.5 L${.5 + xp},0 M${.5 - xp},.5 L${.5 - xp},0`, strokeWidth: 1 },
  '╝': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 - yp} L${.5 - xp},${.5 - yp} L${.5 - xp},0 M0,${.5 + yp} L${.5 + xp},${.5 + yp} L${.5 + xp},0`, strokeWidth: 1 },
  '╞': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.TOP_TO_BOTTOM} M.5,${.5 - yp} L1,${.5 - yp} M.5,${.5 + yp} L1,${.5 + yp}`, strokeWidth: 1 },
  '╟': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 - xp},0 L${.5 - xp},1 M${.5 + xp},0 L${.5 + xp},1 M${.5 + xp},.5 L1,.5`, strokeWidth: 1 },
  '╠': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 - xp},0 L${.5 - xp},1 M1,${.5 + yp} L${.5 + xp},${.5 + yp} L${.5 + xp},1 M1,${.5 - yp} L${.5 + xp},${.5 - yp} L${.5 + xp},0`, strokeWidth: 1 },
  '╡': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.TOP_TO_BOTTOM} M0,${.5 - yp} L.5,${.5 - yp} M0,${.5 + yp} L.5,${.5 + yp}`, strokeWidth: 1 },
  '╢': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,.5 L${.5 - xp},.5 M${.5 - xp},0 L${.5 - xp},1 M${.5 + xp},0 L${.5 + xp},1`, strokeWidth: 1 },
  '╣': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M${.5 + xp},0 L${.5 + xp},1 M0,${.5 + yp} L${.5 - xp},${.5 + yp} L${.5 - xp},1 M0,${.5 - yp} L${.5 - xp},${.5 - yp} L${.5 - xp},0`, strokeWidth: 1 },
  '╤': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 - yp} L1,${.5 - yp} M0,${.5 + yp} L1,${.5 + yp} M.5,${.5 + yp} L.5,1`, strokeWidth: 1 },
  '╥': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.LEFT_TO_RIGHT} M${.5 - xp},.5 L${.5 - xp},1 M${.5 + xp},.5 L${.5 + xp},1`, strokeWidth: 1 },
  '╦': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 - yp} L1,${.5 - yp} M0,${.5 + yp} L${.5 - xp},${.5 + yp} L${.5 - xp},1 M1,${.5 + yp} L${.5 + xp},${.5 + yp} L${.5 + xp},1`, strokeWidth: 1 },
  '╧': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,0 L.5,${.5 - yp} M0,${.5 - yp} L1,${.5 - yp} M0,${.5 + yp} L1,${.5 + yp}`, strokeWidth: 1 },
  '╨': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.LEFT_TO_RIGHT} M${.5 - xp},.5 L${.5 - xp},0 M${.5 + xp},.5 L${.5 + xp},0`, strokeWidth: 1 },
  '╩': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 + yp} L1,${.5 + yp} M0,${.5 - yp} L${.5 - xp},${.5 - yp} L${.5 - xp},0 M1,${.5 - yp} L${.5 + xp},${.5 - yp} L${.5 + xp},0`, strokeWidth: 1 },
  '╪': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.TOP_TO_BOTTOM} M0,${.5 - yp} L1,${.5 - yp} M0,${.5 + yp} L1,${.5 + yp}`, strokeWidth: 1 },
  '╫': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `${Shapes.LEFT_TO_RIGHT} M${.5 - xp},0 L${.5 - xp},1 M${.5 + xp},0 L${.5 + xp},1`, strokeWidth: 1 },
  '╬': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M0,${.5 + yp} L${.5 - xp},${.5 + yp} L${.5 - xp},1 M1,${.5 + yp} L${.5 + xp},${.5 + yp} L${.5 + xp},1 M0,${.5 - yp} L${.5 - xp},${.5 - yp} L${.5 - xp},0 M1,${.5 - yp} L${.5 + xp},${.5 - yp} L${.5 + xp},0`, strokeWidth: 1 },

  // Character cell arcs (256D-2570)
  '╭': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,1 L.5,${.5 + (yp / .15 * .5)} C.5,${.5 + (yp / .15 * .5)},.5,.5,1,.5`, strokeWidth: 1 },
  '╮': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,1 L.5,${.5 + (yp / .15 * .5)} C.5,${.5 + (yp / .15 * .5)},.5,.5,0,.5`, strokeWidth: 1 },
  '╯': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,0 L.5,${.5 - (yp / .15 * .5)} C.5,${.5 - (yp / .15 * .5)},.5,.5,0,.5`, strokeWidth: 1 },
  '╰': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: (xp, yp) => `M.5,0 L.5,${.5 - (yp / .15 * .5)} C.5,${.5 - (yp / .15 * .5)},.5,.5,1,.5`, strokeWidth: 1 },

  // Character cell diagonals (2571-2573)
  '╱': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L0,1', strokeWidth: 1 },
  '╲': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L1,1', strokeWidth: 1 },
  '╳': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L0,1 M0,0 L1,1', strokeWidth: 1 },

  // Light and heavy half lines (2574-257B)
  '╴': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 },
  '╵': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 },
  '╶': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 },
  '╷': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 },
  '╸': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 },
  '╹': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 },
  '╺': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 },
  '╻': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 },

  // Mixed light and heavy lines (257C-257F)
  '╼': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 3 }],
  '╽': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 3 }],
  '╾': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_RIGHT, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_LEFT, strokeWidth: 3 }],
  '╿': [{ type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_BOTTOM, strokeWidth: 1 }, { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: Shapes.MIDDLE_TO_TOP, strokeWidth: 3 }],

  // #endregion

  // #region Block elements (2580-259F)

  // https://www.unicode.org/charts/PDF/U2580.pdf

  // Block elements (2580-2590)
  '▀': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 4 }] }, // UPPER HALF BLOCK
  '▁': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 7, w: 8, h: 1 }] }, // LOWER ONE EIGHTH BLOCK
  '▂': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 6, w: 8, h: 2 }] }, // LOWER ONE QUARTER BLOCK
  '▃': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 5, w: 8, h: 3 }] }, // LOWER THREE EIGHTHS BLOCK
  '▄': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 4, w: 8, h: 4 }] }, // LOWER HALF BLOCK
  '▅': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 3, w: 8, h: 5 }] }, // LOWER FIVE EIGHTHS BLOCK
  '▆': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 2, w: 8, h: 6 }] }, // LOWER THREE QUARTERS BLOCK
  '▇': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 1, w: 8, h: 7 }] }, // LOWER SEVEN EIGHTHS BLOCK
  '█': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 8 }] }, // FULL BLOCK (=solid -> 25A0=black square)
  '▉': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 7, h: 8 }] }, // LEFT SEVEN EIGHTHS BLOCK
  '▊': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 6, h: 8 }] }, // LEFT THREE QUARTERS BLOCK
  '▋': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 5, h: 8 }] }, // LEFT FIVE EIGHTHS BLOCK
  '▌': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 4, h: 8 }] }, // LEFT HALF BLOCK
  '▍': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 3, h: 8 }] }, // LEFT THREE EIGHTHS BLOCK
  '▎': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 2, h: 8 }] }, // LEFT ONE QUARTER BLOCK
  '▏': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 1, h: 8 }] }, // LEFT ONE EIGHTH BLOCK
  '▐': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 4, h: 8 }] }, // RIGHT HALF BLOCK

  // Shade characters (2591-2593)
  '░': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // LIGHT SHADE (25%)
    [1, 0],
    [0, 0]
  ] },
  '▒': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // MEDIUM SHADE (=speckles fill, dotted fill, 50%, used in mapping to cp949, -> 1FB90 inverse medium shade)
    [1, 0],
    [0, 1]
  ] },
  '▓': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // DARK SHADE (75%)
    [1, 1],
    [1, 0]
  ] },

  // Block elements (2594-2595)
  '▔': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 1 }] }, // UPPER ONE EIGHTH BLOCK
  '▕': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 7, y: 0, w: 1, h: 8 }] }, // RIGHT ONE EIGHTH BLOCK

  // Terminal graphic characters (2596-259F)
  '▖': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 4, w: 4, h: 4 }] },                             // QUADRANT LOWER LEFT
  '▗': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 4, w: 4, h: 4 }] },                             // QUADRANT LOWER RIGHT
  '▘': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 4, h: 4 }] },                             // QUADRANT UPPER LEFT
  '▙': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 4, h: 8 }, { x: 0, y: 4, w: 8, h: 4 }] }, // QUADRANT UPPER LEFT AND LOWER LEFT AND LOWER RIGHT (-> 1F67F reverse checker board, -> 1FB95 checker board fill)
  '▚': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 4, h: 4 }, { x: 4, y: 4, w: 4, h: 4 }] }, // QUADRANT UPPER LEFT AND LOWER RIGHT
  '▛': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 4, h: 8 }, { x: 4, y: 0, w: 4, h: 4 }] }, // QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER LEFT
  '▜': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 4 }, { x: 4, y: 0, w: 4, h: 8 }] }, // QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER RIGHT
  '▝': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 4, h: 4 }] },                             // QUADRANT UPPER RIGHT
  '▞': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 4, h: 4 }, { x: 0, y: 4, w: 4, h: 4 }] }, // QUADRANT UPPER RIGHT AND LOWER LEFT (-> 1F67E checker board, 1FB96 inverse checker board fill)
  '▟': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 4, h: 8 }, { x: 0, y: 4, w: 8, h: 4 }] }, // QUADRANT UPPER RIGHT AND LOWER LEFT AND LOWER RIGHT

  // #endregion

  // #region Powerline Symbols (E0A0-E0BF)

  // This contains the definitions of the primarily used box drawing characters as vector shapes.
  // The reason these characters are defined specially is to avoid common problems if a user's font
  // has not been patched with powerline characters and also to get pixel perfect rendering as
  // rendering issues can occur around AA/SPAA.
  //
  // The line variants draw beyond the cell and get clipped to ensure the end of the line is not
  // visible.
  //
  // Original symbols defined in https://github.com/powerline/fontpatcher

  // Git branch
  '\u{E0A0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.3,1 L.03,1 L.03,.88 C.03,.82,.06,.78,.11,.73 C.15,.7,.2,.68,.28,.65 L.43,.6 C.49,.58,.53,.56,.56,.53 C.59,.5,.6,.47,.6,.43 L.6,.27 L.4,.27 L.69,.1 L.98,.27 L.78,.27 L.78,.46 C.78,.52,.76,.56,.72,.61 C.68,.66,.63,.67,.56,.7 L.48,.72 C.42,.74,.38,.76,.35,.78 C.32,.8,.31,.84,.31,.88 L.31,1 M.3,.5 L.03,.59 L.03,.09 L.3,.09 L.3,.655', type: CustomGlyphVectorType.FILL } },
  // LN (Line Number)
  '\u{E0A1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.7,.4 L.7,.47 L.2,.47 L.2,.03 L.355,.03 L.355,.4 L.705,.4 M.7,.5 L.86,.5 L.86,.95 L.69,.95 L.44,.66 L.46,.86 L.46,.95 L.3,.95 L.3,.49 L.46,.49 L.71,.78 L.69,.565 L.69,.5', type: CustomGlyphVectorType.FILL } },
  // Lock
  '\u{E0A2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.25,.94 C.16,.94,.11,.92,.11,.87 L.11,.53 C.11,.48,.15,.455,.23,.45 L.23,.3 C.23,.25,.26,.22,.31,.19 C.36,.16,.43,.15,.51,.15 C.59,.15,.66,.16,.71,.19 C.77,.22,.79,.26,.79,.3 L.79,.45 C.87,.45,.91,.48,.91,.53 L.91,.87 C.91,.92,.86,.94,.77,.94 L.24,.94 M.53,.2 C.49,.2,.45,.21,.42,.23 C.39,.25,.38,.27,.38,.3 L.38,.45 L.68,.45 L.68,.3 C.68,.27,.67,.25,.64,.23 C.61,.21,.58,.2,.53,.2 M.58,.82 L.58,.66 C.63,.65,.65,.63,.65,.6 C.65,.58,.64,.57,.61,.56 C.58,.55,.56,.54,.52,.54 C.48,.54,.46,.55,.43,.56 C.4,.57,.39,.59,.39,.6 C.39,.63,.41,.64,.46,.66 L.46,.82 L.57,.82', type: CustomGlyphVectorType.FILL } },
  // CN (Column Number)
  '\u{E0A3}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.7,.4 L.7,.47 L.2,.47 L.2,.03 L.7,.03 L.7,.1 L.355,.1 L.355,.4 L.705,.4 M.7,.5 L.86,.5 L.86,.95 L.69,.95 L.44,.66 L.46,.86 L.46,.95 L.3,.95 L.3,.49 L.46,.49 L.71,.78 L.69,.565 L.69,.5', type: CustomGlyphVectorType.FILL } },
  // Right triangle solid
  '\u{E0B0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L1,.5 L0,1', type: CustomGlyphVectorType.FILL, rightPadding: 2 } },
  // Right triangle line
  '\u{E0B1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M-1,-.5 L1,.5 L-1,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },
  // Left triangle solid
  '\u{E0B2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0 L0,.5 L1,1', type: CustomGlyphVectorType.FILL, leftPadding: 2 } },
  // Left triangle line
  '\u{E0B3}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M2,-.5 L0,.5 L2,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },

  // Powerline Extra Symbols

  // Original symbols defined in https://github.com/ryanoasis/powerline-extra-symbols

  // Right semi-circle solid
  '\u{E0B4}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L0,1 C0.552,1,1,0.776,1,.5 C1,0.224,0.552,0,0,0', type: CustomGlyphVectorType.FILL, rightPadding: 1 } },
  // Right semi-circle line
  '\u{E0B5}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.2,1 C.422,1,.8,.826,.78,.5 C.8,.174,0.422,0,.2,0', type: CustomGlyphVectorType.STROKE, rightPadding: 1 } },
  // Left semi-circle solid
  '\u{E0B6}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0 L1,1 C0.448,1,0,0.776,0,.5 C0,0.224,0.448,0,1,0', type: CustomGlyphVectorType.FILL, leftPadding: 1 } },
  // Left semi-circle line
  '\u{E0B7}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.8,1 C0.578,1,0.2,.826,.22,.5 C0.2,0.174,0.578,0,0.8,0', type: CustomGlyphVectorType.STROKE, leftPadding: 1 } },
  // Lower left triangle
  '\u{E0B8}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M-.5,-.5 L1.5,1.5 L-.5,1.5', type: CustomGlyphVectorType.FILL } },
  // Backslash separator
  '\u{E0B9}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M-.5,-.5 L1.5,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },
  // Lower right triangle
  '\u{E0BA}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1.5,-.5 L-.5,1.5 L1.5,1.5', type: CustomGlyphVectorType.FILL } },
  // Forward slash separator redundant (identical to E0BD)
  '\u{E0BB}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1.5,-.5 L-.5,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },
  // Upper left triangle
  '\u{E0BC}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1.5,-.5 L-.5,1.5 L-.5,-.5', type: CustomGlyphVectorType.FILL } },
  // Forward slash separator
  '\u{E0BD}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1.5,-.5 L-.5,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },
  // Upper right triangle
  '\u{E0BE}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M-.5,-.5 L1.5,1.5 L1.5,-.5', type: CustomGlyphVectorType.FILL } },
  // Backslash separator redundant (identical to E0B9)
  '\u{E0BF}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M-.5,-.5 L1.5,1.5', type: CustomGlyphVectorType.STROKE, leftPadding: 1, rightPadding: 1 } },
  '\u{E0C0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.8069,0.6075 Q0.7991,0.612,0.7815,0.6218 T0.7542,0.6369 T0.7282,0.6508 T0.7016,0.6644 T0.6778,0.6758 T0.6551,0.6854 T0.637,0.6911 T0.622,0.6936 Q0.6186,0.6936,0.6128,0.6942 T0.6018,0.6952 T0.5894,0.6956 T0.5757,0.6952 T0.561,0.693 T0.5451,0.6879 Q0.5342,0.6834,0.5193,0.6756 T0.4925,0.6614 T0.4673,0.6485 T0.4436,0.6389 T0.4239,0.6363 T0.4089,0.6422 Q0.4045,0.6467,0.3958,0.6554 T0.3843,0.6669 T0.3748,0.6746 T0.3613,0.683 T0.3442,0.6903 L0.3499,0.6956 Q0.3584,0.7042,0.3679,0.7177 T0.3836,0.7403 T0.4019,0.7583 T0.4295,0.7703 Q0.4688,0.7785,0.5203,0.7605 Q0.4902,0.7817,0.449,0.7911 T0.3696,0.8001 Q0.3567,0.7997,0.341,0.7942 T0.3111,0.7813 T0.2805,0.766 T0.2493,0.753 T0.218,0.7472 T0.187,0.754 Q0.1762,0.7589,0.1653,0.7681 T0.1453,0.7895 T0.1308,0.818 T0.1264,0.8507 L0.1264,0.858 Q0.1453,0.8462,0.1607,0.8433 T0.1899,0.8452 T0.2226,0.8625 Q0.2344,0.8707,0.2485,0.8752 T0.2813,0.8831 T0.3089,0.889 Q0.2981,0.8915,0.2846,0.8956 T0.2603,0.9037 T0.2368,0.9115 T0.2129,0.9174 T0.1894,0.9194 T0.1653,0.9155 Q0.1504,0.9115,0.1328,0.9196 T0.0986,0.9421 T0.0655,0.9708 T0.0317,0.9943 T0,1 Q0.001,0.94,0.0017,0.6508 T0.0024,0.2322 Q0.002,0.2109,0.0007,0.1379 T0,0.0249 Q0.0058,0.0253,0.009,0.0257 T0.0156,0.0288 T0.0203,0.0333 T0.0264,0.0422 T0.0349,0.0539 Q0.044,0.0657,0.0542,0.072 T0.0752,0.0789 T0.096,0.0775 T0.1175,0.0694 T0.1379,0.0573 T0.1579,0.0432 Q0.2141,0,0.2673,0.0318 Q0.2588,0.0318,0.2517,0.033 T0.239,0.0361 T0.2276,0.0424 T0.218,0.0504 T0.2085,0.0612 T0.1997,0.0732 T0.1899,0.0875 T0.1795,0.1028 Q0.1748,0.1093,0.1507,0.1234 T0.1186,0.1448 Q0.0999,0.1612,0.1108,0.1783 Q0.1162,0.1877,0.1238,0.1928 T0.1404,0.1979 T0.158,0.1967 T0.1775,0.1895 T0.1963,0.1791 T0.2151,0.1663 T0.2314,0.1534 T0.2458,0.141 T0.2561,0.1322 Q0.2815,0.1106,0.3017,0.101 T0.344,0.0926 T0.3919,0.1077 Q0.4099,0.1175,0.4265,0.1206 T0.4588,0.1202 T0.488,0.1098 T0.5176,0.0914 Q0.5071,0.1032,0.4963,0.1122 T0.4722,0.1285 T0.4497,0.1401 T0.4223,0.1518 T0.3943,0.1636 Q0.374,0.1726,0.3623,0.1863 T0.3482,0.2162 Q0.3445,0.2403,0.3608,0.2605 T0.4072,0.2876 Q0.4194,0.2909,0.4326,0.2899 T0.457,0.2856 T0.4805,0.2764 T0.5032,0.264 T0.5256,0.2497 T0.5478,0.2352 T0.5698,0.2222 T0.5921,0.2118 Q0.6982,0.173,0.81,0.2436 Q0.833,0.2583,0.8496,0.2674 T0.887,0.2846 T0.925,0.294 T0.9617,0.2911 T1,0.2746 Q0.9817,0.2946,0.96,0.3056 T0.9175,0.3191 T0.8731,0.3209 T0.8277,0.3164 T0.7818,0.3109 T0.7359,0.3101 T0.6907,0.3197 T0.647,0.3448 Q0.6443,0.3472,0.6333,0.3562 T0.6194,0.3674 T0.6076,0.3766 T0.594,0.386 T0.5815,0.3931 T0.5661,0.4007 T0.5501,0.4064 L0.5556,0.4121 Q0.5627,0.4198,0.5722,0.4251 T0.5926,0.4337 T0.6131,0.439 T0.6343,0.4431 T0.6521,0.4468 Q0.6762,0.4529,0.7056,0.4463 Q0.6772,0.4623,0.6543,0.471 T0.604,0.4814 Q0.5962,0.4818,0.5815,0.4825 T0.5591,0.4835 T0.5393,0.4857 T0.519,0.4908 T0.5007,0.4996 T0.4812,0.5141 T0.4627,0.5353 L0.4549,0.5451 L0.4661,0.543 Q0.4759,0.541,0.4909,0.55 T0.5315,0.5796 T0.5684,0.6083 Q0.5799,0.6161,0.5915,0.6212 T0.6181,0.6308 L0.6331,0.6353 Q0.6514,0.6418,0.7004,0.633 T0.8069,0.6075 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.011,0.0469 Q0.0152,0.0412,0.02,0.0361 T0.0292,0.0281 T0.0365,0.0253 Q0.0426,0.0257,0.0461,0.0263 T0.0534,0.03 T0.0582,0.0345 T0.0645,0.0434 T0.0723,0.0546 Q0.0807,0.0653,0.0897,0.0712 T0.1081,0.0775 T0.1255,0.0765 T0.1438,0.0695 T0.1605,0.0593 T0.1772,0.0473 Q0.2388,0,0.2927,0.0326 L0.2614,0.0767 L0.2581,0.0767 Q0.2494,0.0767,0.2444,0.0773 T0.2359,0.0789 T0.2291,0.0842 T0.2233,0.0922 T0.2146,0.1054 T0.2026,0.1236 Q0.1943,0.1354,0.1843,0.1444 T0.1675,0.1574 T0.1526,0.1654 T0.1429,0.1701 Q0.1436,0.1717,0.1446,0.1733 Q0.1504,0.1823,0.1581,0.1866 T0.1733,0.1915 T0.1909,0.1884 T0.2085,0.1809 T0.2265,0.169 T0.2427,0.1564 T0.2575,0.1436 T0.2688,0.1338 Q0.2969,0.1101,0.3195,0.0995 T0.3643,0.0901 T0.4114,0.1048 Q0.4279,0.1138,0.4426,0.1168 T0.4705,0.117 T0.4945,0.1089 T0.5186,0.0942 L0.5211,0.0926 L0.5289,0.0922 Q0.5411,0.095,0.5189,0.1203 Q0.505,0.1358,0.4913,0.1474 T0.4634,0.167 T0.4389,0.1796 T0.4121,0.1909 T0.3866,0.2011 Q0.3782,0.2047,0.3727,0.2092 Q0.3717,0.2117,0.3714,0.2141 Q0.3695,0.2263,0.3751,0.2388 T0.394,0.2616 T0.4253,0.2761 Q0.4398,0.2785,0.4513,0.2779 T0.4756,0.2724 T0.4987,0.2616 T0.5216,0.2476 T0.5453,0.2321 T0.5703,0.217 T0.5976,0.2043 Q0.7015,0.166,0.8099,0.2345 Q0.8361,0.2512,0.8572,0.2616 T0.9006,0.2779 T0.9432,0.281 T0.9819,0.2663 L0.9887,0.2671 Q1,0.272,0.9768,0.2969 Q0.9558,0.3193,0.9319,0.333 T0.8858,0.3513 T0.8391,0.3569 T0.793,0.3546 T0.7485,0.3497 T0.7065,0.3473 T0.6681,0.3522 T0.6344,0.3699 Q0.5963,0.4005,0.5847,0.4082 Q0.595,0.4139,0.6079,0.4174 T0.6367,0.4237 T0.6586,0.4278 Q0.6793,0.4331,0.7044,0.4278 Q0.7057,0.4278,0.707,0.4274 Q0.7067,0.429,0.7062,0.4313 T0.7036,0.4398 T0.6993,0.4513 T0.6931,0.4619 T0.6851,0.4698 Q0.6573,0.4857,0.6336,0.4947 T0.5831,0.5053 Q0.577,0.5057,0.5615,0.5065 T0.5394,0.508 T0.5221,0.51 T0.5042,0.5139 T0.4905,0.5204 Q0.5008,0.5232,0.515,0.5328 T0.549,0.5585 T0.5799,0.5824 Q0.5905,0.5897,0.6013,0.5946 T0.6262,0.6036 T0.6409,0.6081 Q0.6567,0.6134,0.7035,0.605 T0.8028,0.5816 L0.7974,0.5922 T0.7867,0.6134 L0.7812,0.624 Q0.7799,0.6248,0.7786,0.6252 Q0.7709,0.6297,0.7573,0.6372 T0.7346,0.6499 T0.7123,0.6621 T0.6897,0.6741 T0.6686,0.6847 T0.648,0.6941 T0.6297,0.7013 T0.6129,0.7062 T0.5995,0.7076 Q0.5992,0.7076,0.5831,0.7092 T0.5529,0.7092 T0.525,0.7019 Q0.5105,0.6958,0.4824,0.6811 T0.4356,0.6586 T0.4079,0.6533 Q0.3872,0.6741,0.3827,0.6782 Q0.3872,0.6835,0.3934,0.6929 T0.4037,0.7078 T0.4142,0.7198 T0.4284,0.7304 T0.4466,0.7365 Q0.4824,0.7443,0.5292,0.728 L0.5292,0.7294 T0.529,0.7333 T0.5284,0.7392 T0.5266,0.7463 T0.5236,0.7539 T0.5186,0.7612 T0.5111,0.7679 Q0.5086,0.77,0.5056,0.7716 Q0.4466,0.8104,0.3591,0.8091 Q0.344,0.8091,0.3246,0.802 T0.2893,0.7863 T0.2543,0.77 T0.2206,0.76 T0.1894,0.7643 Q0.1804,0.7684,0.1733,0.7753 Q0.1591,0.7892,0.1601,0.8169 Q0.1784,0.8067,0.1938,0.8053 T0.2212,0.8087 T0.2507,0.825 Q0.2614,0.8324,0.2744,0.8365 T0.3053,0.844 T0.332,0.8499 L0.303,0.894 L0.2998,0.8948 Q0.2904,0.8968,0.278,0.9009 T0.2554,0.9086 T0.233,0.9158 T0.2099,0.9213 T0.1868,0.9229 T0.1633,0.9192 Q0.1517,0.916,0.1367,0.9241 T0.1065,0.9462 T0.0753,0.9737 T0.041,0.9955 T0.0061,1 Q0,0.9984,0.0068,0.9845 Q0.009,0.9804,0.0123,0.9755 Q0.0187,0.9666,0.0261,0.9606 T0.0374,0.9555 Q0.0481,0.958,0.0629,0.949 T0.0931,0.9262 T0.1247,0.8987 T0.1597,0.8777 T0.1949,0.8752 Q0.213,0.8805,0.2343,0.8772 Q0.2249,0.8736,0.2172,0.8683 Q0.1914,0.8511,0.1738,0.8497 T0.1349,0.8617 Q0.1304,0.865,0.1273,0.8646 T0.1242,0.8605 L0.1239,0.8536 Q0.1226,0.8295,0.1354,0.8016 T0.1723,0.7496 Q0.1914,0.7308,0.2104,0.7219 Q0.2259,0.7145,0.2425,0.7141 T0.273,0.7182 T0.3022,0.7296 T0.3301,0.7439 T0.3569,0.7571 T0.3821,0.7643 Q0.373,0.7561,0.3598,0.7367 T0.3382,0.7088 L0.3327,0.7035 Q0.3282,0.699,0.3353,0.6884 T0.3517,0.6692 L0.3611,0.6607 Q0.3711,0.657,0.3751,0.6554 T0.3837,0.6507 T0.3898,0.6458 T0.3979,0.637 T0.4111,0.6236 Q0.4172,0.6175,0.4234,0.6138 Q0.4327,0.6081,0.4439,0.6077 T0.4655,0.6105 T0.4884,0.6201 T0.5113,0.633 T0.5347,0.6468 T0.5573,0.6578 Q0.5705,0.6635,0.5833,0.665 T0.6112,0.665 T0.6286,0.6635 Q0.6421,0.6631,0.6718,0.6501 Q0.626,0.6578,0.6089,0.6517 Q0.6063,0.6509,0.6002,0.6491 T0.5884,0.6454 T0.5757,0.6409 T0.561,0.6344 T0.5466,0.6256 Q0.536,0.6183,0.5108,0.5989 T0.4722,0.5712 T0.4527,0.564 L0.4418,0.5661 Q0.4308,0.5681,0.4366,0.5563 Q0.4401,0.5485,0.4476,0.5392 L0.455,0.5298 Q0.4631,0.5188,0.4714,0.51 T0.4866,0.4947 T0.5021,0.4831 T0.516,0.4749 T0.53,0.4694 T0.5428,0.4657 T0.5558,0.4637 T0.5674,0.4629 T0.5795,0.4625 Q0.5489,0.4543,0.534,0.4384 L0.5286,0.4327 Q0.5244,0.4282,0.5318,0.4174 T0.5486,0.398 L0.5579,0.3899 Q0.567,0.387,0.5749,0.3834 T0.5878,0.3772 T0.6012,0.3687 T0.6126,0.3603 T0.6268,0.3487 T0.6421,0.3361 Q0.6567,0.3242,0.6712,0.3159 T0.7009,0.3034 T0.7277,0.2973 T0.7556,0.2961 T0.7809,0.2977 T0.8074,0.301 Q0.8096,0.3014,0.8109,0.3016 T0.8143,0.302 T0.818,0.3026 Q0.8012,0.2936,0.7767,0.2781 Q0.6718,0.2117,0.5744,0.2476 Q0.5637,0.2516,0.5492,0.2604 T0.5218,0.2779 T0.4923,0.2965 T0.461,0.3124 T0.4282,0.3216 T0.394,0.3206 Q0.3637,0.3136,0.3474,0.2936 T0.3353,0.2459 Q0.3385,0.2247,0.355,0.2023 Q0.3646,0.1892,0.3763,0.179 Q0.3898,0.1672,0.4063,0.1595 Q0.3927,0.1562,0.3785,0.1485 Q0.3604,0.1387,0.3453,0.1354 T0.3161,0.1354 T0.2899,0.1458 T0.2627,0.166 Q0.262,0.1664,0.254,0.1733 T0.2414,0.1841 T0.2267,0.196 T0.2094,0.2086 T0.1915,0.2196 T0.1725,0.2288 T0.1546,0.2337 T0.1373,0.2343 T0.1223,0.228 T0.1097,0.2145 Q0.0962,0.1929,0.1258,0.1582 Q0.131,0.1517,0.1371,0.1464 Q0.1462,0.1387,0.156,0.1321 T0.1752,0.1205 T0.1878,0.1134 Q0.1891,0.1117,0.1947,0.103 T0.2035,0.0899 T0.2125,0.0781 T0.2243,0.064 Q0.1949,0.0616,0.1672,0.0828 Q0.153,0.0934,0.1412,0.1009 T0.1146,0.1146 T0.0873,0.1213 T0.0616,0.116 T0.0374,0.0962 Q0.0339,0.0909,0.0295,0.0846 T0.024,0.0767 T0.0202,0.0728 T0.0148,0.0704 T0.0068,0.0697 Q0.0003,0.0693,0.0058,0.0567 Q0.0077,0.0522,0.011,0.0469 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.1934,0.6075 Q0.2012,0.612,0.2188,0.6218 T0.2459,0.6369 T0.2718,0.6508 T0.2983,0.6644 T0.322,0.6758 T0.3447,0.6854 T0.363,0.6911 T0.3783,0.6936 Q0.3796,0.6936,0.396,0.6952 T0.4265,0.6952 T0.4548,0.6879 Q0.4656,0.6834,0.4805,0.6756 T0.5073,0.6614 T0.5327,0.6485 T0.5564,0.6389 T0.5759,0.6363 T0.5909,0.6422 Q0.5953,0.6467,0.604,0.6554 T0.6155,0.6669 T0.6251,0.6746 T0.6387,0.683 T0.6556,0.6903 L0.6498,0.6956 Q0.6414,0.7042,0.6319,0.7177 T0.6162,0.7403 T0.5979,0.7583 T0.5703,0.7703 Q0.5313,0.7785,0.4799,0.7605 Q0.5097,0.7817,0.5508,0.7911 T0.6302,0.8001 Q0.6431,0.7997,0.659,0.7942 T0.6888,0.7813 T0.7194,0.766 T0.7506,0.753 T0.7819,0.7472 T0.8131,0.754 Q0.8239,0.7589,0.8346,0.7681 T0.8544,0.7895 T0.8689,0.818 T0.8737,0.8507 L0.8733,0.858 Q0.8591,0.849,0.8474,0.845 T0.8242,0.8421 T0.8021,0.8482 T0.7772,0.8625 Q0.7653,0.8707,0.7513,0.8752 T0.7184,0.8831 T0.6908,0.889 Q0.7017,0.8915,0.7152,0.8956 T0.7396,0.9037 T0.7633,0.9115 T0.7872,0.9174 T0.8107,0.9194 T0.8347,0.9155 Q0.8493,0.9115,0.8671,0.9196 T0.9015,0.9421 T0.9345,0.9708 T0.9682,0.9943 T0.9997,1 Q0.999,0.94,0.9983,0.6508 T0.9976,0.2322 Q0.9976,0.2109,0.9992,0.1379 T1,0.0249 Q0.9949,0.0249,0.9917,0.0257 T0.9863,0.0273 T0.9817,0.0308 T0.9776,0.0357 T0.9721,0.0437 T0.9651,0.0539 Q0.956,0.0657,0.9456,0.072 T0.9247,0.0789 T0.904,0.0775 T0.8823,0.0694 T0.862,0.0573 T0.8422,0.0432 Q0.7856,0,0.7328,0.0318 Q0.7392,0.0318,0.7452,0.0324 T0.756,0.0345 T0.7657,0.0386 T0.7741,0.0437 T0.7821,0.0506 T0.7894,0.0588 T0.7966,0.0683 T0.8039,0.0787 T0.8119,0.0904 T0.8202,0.1028 Q0.8249,0.1093,0.849,0.1234 T0.8811,0.1448 Q0.8998,0.1612,0.8893,0.1783 Q0.8835,0.1877,0.8759,0.1928 T0.8593,0.1979 T0.8417,0.1967 T0.8222,0.1895 T0.8034,0.1791 T0.7848,0.1663 T0.7687,0.1534 T0.7543,0.141 T0.744,0.1322 Q0.7186,0.1106,0.6984,0.101 T0.6559,0.0926 T0.6082,0.1077 Q0.5899,0.1175,0.5733,0.1206 T0.5411,0.1202 T0.5122,0.1098 T0.4822,0.0914 Q0.4927,0.1032,0.5036,0.1122 T0.5276,0.1285 T0.5503,0.1401 T0.5777,0.1518 T0.6055,0.1636 Q0.6258,0.1726,0.6375,0.1863 T0.6519,0.2162 Q0.6556,0.2403,0.6392,0.2605 T0.5926,0.2876 Q0.5804,0.2909,0.5672,0.2899 T0.5428,0.2856 T0.5193,0.2764 T0.4966,0.264 T0.4744,0.2497 T0.4523,0.2352 T0.4301,0.2222 T0.4077,0.2118 Q0.3021,0.173,0.1903,0.2436 Q0.1669,0.2583,0.1504,0.2674 T0.1129,0.2846 T0.075,0.294 T0.0384,0.2911 T0,0.2746 Q0.021,0.297,0.0459,0.3082 T0.0953,0.3207 T0.146,0.3193 T0.1988,0.3131 T0.2508,0.3095 T0.3029,0.3176 T0.3529,0.3448 Q0.3566,0.348,0.3652,0.355 T0.3771,0.3645 T0.3877,0.3731 T0.3993,0.3815 T0.4103,0.3884 T0.4226,0.3953 T0.4352,0.4009 T0.4497,0.4064 L0.4443,0.4121 Q0.4372,0.4198,0.4277,0.4251 T0.4072,0.4337 T0.3867,0.439 T0.3656,0.4431 T0.3481,0.4468 Q0.3241,0.4529,0.2943,0.4463 Q0.3227,0.4623,0.3458,0.471 T0.3959,0.4814 Q0.404,0.4818,0.4187,0.4825 T0.4409,0.4835 T0.4605,0.4857 T0.4809,0.4908 T0.4992,0.4996 T0.5186,0.5141 T0.5371,0.5353 L0.5449,0.5451 L0.5337,0.543 Q0.5242,0.541,0.5091,0.55 T0.4683,0.5796 T0.4314,0.6083 Q0.4203,0.6161,0.4086,0.6212 T0.382,0.6308 T0.3667,0.6353 Q0.3485,0.6418,0.2995,0.633 T0.1934,0.6075 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C3}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.989,0.0469 Q0.9829,0.0379,0.9753,0.0316 T0.9635,0.0253 Q0.9574,0.0257,0.9539,0.0263 T0.9466,0.03 T0.9418,0.0345 T0.9355,0.0434 T0.9277,0.0546 Q0.9193,0.0653,0.9103,0.0712 T0.8919,0.0775 T0.8745,0.0765 T0.8564,0.0695 T0.8396,0.0593 T0.8228,0.0473 Q0.7612,0,0.7073,0.0326 L0.7386,0.0767 L0.7419,0.0767 Q0.7506,0.0767,0.7556,0.0773 T0.7641,0.0789 T0.7709,0.0842 T0.7767,0.0922 T0.7854,0.1054 T0.7974,0.1236 Q0.8057,0.1354,0.8157,0.1444 T0.8325,0.1574 T0.8474,0.1654 T0.8571,0.1701 Q0.8564,0.1717,0.8554,0.1733 Q0.8503,0.1815,0.844,0.186 T0.8301,0.1909 T0.8153,0.1903 T0.7993,0.1845 T0.7836,0.1758 T0.768,0.1648 T0.754,0.1535 T0.741,0.1425 T0.7312,0.1338 Q0.7031,0.1101,0.6805,0.0995 T0.6357,0.0901 T0.5886,0.1048 Q0.5721,0.1138,0.5574,0.1168 T0.5295,0.117 T0.5055,0.1089 T0.4814,0.0942 L0.4789,0.0926 L0.4711,0.0922 Q0.4589,0.095,0.4811,0.1203 Q0.495,0.1358,0.5087,0.1474 T0.5366,0.167 T0.5611,0.1796 T0.5879,0.1909 T0.6134,0.2011 Q0.6218,0.2047,0.6273,0.2092 Q0.6283,0.2117,0.6286,0.2141 Q0.6305,0.2263,0.6249,0.2388 T0.606,0.2616 T0.5747,0.2761 Q0.5602,0.2785,0.5487,0.2779 T0.5245,0.2724 T0.5015,0.2616 T0.4784,0.2476 T0.4547,0.2321 T0.4297,0.217 T0.4024,0.2043 Q0.2985,0.166,0.1901,0.2345 Q0.1694,0.248,0.1523,0.2569 T0.1165,0.2726 T0.0818,0.2812 T0.0494,0.2796 T0.0181,0.2663 L0.0116,0.2671 Q0,0.272,0.0232,0.2969 Q0.0468,0.3222,0.0742,0.3365 T0.1278,0.3542 T0.1807,0.3564 T0.233,0.352 T0.2815,0.3473 T0.3269,0.3509 T0.3656,0.3699 Q0.4037,0.4005,0.4153,0.4082 Q0.405,0.4139,0.3921,0.4174 T0.3633,0.4237 T0.3414,0.4278 Q0.3207,0.4331,0.2956,0.4278 Q0.2943,0.4278,0.293,0.4274 Q0.2933,0.429,0.2938,0.4313 T0.2964,0.4398 T0.3007,0.4513 T0.3069,0.4619 T0.3149,0.4698 Q0.3427,0.4857,0.3664,0.4947 T0.4169,0.5053 Q0.423,0.5057,0.4385,0.5065 T0.4606,0.508 T0.4779,0.51 T0.4958,0.5139 T0.5095,0.5204 Q0.4992,0.5232,0.485,0.5328 T0.451,0.5585 T0.4201,0.5824 Q0.4095,0.5897,0.3987,0.5946 T0.3738,0.6036 T0.3591,0.6081 Q0.3433,0.6134,0.2965,0.605 T0.1972,0.5816 L0.2026,0.5922 T0.2133,0.6134 L0.2188,0.624 Q0.2201,0.6248,0.2214,0.6252 Q0.2291,0.6297,0.2486,0.6405 T0.2786,0.657 T0.3066,0.6721 T0.3353,0.6866 T0.3598,0.6972 T0.383,0.7051 T0.4005,0.7076 Q0.4008,0.7076,0.4169,0.7092 T0.4471,0.7092 T0.475,0.7019 Q0.4895,0.6958,0.5176,0.6811 T0.5644,0.6586 T0.5921,0.6533 Q0.6128,0.6741,0.6173,0.6782 Q0.6131,0.6835,0.6068,0.6929 T0.5963,0.7078 T0.5858,0.7198 T0.5716,0.7304 T0.5534,0.7365 Q0.5179,0.7443,0.4708,0.728 L0.4708,0.7294 T0.471,0.7333 T0.4716,0.7392 T0.4734,0.7463 T0.4764,0.7539 T0.4814,0.7612 T0.4889,0.7679 Q0.4914,0.77,0.4944,0.7716 Q0.5534,0.8104,0.6409,0.8091 Q0.6521,0.8091,0.6654,0.8053 T0.6907,0.7959 T0.7157,0.7838 T0.741,0.772 T0.7652,0.7631 T0.7888,0.7594 T0.8106,0.7643 Q0.8196,0.7684,0.8267,0.7753 Q0.8409,0.7892,0.8399,0.8169 Q0.8216,0.8067,0.8062,0.8053 T0.7788,0.8087 T0.7493,0.825 Q0.7386,0.8324,0.7256,0.8365 T0.6947,0.844 T0.668,0.8499 L0.697,0.894 L0.7002,0.8948 Q0.7099,0.8968,0.7222,0.9009 T0.7446,0.9086 T0.767,0.9158 T0.7901,0.9213 T0.8132,0.9229 T0.8367,0.9192 Q0.8483,0.916,0.8633,0.9241 T0.8937,0.9462 T0.9248,0.9737 T0.959,0.9955 T0.9939,1 Q1,0.9984,0.9932,0.9845 Q0.991,0.9804,0.9877,0.9755 Q0.9813,0.9666,0.9739,0.9606 T0.9626,0.9555 Q0.9519,0.958,0.9372,0.949 T0.9071,0.9262 T0.8753,0.8987 T0.8403,0.8777 T0.8051,0.8752 Q0.787,0.8805,0.7657,0.8772 Q0.7751,0.8736,0.7828,0.8683 Q0.8086,0.8511,0.8262,0.8497 T0.8651,0.8617 Q0.8696,0.865,0.8727,0.8646 T0.8758,0.8605 L0.8761,0.8536 Q0.8774,0.8295,0.8646,0.8016 T0.8277,0.7496 Q0.8086,0.7308,0.7896,0.7219 Q0.7741,0.7145,0.7575,0.7141 T0.727,0.7182 T0.6978,0.7296 T0.6699,0.7439 T0.6433,0.7571 T0.6179,0.7643 Q0.627,0.7561,0.6402,0.7367 T0.6618,0.7088 L0.6673,0.7035 Q0.6718,0.699,0.6647,0.6884 T0.6483,0.6692 L0.6389,0.6607 Q0.6289,0.657,0.6249,0.6554 T0.6163,0.6507 T0.6102,0.6458 T0.6021,0.637 T0.5889,0.6236 Q0.5828,0.6175,0.5766,0.6138 Q0.5673,0.6081,0.5561,0.6077 T0.5345,0.6105 T0.5116,0.6201 T0.4887,0.633 T0.4653,0.6468 T0.4427,0.6578 Q0.4295,0.6635,0.4167,0.665 T0.3888,0.665 T0.3714,0.6635 Q0.3579,0.6631,0.3282,0.6501 Q0.374,0.6578,0.3911,0.6517 Q0.3937,0.6509,0.4024,0.6482 T0.4179,0.6434 T0.4348,0.6364 T0.4534,0.6256 Q0.464,0.6183,0.4892,0.5989 T0.5278,0.5712 T0.5476,0.564 L0.5582,0.5661 Q0.5692,0.5681,0.5634,0.5563 Q0.5599,0.5485,0.5524,0.5392 L0.545,0.5298 Q0.5369,0.5188,0.5286,0.51 T0.5134,0.4947 T0.4979,0.4831 T0.484,0.4749 T0.47,0.4694 T0.4572,0.4657 T0.4442,0.4637 T0.4326,0.4629 T0.4205,0.4625 Q0.4511,0.4543,0.466,0.4384 L0.4714,0.4327 Q0.4795,0.4237,0.4469,0.394 L0.4421,0.3899 Q0.433,0.387,0.4251,0.3834 T0.4122,0.3772 T0.3988,0.3687 T0.3874,0.3603 T0.3732,0.3487 T0.3579,0.3361 Q0.3433,0.3242,0.3288,0.3159 T0.2993,0.3034 T0.2725,0.2973 T0.2446,0.2961 T0.2193,0.2977 T0.1926,0.301 Q0.1855,0.3022,0.182,0.3026 Q0.1991,0.2936,0.2233,0.2781 Q0.3282,0.2117,0.4256,0.2476 Q0.4363,0.2516,0.451,0.2604 T0.4784,0.2779 T0.5077,0.2965 T0.539,0.3124 T0.5718,0.3216 T0.606,0.3206 Q0.6363,0.3136,0.6526,0.2936 T0.6647,0.2459 Q0.6615,0.2247,0.645,0.2023 Q0.6354,0.1892,0.6237,0.179 Q0.6102,0.1672,0.5937,0.1595 Q0.6073,0.1562,0.6215,0.1485 Q0.6396,0.1387,0.6547,0.1354 T0.6839,0.1354 T0.7101,0.1458 T0.7373,0.166 Q0.738,0.1664,0.746,0.1733 T0.7586,0.1841 T0.7733,0.196 T0.7907,0.2086 T0.8086,0.2196 T0.8275,0.2288 T0.8454,0.2337 T0.8627,0.2343 T0.8777,0.228 T0.8903,0.2145 Q0.9038,0.1929,0.8742,0.1582 Q0.869,0.1517,0.8629,0.1464 Q0.8538,0.1387,0.844,0.1321 T0.8248,0.1205 T0.8122,0.1134 Q0.8109,0.1117,0.8053,0.103 T0.7965,0.0899 T0.7875,0.0781 T0.7757,0.064 Q0.8051,0.0616,0.8328,0.0828 Q0.847,0.0934,0.8588,0.1009 T0.8854,0.1146 T0.9127,0.1213 T0.9384,0.116 T0.9626,0.0962 Q0.9664,0.0909,0.9706,0.0846 T0.976,0.0767 T0.9798,0.0728 T0.9852,0.0704 T0.9932,0.0697 Q0.9997,0.0693,0.9942,0.0567 Q0.9923,0.0522,0.989,0.0469 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C4}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.4116,0.0126 L0.4116,0.0776 L0.4871,0.0776 L0.4871,0.0126 L0.4116,0.0126 Z M0.4043,0 L0.4944,0 Q0.4973,0,0.4995,0.0021 T0.5017,0.0063 L0.5017,0.0839 Q0.5017,0.0864,0.4993,0.0883 T0.4944,0.0902 L0.4043,0.0902 Q0.4014,0.0902,0.3992,0.0881 T0.397,0.0839 L0.397,0.0063 Q0.397,0.0038,0.3994,0.0019 T0.4043,0 Z M0.4116,0.0126 L0.4116,0.0776 L0.4871,0.0776 L0.4871,0.0126 L0.4116,0.0126 Z M0.4043,0 L0.4944,0 Q0.4973,0,0.4995,0.0021 T0.5017,0.0063 L0.5017,0.0839 Q0.5017,0.0864,0.4993,0.0883 T0.4944,0.0902 L0.4043,0.0902 Q0.4014,0.0902,0.3992,0.0881 T0.397,0.0839 L0.397,0.0063 Q0.397,0.0038,0.3994,0.0019 T0.4043,0 Z M0.4116,0.0126 L0.4116,0.0776 L0.4871,0.0776 L0.4871,0.0126 L0.4116,0.0126 Z M0.4043,0 L0.4944,0 Q0.4973,0,0.4995,0.0021 T0.5017,0.0063 L0.5017,0.0839 Q0.5017,0.0864,0.4993,0.0883 T0.4944,0.0902 L0.4043,0.0902 Q0.4014,0.0902,0.3992,0.0881 T0.397,0.0839 L0.397,0.0063 Q0.397,0.0038,0.3994,0.0019 T0.4043,0 Z M0.9099,0.0084 L0.9099,0.0818 L0.9951,0.0818 L0.9951,0.0084 L0.9099,0.0084 Z M0.9075,0.0042 L0.9976,0.0042 Q1,0.0042,1,0.0063 L1,0.0839 Q1,0.086,0.9976,0.086 L0.9075,0.086 Q0.905,0.086,0.905,0.0839 L0.905,0.0063 Q0.905,0.0042,0.9075,0.0042 Z M0.9099,0.0084 L0.9099,0.0818 L0.9951,0.0818 L0.9951,0.0084 L0.9099,0.0084 Z M0.9075,0.0042 L0.9976,0.0042 Q1,0.0042,1,0.0063 L1,0.0839 Q1,0.086,0.9976,0.086 L0.9075,0.086 Q0.905,0.086,0.905,0.0839 L0.905,0.0063 Q0.905,0.0042,0.9075,0.0042 Z M0.9099,0.0084 L0.9099,0.0818 L0.9951,0.0818 L0.9951,0.0084 L0.9099,0.0084 Z M0.9075,0.0042 L0.9976,0.0042 Q1,0.0042,1,0.0063 L1,0.0839 Q1,0.086,0.9976,0.086 L0.9075,0.086 Q0.905,0.086,0.905,0.0839 L0.905,0.0063 Q0.905,0.0042,0.9075,0.0042 Z M0.66,0.0063 L0.7501,0.0063 L0.7501,0.0839 L0.66,0.0839 L0.66,0.0063 Z M0.66,0.0063 L0.7501,0.0063 L0.7501,0.0839 L0.66,0.0839 L0.66,0.0063 Z M0.66,0.0063 L0.7501,0.0063 L0.7501,0.0839 L0.66,0.0839 L0.66,0.0063 Z M0.5309,0.0063 L0.621,0.0063 L0.621,0.0839 L0.5309,0.0839 L0.5309,0.0063 Z M0.5309,0.0063 L0.621,0.0063 L0.621,0.0839 L0.5309,0.0839 L0.5309,0.0063 Z M0.5309,0.0063 L0.621,0.0063 L0.621,0.0839 L0.5309,0.0839 L0.5309,0.0063 Z M0.2689,0.0063 L0.359,0.0063 L0.359,0.0839 L0.2689,0.0839 L0.2689,0.0063 Z M0.2689,0.0063 L0.359,0.0063 L0.359,0.0839 L0.2689,0.0839 L0.2689,0.0063 Z M0.2689,0.0063 L0.359,0.0063 L0.359,0.0839 L0.2689,0.0839 L0.2689,0.0063 Z M0.1374,0.0063 L0.2275,0.0063 L0.2275,0.0839 L0.1374,0.0839 L0.1374,0.0063 Z M0.1374,0.0063 L0.2275,0.0063 L0.2275,0.0839 L0.1374,0.0839 L0.1374,0.0063 Z M0.1374,0.0063 L0.2275,0.0063 L0.2275,0.0839 L0.1374,0.0839 L0.1374,0.0063 Z M0,0.0063 L0.0901,0.0063 L0.0901,0.0839 L0,0.0839 L0,0.0063 Z M0,0.0063 L0.0901,0.0063 L0.0901,0.0839 L0,0.0839 L0,0.0063 Z M0,0.0063 L0.0901,0.0063 L0.0901,0.0839 L0,0.0839 L0,0.0063 Z M0.4087,0.9224 L0.4087,0.9958 L0.4939,0.9958 L0.4939,0.9224 L0.4087,0.9224 Z M0.4062,0.9182 L0.4963,0.9182 Q0.4988,0.9182,0.4988,0.9203 L0.4988,0.9979 Q0.4988,1,0.4963,1 L0.4062,1 Q0.4038,1,0.4038,0.9979 L0.4038,0.9203 Q0.4038,0.9182,0.4062,0.9182 Z M0.4087,0.9224 L0.4087,0.9958 L0.4939,0.9958 L0.4939,0.9224 L0.4087,0.9224 Z M0.4062,0.9182 L0.4963,0.9182 Q0.4988,0.9182,0.4988,0.9203 L0.4988,0.9979 Q0.4988,1,0.4963,1 L0.4062,1 Q0.4038,1,0.4038,0.9979 L0.4038,0.9203 Q0.4038,0.9182,0.4062,0.9182 Z M0.4087,0.9224 L0.4087,0.9958 L0.4939,0.9958 L0.4939,0.9224 L0.4087,0.9224 Z M0.4062,0.9182 L0.4963,0.9182 Q0.4988,0.9182,0.4988,0.9203 L0.4988,0.9979 Q0.4988,1,0.4963,1 L0.4062,1 Q0.4038,1,0.4038,0.9979 L0.4038,0.9203 Q0.4038,0.9182,0.4062,0.9182 Z M0.1374,0.9203 L0.2275,0.9203 L0.2275,0.9979 L0.1374,0.9979 L0.1374,0.9203 Z M0.1374,0.9203 L0.2275,0.9203 L0.2275,0.9979 L0.1374,0.9979 L0.1374,0.9203 Z M0.1374,0.9203 L0.2275,0.9203 L0.2275,0.9979 L0.1374,0.9979 L0.1374,0.9203 Z M0,0.9203 L0.0901,0.9203 L0.0901,0.9979 L0,0.9979 L0,0.9203 Z M0,0.9203 L0.0901,0.9203 L0.0901,0.9979 L0,0.9979 L0,0.9203 Z M0,0.9203 L0.0901,0.9203 L0.0901,0.9979 L0,0.9979 L0,0.9203 Z M0.9099,0.1158 L0.9099,0.1888 L0.9951,0.1888 L0.9951,0.1158 L0.9099,0.1158 Z M0.9075,0.1116 L0.9976,0.1116 Q1,0.1116,1,0.1137 L1,0.1909 Q1,0.193,0.9976,0.193 L0.9075,0.193 Q0.905,0.193,0.905,0.1909 L0.905,0.1137 Q0.905,0.1116,0.9075,0.1116 Z M0.7852,0.6086 L0.7852,0.682 L0.8704,0.682 L0.8704,0.6086 L0.7852,0.6086 Z M0.7828,0.6044 L0.8729,0.6044 Q0.8753,0.6044,0.8753,0.6065 L0.8753,0.6841 Q0.8753,0.6862,0.8729,0.6862 L0.7828,0.6862 Q0.7803,0.6862,0.7803,0.6841 L0.7803,0.6065 Q0.7803,0.6044,0.7828,0.6044 Z M0.66,0.1137 L0.7501,0.1137 L0.7501,0.1909 L0.66,0.1909 L0.66,0.1137 Z M0.6624,0.4102 L0.6624,0.4836 L0.7477,0.4836 L0.7477,0.4102 L0.6624,0.4102 Z M0.66,0.406 L0.7501,0.406 Q0.7526,0.406,0.7526,0.4081 L0.7526,0.4857 Q0.7526,0.4878,0.7501,0.4878 L0.66,0.4878 Q0.6576,0.4878,0.6576,0.4857 L0.6576,0.4081 Q0.6576,0.406,0.66,0.406 Z M0.6624,0.7131 L0.6624,0.7865 L0.7477,0.7865 L0.7477,0.7131 L0.6624,0.7131 Z M0.66,0.7089 L0.7501,0.7089 Q0.7526,0.7089,0.7526,0.711 L0.7526,0.7886 Q0.7526,0.7907,0.7501,0.7907 L0.66,0.7907 Q0.6576,0.7907,0.6576,0.7886 L0.6576,0.711 Q0.6576,0.7089,0.66,0.7089 Z M0.5407,0.2227 L0.5407,0.2836 L0.6113,0.2836 L0.6113,0.2227 L0.5407,0.2227 Z M0.5309,0.206 L0.621,0.206 Q0.623,0.206,0.6249,0.2068 T0.6281,0.2089 T0.6301,0.2116 T0.6308,0.2143 L0.6308,0.2919 Q0.6308,0.2957,0.6276,0.298 T0.621,0.3003 L0.5309,0.3003 Q0.5265,0.3003,0.5239,0.2976 T0.5212,0.2919 L0.5212,0.2143 Q0.5212,0.211,0.5244,0.2085 T0.5309,0.206 Z M0.5407,0.3184 L0.5407,0.3792 L0.6113,0.3792 L0.6113,0.3184 L0.5407,0.3184 Z M0.5309,0.3016 L0.621,0.3016 Q0.6254,0.3016,0.6281,0.3043 T0.6308,0.31 L0.6308,0.3876 Q0.6308,0.3914,0.6276,0.3937 T0.621,0.396 L0.5309,0.396 Q0.5265,0.396,0.5239,0.3932 T0.5212,0.3876 L0.5212,0.31 Q0.5212,0.3062,0.5244,0.3039 T0.5309,0.3016 Z M0.5309,0.4081 L0.621,0.4081 L0.621,0.4857 L0.5309,0.4857 L0.5309,0.4081 Z M0.5309,0.5059 L0.621,0.5059 L0.621,0.5835 L0.5309,0.5835 L0.5309,0.5059 Z M0.5407,0.6149 L0.5407,0.6758 L0.6113,0.6758 L0.6113,0.6149 L0.5407,0.6149 Z M0.5309,0.5982 L0.621,0.5982 Q0.6254,0.5982,0.6281,0.6009 T0.6308,0.6065 L0.6308,0.6841 Q0.6308,0.6879,0.6276,0.6902 T0.621,0.6925 L0.5309,0.6925 Q0.5265,0.6925,0.5239,0.6898 T0.5212,0.6841 L0.5212,0.6065 Q0.5212,0.6028,0.5244,0.6005 T0.5309,0.5982 Z M0.4062,0.1137 L0.4963,0.1137 L0.4963,0.1909 L0.4062,0.1909 L0.4062,0.1137 Z M0.4062,0.2143 L0.4963,0.2143 L0.4963,0.2919 L0.4062,0.2919 L0.4062,0.2143 Z M0.4184,0.4186 L0.4184,0.4753 L0.4842,0.4753 L0.4842,0.4186 L0.4184,0.4186 Z M0.4062,0.3977 L0.4963,0.3977 Q0.5017,0.3977,0.5051,0.401 T0.5085,0.4081 L0.5085,0.4857 Q0.5085,0.4904,0.5046,0.4933 T0.4963,0.4962 L0.4062,0.4962 Q0.4009,0.4962,0.3975,0.4929 T0.3941,0.4857 L0.3941,0.4081 Q0.3941,0.4035,0.398,0.4006 T0.4062,0.3977 Z M0.4062,0.5059 L0.4963,0.5059 L0.4963,0.5835 L0.4062,0.5835 L0.4062,0.5059 Z M0.4087,0.7131 L0.4087,0.7865 L0.4939,0.7865 L0.4939,0.7131 L0.4087,0.7131 Z M0.4062,0.7089 L0.4963,0.7089 Q0.4988,0.7089,0.4988,0.711 L0.4988,0.7886 Q0.4988,0.7907,0.4963,0.7907 L0.4062,0.7907 Q0.4038,0.7907,0.4038,0.7886 L0.4038,0.711 Q0.4038,0.7089,0.4062,0.7089 Z M0.2689,0.1137 L0.359,0.1137 L0.359,0.1909 L0.2689,0.1909 L0.2689,0.1137 Z M0.2689,0.2143 L0.359,0.2143 L0.359,0.2919 L0.2689,0.2919 L0.2689,0.2143 Z M0.2689,0.8154 L0.359,0.8154 L0.359,0.8926 L0.2689,0.8926 L0.2689,0.8154 Z M0.2689,0.31 L0.359,0.31 L0.359,0.3876 L0.2689,0.3876 L0.2689,0.31 Z M0.2689,0.8154 L0.359,0.8154 L0.359,0.8926 L0.2689,0.8926 L0.2689,0.8154 Z M0.2689,0.4081 L0.359,0.4081 L0.359,0.4857 L0.2689,0.4857 L0.2689,0.4081 Z M0.2689,0.5059 L0.359,0.5059 L0.359,0.5835 L0.2689,0.5835 L0.2689,0.5059 Z M0.2689,0.711 L0.359,0.711 L0.359,0.7886 L0.2689,0.7886 L0.2689,0.711 Z M0.2689,0.8154 L0.359,0.8154 L0.359,0.8926 L0.2689,0.8926 L0.2689,0.8154 Z M0.1374,0.1137 L0.2275,0.1137 L0.2275,0.1909 L0.1374,0.1909 L0.1374,0.1137 Z M0.1374,0.2143 L0.2275,0.2143 L0.2275,0.2919 L0.1374,0.2919 L0.1374,0.2143 Z M0.1374,0.8154 L0.2275,0.8154 L0.2275,0.8926 L0.1374,0.8926 L0.1374,0.8154 Z M0.1374,0.31 L0.2275,0.31 L0.2275,0.3876 L0.1374,0.3876 L0.1374,0.31 Z M0.1374,0.8154 L0.2275,0.8154 L0.2275,0.8926 L0.1374,0.8926 L0.1374,0.8154 Z M0.1374,0.4081 L0.2275,0.4081 L0.2275,0.4857 L0.1374,0.4857 L0.1374,0.4081 Z M0.1374,0.5059 L0.2275,0.5059 L0.2275,0.5835 L0.1374,0.5835 L0.1374,0.5059 Z M0.1374,0.6065 L0.2275,0.6065 L0.2275,0.6841 L0.1374,0.6841 L0.1374,0.6065 Z M0.1374,0.711 L0.2275,0.711 L0.2275,0.7886 L0.1374,0.7886 L0.1374,0.711 Z M0.1374,0.8154 L0.2275,0.8154 L0.2275,0.8926 L0.1374,0.8926 L0.1374,0.8154 Z M0,0.1137 L0.0901,0.1137 L0.0901,0.1909 L0,0.1909 L0,0.1137 Z M0,0.2143 L0.0901,0.2143 L0.0901,0.2919 L0,0.2919 L0,0.2143 Z M0,0.8154 L0.0901,0.8154 L0.0901,0.8926 L0,0.8926 L0,0.8154 Z M0,0.31 L0.0901,0.31 L0.0901,0.3876 L0,0.3876 L0,0.31 Z M0,0.8154 L0.0901,0.8154 L0.0901,0.8926 L0,0.8926 L0,0.8154 Z M0,0.4081 L0.0901,0.4081 L0.0901,0.4857 L0,0.4857 L0,0.4081 Z M0,0.5059 L0.0901,0.5059 L0.0901,0.5835 L0,0.5835 L0,0.5059 Z M0,0.6065 L0.0901,0.6065 L0.0901,0.6841 L0,0.6841 L0,0.6065 Z M0,0.711 L0.0901,0.711 L0.0901,0.7886 L0,0.7886 L0,0.711 Z M0,0.8154 L0.0901,0.8154 L0.0901,0.8926 L0,0.8926 L0,0.8154 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C5}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.5884,0.0126 L0.5884,0.0776 L0.5129,0.0776 L0.5129,0.0126 L0.5884,0.0126 Z M0.5957,0 L0.5056,0 Q0.5027,0,0.5005,0.0021 T0.4983,0.0063 L0.4983,0.0839 Q0.4983,0.0864,0.5007,0.0883 T0.5056,0.0902 L0.5957,0.0902 Q0.5986,0.0902,0.6008,0.0881 T0.603,0.0839 L0.603,0.0063 Q0.603,0.0038,0.6006,0.0019 T0.5957,0 Z M0.5884,0.0126 L0.5884,0.0776 L0.5129,0.0776 L0.5129,0.0126 L0.5884,0.0126 Z M0.5957,0 L0.5056,0 Q0.5027,0,0.5005,0.0021 T0.4983,0.0063 L0.4983,0.0839 Q0.4983,0.0864,0.5007,0.0883 T0.5056,0.0902 L0.5957,0.0902 Q0.5986,0.0902,0.6008,0.0881 T0.603,0.0839 L0.603,0.0063 Q0.603,0.0038,0.6006,0.0019 T0.5957,0 Z M0.5884,0.0126 L0.5884,0.0776 L0.5129,0.0776 L0.5129,0.0126 L0.5884,0.0126 Z M0.5957,0 L0.5056,0 Q0.5027,0,0.5005,0.0021 T0.4983,0.0063 L0.4983,0.0839 Q0.4983,0.0864,0.5007,0.0883 T0.5056,0.0902 L0.5957,0.0902 Q0.5986,0.0902,0.6008,0.0881 T0.603,0.0839 L0.603,0.0063 Q0.603,0.0038,0.6006,0.0019 T0.5957,0 Z M0.0901,0.0084 L0.0901,0.0818 L0.0049,0.0818 L0.0049,0.0084 L0.0901,0.0084 Z M0.0925,0.0042 L0.0024,0.0042 Q0,0.0042,0,0.0063 L0,0.0839 Q0,0.086,0.0024,0.086 L0.0925,0.086 Q0.095,0.086,0.095,0.0839 L0.095,0.0063 Q0.095,0.0042,0.0925,0.0042 Z M0.0901,0.0084 L0.0901,0.0818 L0.0049,0.0818 L0.0049,0.0084 L0.0901,0.0084 Z M0.0925,0.0042 L0.0024,0.0042 Q0,0.0042,0,0.0063 L0,0.0839 Q0,0.086,0.0024,0.086 L0.0925,0.086 Q0.095,0.086,0.095,0.0839 L0.095,0.0063 Q0.095,0.0042,0.0925,0.0042 Z M0.0901,0.0084 L0.0901,0.0818 L0.0049,0.0818 L0.0049,0.0084 L0.0901,0.0084 Z M0.0925,0.0042 L0.0024,0.0042 Q0,0.0042,0,0.0063 L0,0.0839 Q0,0.086,0.0024,0.086 L0.0925,0.086 Q0.095,0.086,0.095,0.0839 L0.095,0.0063 Q0.095,0.0042,0.0925,0.0042 Z M0.34,0.0063 L0.2499,0.0063 L0.2499,0.0839 L0.34,0.0839 L0.34,0.0063 Z M0.34,0.0063 L0.2499,0.0063 L0.2499,0.0839 L0.34,0.0839 L0.34,0.0063 Z M0.34,0.0063 L0.2499,0.0063 L0.2499,0.0839 L0.34,0.0839 L0.34,0.0063 Z M0.4691,0.0063 L0.379,0.0063 L0.379,0.0839 L0.4691,0.0839 L0.4691,0.0063 Z M0.4691,0.0063 L0.379,0.0063 L0.379,0.0839 L0.4691,0.0839 L0.4691,0.0063 Z M0.4691,0.0063 L0.379,0.0063 L0.379,0.0839 L0.4691,0.0839 L0.4691,0.0063 Z M0.7311,0.0063 L0.641,0.0063 L0.641,0.0839 L0.7311,0.0839 L0.7311,0.0063 Z M0.7311,0.0063 L0.641,0.0063 L0.641,0.0839 L0.7311,0.0839 L0.7311,0.0063 Z M0.7311,0.0063 L0.641,0.0063 L0.641,0.0839 L0.7311,0.0839 L0.7311,0.0063 Z M0.8626,0.0063 L0.7725,0.0063 L0.7725,0.0839 L0.8626,0.0839 L0.8626,0.0063 Z M0.8626,0.0063 L0.7725,0.0063 L0.7725,0.0839 L0.8626,0.0839 L0.8626,0.0063 Z M0.8626,0.0063 L0.7725,0.0063 L0.7725,0.0839 L0.8626,0.0839 L0.8626,0.0063 Z M1,0.0063 L0.9099,0.0063 L0.9099,0.0839 L1,0.0839 L1,0.0063 Z M1,0.0063 L0.9099,0.0063 L0.9099,0.0839 L1,0.0839 L1,0.0063 Z M1,0.0063 L0.9099,0.0063 L0.9099,0.0839 L1,0.0839 L1,0.0063 Z M0.5913,0.9224 L0.5913,0.9958 L0.5061,0.9958 L0.5061,0.9224 L0.5913,0.9224 Z M0.5938,0.9182 L0.5037,0.9182 Q0.5012,0.9182,0.5012,0.9203 L0.5012,0.9979 Q0.5012,1,0.5037,1 L0.5938,1 Q0.5962,1,0.5962,0.9979 L0.5962,0.9203 Q0.5962,0.9182,0.5938,0.9182 Z M0.5913,0.9224 L0.5913,0.9958 L0.5061,0.9958 L0.5061,0.9224 L0.5913,0.9224 Z M0.5938,0.9182 L0.5037,0.9182 Q0.5012,0.9182,0.5012,0.9203 L0.5012,0.9979 Q0.5012,1,0.5037,1 L0.5938,1 Q0.5962,1,0.5962,0.9979 L0.5962,0.9203 Q0.5962,0.9182,0.5938,0.9182 Z M0.5913,0.9224 L0.5913,0.9958 L0.5061,0.9958 L0.5061,0.9224 L0.5913,0.9224 Z M0.5938,0.9182 L0.5037,0.9182 Q0.5012,0.9182,0.5012,0.9203 L0.5012,0.9979 Q0.5012,1,0.5037,1 L0.5938,1 Q0.5962,1,0.5962,0.9979 L0.5962,0.9203 Q0.5962,0.9182,0.5938,0.9182 Z M0.8626,0.9203 L0.7725,0.9203 L0.7725,0.9979 L0.8626,0.9979 L0.8626,0.9203 Z M0.8626,0.9203 L0.7725,0.9203 L0.7725,0.9979 L0.8626,0.9979 L0.8626,0.9203 Z M0.8626,0.9203 L0.7725,0.9203 L0.7725,0.9979 L0.8626,0.9979 L0.8626,0.9203 Z M1,0.9203 L0.9099,0.9203 L0.9099,0.9979 L1,0.9979 L1,0.9203 Z M1,0.9203 L0.9099,0.9203 L0.9099,0.9979 L1,0.9979 L1,0.9203 Z M1,0.9203 L0.9099,0.9203 L0.9099,0.9979 L1,0.9979 L1,0.9203 Z M0.0901,0.1158 L0.0901,0.1888 L0.0049,0.1888 L0.0049,0.1158 L0.0901,0.1158 Z M0.0925,0.1116 L0.0024,0.1116 Q0,0.1116,0,0.1137 L0,0.1909 Q0,0.193,0.0024,0.193 L0.0925,0.193 Q0.095,0.193,0.095,0.1909 L0.095,0.1137 Q0.095,0.1116,0.0925,0.1116 Z M0.2148,0.6086 L0.2148,0.682 L0.1296,0.682 L0.1296,0.6086 L0.2148,0.6086 Z M0.2172,0.6044 L0.1271,0.6044 Q0.1247,0.6044,0.1247,0.6065 L0.1247,0.6841 Q0.1247,0.6862,0.1271,0.6862 L0.2172,0.6862 Q0.2197,0.6862,0.2197,0.6841 L0.2197,0.6065 Q0.2197,0.6044,0.2172,0.6044 Z M0.34,0.1137 L0.2499,0.1137 L0.2499,0.1909 L0.34,0.1909 L0.34,0.1137 Z M0.3376,0.4102 L0.3376,0.4836 L0.2523,0.4836 L0.2523,0.4102 L0.3376,0.4102 Z M0.34,0.406 L0.2499,0.406 Q0.2474,0.406,0.2474,0.4081 L0.2474,0.4857 Q0.2474,0.4878,0.2499,0.4878 L0.34,0.4878 Q0.3424,0.4878,0.3424,0.4857 L0.3424,0.4081 Q0.3424,0.406,0.34,0.406 Z M0.3376,0.7131 L0.3376,0.7865 L0.2523,0.7865 L0.2523,0.7131 L0.3376,0.7131 Z M0.34,0.7089 L0.2499,0.7089 Q0.2474,0.7089,0.2474,0.711 L0.2474,0.7886 Q0.2474,0.7907,0.2499,0.7907 L0.34,0.7907 Q0.3424,0.7907,0.3424,0.7886 L0.3424,0.711 Q0.3424,0.7089,0.34,0.7089 Z M0.4593,0.2227 L0.4593,0.2836 L0.3887,0.2836 L0.3887,0.2227 L0.4593,0.2227 Z M0.4691,0.206 L0.379,0.206 Q0.3746,0.206,0.3719,0.2087 T0.3692,0.2143 L0.3692,0.2919 Q0.3692,0.2957,0.3724,0.298 T0.379,0.3003 L0.4691,0.3003 Q0.4735,0.3003,0.4761,0.2976 T0.4788,0.2919 L0.4788,0.2143 Q0.4788,0.211,0.4756,0.2085 T0.4691,0.206 Z M0.4593,0.3184 L0.4593,0.3792 L0.3887,0.3792 L0.3887,0.3184 L0.4593,0.3184 Z M0.4691,0.3016 L0.379,0.3016 Q0.3746,0.3016,0.3719,0.3043 T0.3692,0.31 L0.3692,0.3876 Q0.3692,0.3914,0.3724,0.3937 T0.379,0.396 L0.4691,0.396 Q0.4735,0.396,0.4761,0.3932 T0.4788,0.3876 L0.4788,0.31 Q0.4788,0.3062,0.4756,0.3039 T0.4691,0.3016 Z M0.4691,0.4081 L0.379,0.4081 L0.379,0.4857 L0.4691,0.4857 L0.4691,0.4081 Z M0.4691,0.5059 L0.379,0.5059 L0.379,0.5835 L0.4691,0.5835 L0.4691,0.5059 Z M0.4593,0.6149 L0.4593,0.6758 L0.3887,0.6758 L0.3887,0.6149 L0.4593,0.6149 Z M0.4691,0.5982 L0.379,0.5982 Q0.3746,0.5982,0.3719,0.6009 T0.3692,0.6065 L0.3692,0.6841 Q0.3692,0.6879,0.3724,0.6902 T0.379,0.6925 L0.4691,0.6925 Q0.4735,0.6925,0.4761,0.6898 T0.4788,0.6841 L0.4788,0.6065 Q0.4788,0.6028,0.4756,0.6005 T0.4691,0.5982 Z M0.5938,0.1137 L0.5037,0.1137 L0.5037,0.1909 L0.5938,0.1909 L0.5938,0.1137 Z M0.5938,0.2143 L0.5037,0.2143 L0.5037,0.2919 L0.5938,0.2919 L0.5938,0.2143 Z M0.5816,0.4186 L0.5816,0.4753 L0.5158,0.4753 L0.5158,0.4186 L0.5816,0.4186 Z M0.5938,0.3977 L0.5037,0.3977 Q0.4983,0.3977,0.4949,0.401 T0.4915,0.4081 L0.4915,0.4857 Q0.4915,0.4904,0.4954,0.4933 T0.5037,0.4962 L0.5938,0.4962 Q0.5991,0.4962,0.6025,0.4929 T0.6059,0.4857 L0.6059,0.4081 Q0.6059,0.4035,0.602,0.4006 T0.5938,0.3977 Z M0.5938,0.5059 L0.5037,0.5059 L0.5037,0.5835 L0.5938,0.5835 L0.5938,0.5059 Z M0.5913,0.7131 L0.5913,0.7865 L0.5061,0.7865 L0.5061,0.7131 L0.5913,0.7131 Z M0.5938,0.7089 L0.5037,0.7089 Q0.5012,0.7089,0.5012,0.711 L0.5012,0.7886 Q0.5012,0.7907,0.5037,0.7907 L0.5938,0.7907 Q0.5962,0.7907,0.5962,0.7886 L0.5962,0.711 Q0.5962,0.7089,0.5938,0.7089 Z M0.7311,0.1137 L0.641,0.1137 L0.641,0.1909 L0.7311,0.1909 L0.7311,0.1137 Z M0.7311,0.2143 L0.641,0.2143 L0.641,0.2919 L0.7311,0.2919 L0.7311,0.2143 Z M0.7311,0.8154 L0.641,0.8154 L0.641,0.8926 L0.7311,0.8926 L0.7311,0.8154 Z M0.7311,0.31 L0.641,0.31 L0.641,0.3876 L0.7311,0.3876 L0.7311,0.31 Z M0.7311,0.8154 L0.641,0.8154 L0.641,0.8926 L0.7311,0.8926 L0.7311,0.8154 Z M0.7311,0.4081 L0.641,0.4081 L0.641,0.4857 L0.7311,0.4857 L0.7311,0.4081 Z M0.7311,0.5059 L0.641,0.5059 L0.641,0.5835 L0.7311,0.5835 L0.7311,0.5059 Z M0.7311,0.711 L0.641,0.711 L0.641,0.7886 L0.7311,0.7886 L0.7311,0.711 Z M0.7311,0.8154 L0.641,0.8154 L0.641,0.8926 L0.7311,0.8926 L0.7311,0.8154 Z M0.8626,0.1137 L0.7725,0.1137 L0.7725,0.1909 L0.8626,0.1909 L0.8626,0.1137 Z M0.8626,0.2143 L0.7725,0.2143 L0.7725,0.2919 L0.8626,0.2919 L0.8626,0.2143 Z M0.8626,0.8154 L0.7725,0.8154 L0.7725,0.8926 L0.8626,0.8926 L0.8626,0.8154 Z M0.8626,0.31 L0.7725,0.31 L0.7725,0.3876 L0.8626,0.3876 L0.8626,0.31 Z M0.8626,0.8154 L0.7725,0.8154 L0.7725,0.8926 L0.8626,0.8926 L0.8626,0.8154 Z M0.8626,0.4081 L0.7725,0.4081 L0.7725,0.4857 L0.8626,0.4857 L0.8626,0.4081 Z M0.8626,0.5059 L0.7725,0.5059 L0.7725,0.5835 L0.8626,0.5835 L0.8626,0.5059 Z M0.8626,0.6065 L0.7725,0.6065 L0.7725,0.6841 L0.8626,0.6841 L0.8626,0.6065 Z M0.8626,0.711 L0.7725,0.711 L0.7725,0.7886 L0.8626,0.7886 L0.8626,0.711 Z M0.8626,0.8154 L0.7725,0.8154 L0.7725,0.8926 L0.8626,0.8926 L0.8626,0.8154 Z M1,0.1137 L0.9099,0.1137 L0.9099,0.1909 L1,0.1909 L1,0.1137 Z M1,0.2143 L0.9099,0.2143 L0.9099,0.2919 L1,0.2919 L1,0.2143 Z M1,0.8154 L0.9099,0.8154 L0.9099,0.8926 L1,0.8926 L1,0.8154 Z M1,0.31 L0.9099,0.31 L0.9099,0.3876 L1,0.3876 L1,0.31 Z M1,0.8154 L0.9099,0.8154 L0.9099,0.8926 L1,0.8926 L1,0.8154 Z M1,0.4081 L0.9099,0.4081 L0.9099,0.4857 L1,0.4857 L1,0.4081 Z M1,0.5059 L0.9099,0.5059 L0.9099,0.5835 L1,0.5835 L1,0.5059 Z M1,0.6065 L0.9099,0.6065 L0.9099,0.6841 L1,0.6841 L1,0.6065 Z M1,0.711 L0.9099,0.711 L0.9099,0.7886 L1,0.7886 L1,0.711 Z M1,0.8154 L0.9099,0.8154 L0.9099,0.8926 L1,0.8926 L1,0.8154 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C6}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.6529,0.018 L0.6529,0.112 L0.7724,0.112 L0.7724,0.018 L0.6529,0.018 Z M0.6411,0 L0.7837,0 Q0.7873,0,0.7902,0.0015 T0.7943,0.005 T0.7956,0.0092 L0.7956,0.1208 Q0.7956,0.125,0.7917,0.1275 T0.7837,0.13 L0.6411,0.13 Q0.6359,0.13,0.6326,0.1271 T0.6292,0.1208 L0.6292,0.0092 Q0.6292,0.005,0.6331,0.0025 T0.6411,0 Z M0.6529,0.018 L0.6529,0.112 L0.7724,0.112 L0.7724,0.018 L0.6529,0.018 Z M0.6411,0 L0.7837,0 Q0.7873,0,0.7902,0.0015 T0.7943,0.005 T0.7956,0.0092 L0.7956,0.1208 Q0.7956,0.125,0.7917,0.1275 T0.7837,0.13 L0.6411,0.13 Q0.6359,0.13,0.6326,0.1271 T0.6292,0.1208 L0.6292,0.0092 Q0.6292,0.005,0.6331,0.0025 T0.6411,0 Z M0.6529,0.018 L0.6529,0.112 L0.7724,0.112 L0.7724,0.018 L0.6529,0.018 Z M0.6411,0 L0.7837,0 Q0.7873,0,0.7902,0.0015 T0.7943,0.005 T0.7956,0.0092 L0.7956,0.1208 Q0.7956,0.125,0.7917,0.1275 T0.7837,0.13 L0.6411,0.13 Q0.6359,0.13,0.6326,0.1271 T0.6292,0.1208 L0.6292,0.0092 Q0.6292,0.005,0.6331,0.0025 T0.6411,0 Z M0.4325,0.0143 L0.4325,0.1158 L0.5628,0.1158 L0.5628,0.0143 L0.4325,0.0143 Z M0.4264,0.0042 L0.5695,0.0042 Q0.5721,0.0042,0.5739,0.0057 T0.5757,0.0092 L0.5757,0.1208 Q0.5757,0.1221,0.5752,0.1231 T0.5736,0.1248 T0.5716,0.1256 T0.5695,0.1258 L0.4264,0.1258 Q0.4238,0.1258,0.422,0.1244 T0.4202,0.1208 L0.4202,0.0092 Q0.4202,0.008,0.4207,0.0069 T0.4222,0.0052 T0.4243,0.0044 T0.4264,0.0042 Z M0.4325,0.0143 L0.4325,0.1158 L0.5628,0.1158 L0.5628,0.0143 L0.4325,0.0143 Z M0.4264,0.0042 L0.5695,0.0042 Q0.5721,0.0042,0.5739,0.0057 T0.5757,0.0092 L0.5757,0.1208 Q0.5757,0.1221,0.5752,0.1231 T0.5736,0.1248 T0.5716,0.1256 T0.5695,0.1258 L0.4264,0.1258 Q0.4238,0.1258,0.422,0.1244 T0.4202,0.1208 L0.4202,0.0092 Q0.4202,0.008,0.4207,0.0069 T0.4222,0.0052 T0.4243,0.0044 T0.4264,0.0042 Z M0.4325,0.0143 L0.4325,0.1158 L0.5628,0.1158 L0.5628,0.0143 L0.4325,0.0143 Z M0.4264,0.0042 L0.5695,0.0042 Q0.5721,0.0042,0.5739,0.0057 T0.5757,0.0092 L0.5757,0.1208 Q0.5757,0.1221,0.5752,0.1231 T0.5736,0.1248 T0.5716,0.1256 T0.5695,0.1258 L0.4264,0.1258 Q0.4238,0.1258,0.422,0.1244 T0.4202,0.1208 L0.4202,0.0092 Q0.4202,0.008,0.4207,0.0069 T0.4222,0.0052 T0.4243,0.0044 T0.4264,0.0042 Z M0.2178,0.0092 L0.3605,0.0092 L0.3605,0.1208 L0.2178,0.1208 L0.2178,0.0092 Z M0.2178,0.0092 L0.3605,0.0092 L0.3605,0.1208 L0.2178,0.1208 L0.2178,0.0092 Z M0.2178,0.0092 L0.3605,0.0092 L0.3605,0.1208 L0.2178,0.1208 L0.2178,0.0092 Z M0,0.0092 L0.1432,0.0092 L0.1432,0.1208 L0,0.1208 L0,0.0092 Z M0,0.0092 L0.1432,0.0092 L0.1432,0.1208 L0,0.1208 L0,0.0092 Z M0,0.0092 L0.1432,0.0092 L0.1432,0.1208 L0,0.1208 L0,0.0092 Z M0.8574,0.3217 L0.8574,0.4098 L0.9691,0.4098 L0.9691,0.3217 L0.8574,0.3217 Z M0.8419,0.2978 L0.9846,0.2978 Q0.9892,0.2978,0.9928,0.2997 T0.9982,0.3043 T1,0.31 L1,0.4216 Q1,0.427,0.9951,0.4304 T0.9846,0.4337 L0.8419,0.4337 Q0.8352,0.4337,0.8308,0.4299 T0.8265,0.4216 L0.8265,0.31 Q0.8265,0.3062,0.829,0.3035 T0.835,0.2993 T0.8419,0.2978 Z M0.8574,0.888 L0.8574,0.9757 L0.9691,0.9757 L0.9691,0.888 L0.8574,0.888 Z M0.8419,0.8637 L0.9846,0.8637 Q0.9892,0.8637,0.9928,0.8658 T0.9982,0.8706 T1,0.8758 L1,0.9878 Q1,0.9929,0.9951,0.9964 T0.9846,1 L0.8419,1 Q0.8352,1,0.8308,0.996 T0.8265,0.9878 L0.8265,0.8758 Q0.8265,0.8708,0.8314,0.8672 T0.8419,0.8637 Z M0.6509,0.169 L0.6509,0.2706 L0.7806,0.2706 L0.7806,0.169 L0.6509,0.169 Z M0.6442,0.159 L0.7868,0.159 Q0.7899,0.159,0.7917,0.1604 T0.7935,0.164 L0.7935,0.2756 Q0.7935,0.2781,0.7915,0.2796 T0.7868,0.281 L0.6442,0.281 Q0.6416,0.281,0.6395,0.2794 T0.6375,0.2756 L0.6375,0.164 Q0.6375,0.1619,0.6398,0.1604 T0.6442,0.159 Z M0.6632,0.6044 L0.6632,0.6858 L0.7678,0.6858 L0.7678,0.6044 L0.6632,0.6044 Z M0.6442,0.5742 L0.7868,0.5742 Q0.7951,0.5742,0.8007,0.5791 T0.8064,0.5893 L0.8064,0.7013 Q0.8064,0.7076,0.8002,0.712 T0.7868,0.7164 L0.6442,0.7164 Q0.6359,0.7164,0.6305,0.7114 T0.6251,0.7013 L0.6251,0.5893 Q0.6251,0.5847,0.6282,0.5812 T0.6357,0.5759 T0.6442,0.5742 Z M0.4264,0.164 L0.5695,0.164 L0.5695,0.2756 L0.4264,0.2756 L0.4264,0.164 Z M0.4325,0.315 L0.4325,0.4165 L0.5628,0.4165 L0.5628,0.315 L0.4325,0.315 Z M0.4264,0.3049 L0.5695,0.3049 Q0.5721,0.3049,0.5739,0.3064 T0.5757,0.31 L0.5757,0.4216 Q0.5757,0.4237,0.5736,0.4251 T0.5695,0.4266 L0.4264,0.4266 Q0.4238,0.4266,0.422,0.4251 T0.4202,0.4216 L0.4202,0.31 Q0.4202,0.3087,0.4207,0.3077 T0.4222,0.306 T0.4243,0.3052 T0.4264,0.3049 Z M0.4264,0.4476 L0.5695,0.4476 L0.5695,0.5596 L0.4264,0.5596 L0.4264,0.4476 Z M0.4392,0.7408 L0.4392,0.8326 L0.5561,0.8326 L0.5561,0.7408 L0.4392,0.7408 Z M0.4264,0.7206 L0.5695,0.7206 Q0.5747,0.7206,0.5783,0.724 T0.5819,0.7307 L0.5819,0.8427 Q0.5819,0.8469,0.5778,0.8498 T0.5695,0.8528 L0.4264,0.8528 Q0.4207,0.8528,0.4171,0.8496 T0.4135,0.8427 L0.4135,0.7307 Q0.4135,0.7265,0.4176,0.7236 T0.4264,0.7206 Z M0.2178,0.164 L0.3605,0.164 L0.3605,0.2756 L0.2178,0.2756 L0.2178,0.164 Z M0.2178,0.31 L0.3605,0.31 L0.3605,0.4216 L0.2178,0.4216 L0.2178,0.31 Z M0.2178,0.5893 L0.3605,0.5893 L0.3605,0.7013 L0.2178,0.7013 L0.2178,0.5893 Z M0.2178,0.7307 L0.3605,0.7307 L0.3605,0.8427 L0.2178,0.8427 L0.2178,0.7307 Z M0.2178,0.8758 L0.3605,0.8758 L0.3605,0.9878 L0.2178,0.9878 L0.2178,0.8758 Z M0,0.164 L0.1432,0.164 L0.1432,0.2756 L0,0.2756 L0,0.164 Z M0,0.31 L0.1432,0.31 L0.1432,0.4216 L0,0.4216 L0,0.31 Z M0,0.4476 L0.1432,0.4476 L0.1432,0.5596 L0,0.5596 L0,0.4476 Z M0,0.5893 L0.1432,0.5893 L0.1432,0.7013 L0,0.7013 L0,0.5893 Z M0,0.7307 L0.1432,0.7307 L0.1432,0.8427 L0,0.8427 L0,0.7307 Z M0,0.8758 L0.1432,0.8758 L0.1432,0.9878 L0,0.9878 L0,0.8758 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C7}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.3476,0.018 L0.3476,0.112 L0.2276,0.112 L0.2276,0.018 L0.3476,0.018 Z M0.3594,0 L0.2163,0 Q0.2132,0,0.2104,0.0015 T0.2062,0.005 T0.2049,0.0092 L0.2049,0.1208 Q0.2049,0.1237,0.2067,0.1258 T0.2111,0.129 T0.2163,0.13 L0.3594,0.13 Q0.3641,0.13,0.3674,0.1271 T0.3708,0.1208 L0.3708,0.0092 Q0.3708,0.005,0.3669,0.0025 T0.3594,0 Z M0.3476,0.018 L0.3476,0.112 L0.2276,0.112 L0.2276,0.018 L0.3476,0.018 Z M0.3594,0 L0.2163,0 Q0.2132,0,0.2104,0.0015 T0.2062,0.005 T0.2049,0.0092 L0.2049,0.1208 Q0.2049,0.1237,0.2067,0.1258 T0.2111,0.129 T0.2163,0.13 L0.3594,0.13 Q0.3641,0.13,0.3674,0.1271 T0.3708,0.1208 L0.3708,0.0092 Q0.3708,0.005,0.3669,0.0025 T0.3594,0 Z M0.3476,0.018 L0.3476,0.112 L0.2276,0.112 L0.2276,0.018 L0.3476,0.018 Z M0.3594,0 L0.2163,0 Q0.2132,0,0.2104,0.0015 T0.2062,0.005 T0.2049,0.0092 L0.2049,0.1208 Q0.2049,0.1237,0.2067,0.1258 T0.2111,0.129 T0.2163,0.13 L0.3594,0.13 Q0.3641,0.13,0.3674,0.1271 T0.3708,0.1208 L0.3708,0.0092 Q0.3708,0.005,0.3669,0.0025 T0.3594,0 Z M0.5675,0.0143 L0.5675,0.1158 L0.4377,0.1158 L0.4377,0.0143 L0.5675,0.0143 Z M0.5736,0.0042 L0.431,0.0042 Q0.4284,0.0042,0.4264,0.0057 T0.4243,0.0092 L0.4243,0.1208 Q0.4243,0.1221,0.4251,0.1231 T0.4269,0.1248 T0.4289,0.1256 T0.431,0.1258 L0.5736,0.1258 Q0.5767,0.1258,0.5785,0.1244 T0.5803,0.1208 L0.5803,0.0092 Q0.5803,0.008,0.5798,0.0069 T0.5783,0.0052 T0.5762,0.0044 T0.5736,0.0042 Z M0.5675,0.0143 L0.5675,0.1158 L0.4377,0.1158 L0.4377,0.0143 L0.5675,0.0143 Z M0.5736,0.0042 L0.431,0.0042 Q0.4284,0.0042,0.4264,0.0057 T0.4243,0.0092 L0.4243,0.1208 Q0.4243,0.1221,0.4251,0.1231 T0.4269,0.1248 T0.4289,0.1256 T0.431,0.1258 L0.5736,0.1258 Q0.5767,0.1258,0.5785,0.1244 T0.5803,0.1208 L0.5803,0.0092 Q0.5803,0.008,0.5798,0.0069 T0.5783,0.0052 T0.5762,0.0044 T0.5736,0.0042 Z M0.5675,0.0143 L0.5675,0.1158 L0.4377,0.1158 L0.4377,0.0143 L0.5675,0.0143 Z M0.5736,0.0042 L0.431,0.0042 Q0.4284,0.0042,0.4264,0.0057 T0.4243,0.0092 L0.4243,0.1208 Q0.4243,0.1221,0.4251,0.1231 T0.4269,0.1248 T0.4289,0.1256 T0.431,0.1258 L0.5736,0.1258 Q0.5767,0.1258,0.5785,0.1244 T0.5803,0.1208 L0.5803,0.0092 Q0.5803,0.008,0.5798,0.0069 T0.5783,0.0052 T0.5762,0.0044 T0.5736,0.0042 Z M0.7827,0.0092 L0.6395,0.0092 L0.6395,0.1208 L0.7827,0.1208 L0.7827,0.0092 Z M0.7827,0.0092 L0.6395,0.0092 L0.6395,0.1208 L0.7827,0.1208 L0.7827,0.0092 Z M0.7827,0.0092 L0.6395,0.0092 L0.6395,0.1208 L0.7827,0.1208 L0.7827,0.0092 Z M1,0.0092 L0.8574,0.0092 L0.8574,0.1208 L1,0.1208 L1,0.0092 Z M1,0.0092 L0.8574,0.0092 L0.8574,0.1208 L1,0.1208 L1,0.0092 Z M1,0.0092 L0.8574,0.0092 L0.8574,0.1208 L1,0.1208 L1,0.0092 Z M0.1432,0.3217 L0.1432,0.4098 L0.0309,0.4098 L0.0309,0.3217 L0.1432,0.3217 Z M0.1586,0.2978 L0.0154,0.2978 Q0.0088,0.2978,0.0044,0.3016 T0,0.31 L0,0.4216 Q0,0.427,0.0049,0.4304 T0.0154,0.4337 L0.1586,0.4337 Q0.1648,0.4337,0.1694,0.4299 T0.174,0.4216 L0.174,0.31 Q0.174,0.3062,0.1715,0.3035 T0.1653,0.2993 T0.1586,0.2978 Z M0.1432,0.888 L0.1432,0.9757 L0.0309,0.9757 L0.0309,0.888 L0.1432,0.888 Z M0.1586,0.8637 L0.0154,0.8637 Q0.0108,0.8637,0.0072,0.8658 T0.0018,0.8706 T0,0.8758 L0,0.9878 Q0,0.9929,0.0049,0.9964 T0.0154,1 L0.1586,1 Q0.1648,1,0.1694,0.996 T0.174,0.9878 L0.174,0.8758 Q0.174,0.8725,0.1715,0.8695 T0.1653,0.8651 T0.1586,0.8637 Z M0.3496,0.169 L0.3496,0.2706 L0.2194,0.2706 L0.2194,0.169 L0.3496,0.169 Z M0.3563,0.159 L0.2132,0.159 Q0.2106,0.159,0.2088,0.1604 T0.207,0.164 L0.207,0.2756 Q0.207,0.2781,0.2091,0.2796 T0.2132,0.281 L0.3563,0.281 Q0.3589,0.281,0.3607,0.2794 T0.3625,0.2756 L0.3625,0.164 Q0.3625,0.1619,0.3605,0.1604 T0.3563,0.159 Z M0.3368,0.6044 L0.3368,0.6858 L0.2327,0.6858 L0.2327,0.6044 L0.3368,0.6044 Z M0.3563,0.5742 L0.2132,0.5742 Q0.2049,0.5742,0.1993,0.5791 T0.1936,0.5893 L0.1936,0.7013 Q0.1936,0.7076,0.2001,0.712 T0.2132,0.7164 L0.3563,0.7164 Q0.3641,0.7164,0.3697,0.7114 T0.3754,0.7013 L0.3754,0.5893 Q0.3754,0.5847,0.3723,0.5812 T0.3648,0.5759 T0.3563,0.5742 Z M0.5736,0.164 L0.431,0.164 L0.431,0.2756 L0.5736,0.2756 L0.5736,0.164 Z M0.5675,0.315 L0.5675,0.4165 L0.4377,0.4165 L0.4377,0.315 L0.5675,0.315 Z M0.5736,0.3049 L0.431,0.3049 Q0.4284,0.3049,0.4264,0.3064 T0.4243,0.31 L0.4243,0.4216 Q0.4243,0.4237,0.4266,0.4251 T0.431,0.4266 L0.5736,0.4266 Q0.5767,0.4266,0.5785,0.4251 T0.5803,0.4216 L0.5803,0.31 Q0.5803,0.3087,0.5798,0.3077 T0.5783,0.306 T0.5762,0.3052 T0.5736,0.3049 Z M0.5736,0.4476 L0.431,0.4476 L0.431,0.5596 L0.5736,0.5596 L0.5736,0.4476 Z M0.5613,0.7408 L0.5613,0.8326 L0.4439,0.8326 L0.4439,0.7408 L0.5613,0.7408 Z M0.5736,0.7206 L0.431,0.7206 Q0.4253,0.7206,0.4217,0.724 T0.4181,0.7307 L0.4181,0.8427 Q0.4181,0.8469,0.4222,0.8498 T0.431,0.8528 L0.5736,0.8528 Q0.5778,0.8528,0.5808,0.8511 T0.5855,0.8471 T0.587,0.8427 L0.587,0.7307 Q0.587,0.7265,0.5826,0.7236 T0.5736,0.7206 Z M0.7827,0.164 L0.6395,0.164 L0.6395,0.2756 L0.7827,0.2756 L0.7827,0.164 Z M0.7827,0.31 L0.6395,0.31 L0.6395,0.4216 L0.7827,0.4216 L0.7827,0.31 Z M0.7827,0.5893 L0.6395,0.5893 L0.6395,0.7013 L0.7827,0.7013 L0.7827,0.5893 Z M0.7827,0.7307 L0.6395,0.7307 L0.6395,0.8427 L0.7827,0.8427 L0.7827,0.7307 Z M0.7827,0.8758 L0.6395,0.8758 L0.6395,0.9878 L0.7827,0.9878 L0.7827,0.8758 Z M1,0.164 L0.8574,0.164 L0.8574,0.2756 L1,0.2756 L1,0.164 Z M1,0.31 L0.8574,0.31 L0.8574,0.4216 L1,0.4216 L1,0.31 Z M1,0.4476 L0.8574,0.4476 L0.8574,0.5596 L1,0.5596 L1,0.4476 Z M1,0.5893 L0.8574,0.5893 L0.8574,0.7013 L1,0.7013 L1,0.5893 Z M1,0.7307 L0.8574,0.7307 L0.8574,0.8427 L1,0.8427 L1,0.7307 Z M1,0.8758 L0.8574,0.8758 L0.8574,0.9878 L1,0.9878 L1,0.8758 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0C8}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD+BQD/Af8FDP8P/gUR/hb9Bhz7BR37H/sBIPsBIfsFJ/sq+gUr+iz6Bi75Bi/5BjD4ATH4BjP4BjT4ATX4BTj4OfgGPPcFPfdA9wZF9gFI9gVK9kr0BUrzSvMGSPIFRvJE8gVD8kLyBkDyBT7yPfIFPfE78AY37wU27zPuBi/tBS7tLe0GLO0GK+0GK+wGKuwGKuwFKesl6wEk6wEk6wEj6wUf6h/pAR/pBR/pI+gGK+cFLucw5wYz5gY15QU95UDkBUHkQuMGReIFReJG4gVH40rjBU7jT+EBT+AFT+BO3wZO3gZN3QVO3VPdBVXdXNwFXdxj3AZs2wVs223bAW/bAXDbBXXbd9sFedt82gaA2gWA2oLaBobaBojYBYjXiNcGh9YGh9YGhtYBhdUGhNUGg9UGgdUGgNUFftR81AV71HrUBnnUBXjUd9QFctJw0gVv0m/SBWzTatMFaNNo0wVl0WDRBV7RXtEGXNIFXNJb0QVa0FfQBlHQBk3QAUvPBknOBkfOBkPOBUPOQs4FPc46zgU1zjTNBTLNMc0GMMwGL8wBL8wFL8wvywYvywYwywYwywYwywYxywYyywYzygY0ygU2yjvKBkHKBUXJR8gFSMhMxwZQxgVRxlTFBljFAVjFBVjFWcUGW8UGXcYFXsZfxQZhxQZkxAZmxAVmxGjEBmvEAW7DBW/DcMIGcsAFcr9vvwVuv2u+Bme+BmS9AWK9BWG9YL0GXb0GXL0FW71bvQZavQZZvQZYvQZXvQZWvQZVvAFUvAVUvVO9BVK9TrwGSLwFRrxBuwVAuz+6Bj26Bju5Bji4BjS3BjO2BTO2M7YFNbQ6sgZDsAVGsEivBkutBU2tVK0GW6wFW6xiqwZwqwZ5qgWAqIOoAYSoBYWoh6gGiakFiqmMqAWXppmmBZumnKYGnaUFnqWgpgakpgGlpgWnpqqmBq+mBrWlBrikBbmku6QFvKS+pAbBpAXCpMOkBsOkBcSkxaQGx6UFyaXLpAXSo96iBeai6KIB6qIB66IF7aLvoQbzoQXzofWhBvehBf6h/58F/57/ngX/m/mbBfeb9JsF85vwmwbrmwXmm+WbBeSb4poG35oG3JoG2ZkB2JkF1prTmgbPmwXOm86aBcaZw5kFwpm+mQa5mQW4mbaaBrOaBbKaspoFq5eklwWkl6OXBqKXBaCXn5YBnpUGnJUGmZUGlZQFkpSOlAaJkwGIkwWHk4WUBoKUBYCUf5MFfpJ6kgV4knaSBnOTBXGTcJIFb5JukgZskgZqkQZnkQVmkWWRBmSRBmSRBmKRBWKRYZAGYJAGX5AGXo8FXY9ckAZZkAZXkAZVjwVUj1SQAVCQBUOQQI8FP48+jwU9jzyPBjqPBTiPOI8FN443jgU3jTyNBUmMTYoFTopQigZUiQZZiAZchwVdh2CGBmWFBWaFZ4UGaIUFaoVrhQZuhAZwhAVxhHKEAXSEBnaEBniDBnmCBXmCeIIFeIB2fwZvfwVtf2t+Bmd9BmV9BWR9Y30FYn1gfQZdfQVcfVt9BVF8UHwFR3pFegVFekR6BkN6BUB6OnkFOXk5eQU5eDt4BT14QXgBRHgBR3gFS3hMdwVQdlZ2BVd2WHUGW3UGXnQGX3MFX3NecwVdcllxBlJwAVFwAU9wBUtwSW8FR29FbwFDbwFBbwU/bz1vBTpuOG4GNW0GNGwGNGoGMmcFMWYwZQYuYwYuYgUuYi9fBTBeMl0GNVsGOVkGO1gFPFg9WAZAVwZDVwZGVgZLVQZSVQVSVVNVBlVVBldVBVlVWlUFXFNeUwVgU2JUBWNUZVQFZ1RpVAZtUwZxUgZzUgV1UXtQBoJQBoRQBodPBopPBoxOBo1NBY1MjUwFi0qJSgaESQWCSYFJBn9JBX1JekgFdUZtRgVqRmlHBWlHaUcFaEdnRgZlRQVeRVxEBVtDWkMGV0QGVkQGVUQFVEJPQQZJQAFIQAFIQAVHQEVABkI/Bj8/BS48LDwFKjwpPAYmOwYlOgUlOSg3BSs2LzUGODUGPDQFPDRANAZHNAZNMwVPM1MyBlgxBVkxWjEFXTJjMgVnMmgxBWgxaTEGazIGbTIGbzIFcTF7MAV9MH8vBoIuAYIuBYUviy8FlC+ZLQWbLZ8tBZ8toS0Goy0FpC2lLQWlLagsBq0sBrAqBbEqsSkFsSewJwatJgWtJqwmBasmqiYFqSamJQWhJJwkBZokmSMGliMGlCMGkyQFkiSQIwWJIIIgBXwgdyAFdiB0HwZvHgFuHgVsHmoeBmgfBWcfZh4FZR1lHQZkHAZjHAZiHAVhHF4cBVscWB0GVB4FUx5SHQVRHE4cBkcbBkEaBUAaPxoFPho8GwY5GwU5GzgbBTQaMBoFLhooGQYgFwYeFwYbFgUbFhwVBR4VIBUFIRUjFQYlFQUmFScVBi8VBjgUBj4TBkQSBUUSRhIGSBMGSxIGTRIGThEGTxEGTxAFTxBQEAFREAFREAVYEFgOBlIMAVEMBVEMUQwFTwtICgVGCUQJBkEIBT8HPgcGPQgGOwgFOwg6CAU4BzMHBi0GBSwGKgYGJwUGIgQGHQIFGQERAQYIAQUEAAEABQABAAEIAAL+AQEBBQUBBwIFCQMRAgYcAwUfBCIFBiYGBikHBisHBi0HBS4IMwgGOgkFOwk8CQU8CT0JBj8JBT8JQAkFQglECgZICwVODFANBVENUw0BVA0BVA0FVw1XDgVXD1UPBlIPBk8PBk0QBksRBUoRSBEFSBFGEQZEEQVCET4SBjgTBTYTLxQGJhQBJhQGJBQGIRQFHhQcFAUaFRoWBRoWGxcGHRgGHxgGIBgGKBoGMBsFMxs4HAU5HDocBTocPBwGPxsBQRsFRBtKHAZSHgVTH1QfBVUfWB4GXh0FXx1gHQZiHQZjHQVjHWMdBmQeBmUfBWcgaCAFaCBqHwZuHwFvHwVxH3MgBnchBXwigiIGjyQFkSWTJQWUJZUkBpYkBZckmCQGmSQGnCUFoSWlJgWoJ6onBasnrScFrSetJwWuJ68nBq8pBa8pryoFriqtKwaoKwalKwajLAWjLKErBp8rBZsrmCwFlC2LLQWFLYItBYItgi0FgC1+LgZ7LwF6LwZ3LwF0LwZxMAZvMQVuMW4xBW0xazAGaTAFaDBnMAVnMWMxBV0xWzAFWi9YLwVWL1IxBk0yBUwyRzIGQDMGOzQBOzQBOjQBOjQBOTQFNDQvNAYnNgUkOCQ6BSQ7JzwGLD0FLj0/QAVAQEJABkVBBkhBAUlBBUlBSUEFS0FPQgZURAVVRVZFBVdFWEUGWkUFW0VbRQVeRmVGBWZHZkcBZ0gGaEgFaUhqSAVrSGxIBXVIeUkFfEp/SgWASoFKBoRKBYdKiUsGi00Bi00Fi02KTgaGTgaCTwWCT3tPBnNRBWhTZVMFY1NjUwVgUl5SBVxSWVQFWFRXVAVXVFZUBlNUBlFUBVBUS1QGRVUFRFZCVgY+VwY7VwE4WAY0WgYxXAYuXwUsYSxiBSxjLWMGL2UGMWgGMmsGNG0GNm4GPXAFP3BBcAFDcAFFcAVHcEhwBUtxT3EBUXEBUnEFVHFYcgZecwVcdFZ1BVB1THYFS3dIdwFFdwFCdwU9dzt3BTh4OHkFOHk4eQY5egE6egE6egVAe0N7BUR7RXsFRXtFewVHe1B9BVF9Un0GVn4GWn4GXX4FX35hfgZjfgVkfmV+Bmd+Bmt/Bm+ABXKAdIAGdoEGd4IBd4IFd4J3ggZ2ggF0gwZygwZwgwVvg22DBmiEBWiEZ4QBZYQFY4RfhQZchgVbh1WIBk2JBUmLPIwFNYw1jgU1jzeQBTiQOpAFO5A9kAY/kAFAkAVDkVCRBVORVJEBVZEFVZFXkQZZkQVakVyRBl6QBmCRBmKSBmSSBmWSBmeSBmqTBm2TBm+TBXGUdJQFdZR3lAZ7lAV+lH6UBYCVgpUBg5UGhJUBhZUBhpUBhpUGh5QGiJQBiZQFipSOlQaVlgWXlpiWBpmWBpuWBpyWBpyWBp2WAZ6XBp+XBaCYopgBpJgBpZgFq5ixmwWym7SbBbWbt5sGuZoFupq+mgbDmgXGms6cBc6cz5wF0ZzUmwbYmwHZmwXam9ybBuGbBuWcBeac65wB8JwB9ZwB+ZwF/pz+nQX+nf6fBf2g9KAB9KAB86AF8qDvoAbroQHqoQXpoeihBeah3qEF0qLLowXJo8ijBsWjBsSjBcOjwqMFwqPCowXBo7+jBryjBbmjuKQFt6SzpAarpQalpQWkpaSlBaKloKUGnaQFnKSbpQaZpQWXpYynBYqoiagFiKiHpwaEpwGDpwV/p3mpBXepcKkGYqoGW6sFW6tUqwZLrAVKrEitBkauBkOvBUGvPbAGN7IGMrUFMrYytgUytzO4Bji6Bjq6BTu7PLsGPrwGQLwFQLxBvAZDvQZEvQZGvQZIvQVKvU69BlO+AVS+AVW+BVW+XL4FXb9evwZgvgZivgVjvmS+BWa+ab8Gb8AGcMEFcMJtwgVtw2vDBmjDBmbDBWXDZMMGYcMGX8QFXsRdxAZaxAZYwwFYwwVXw1TEBlDFBU/FS8YGRscFRMhByQVByTvJBjTJBTPJM8kGMskGMcoGMMoGMMoGL8oBL8oGLssBLssGLssFLswuzAUuzS/NBjHOBjPOBTXPOs8FPM9CzwFDzwVFz0fPBknPBkvQBk3RBU7RVNEGWtIFW9Nc0wVd017TBmDSBWXSZ9MFaNRq1AVs1G/UAXDUBXLUd9UFeNZ51gV51nvWBn3VBX7VgNYFgdaD1gWF1obXBofYBYfYhdgGgtkGf9kFf9l82QZ32gV12nDaAW/aAW7aAWvaBWjaY9sGXNsFVdxT3AFS3AFS3AVM3EzdBUzeTd8GTuEFTuFN4QVN4UnhBUfhRuEFReFF4QZD4QZC4gZB4gY/4wU95DTkBTPkMeUGK+YFJ+Yi5wYd6QEd6gUd6h7qBh7rBh/rBh/sBiDsASHsBiLsASPsBSPsJewGJ+wGKe0FKe0q7gYs7gYu7gUw7jLvBjfwBTnxOvEGPfMFPvNA8wVB80LzBkXzBUbzSPMGSfQGSPUFPvU79gU59zn3ATX3ATT3BTP3MvcGMPcGLvgGLPgGKvkFJ/oh+gEg+gUd+hv6BRr7FfwGD/0FDP4C/ggAAf4BAQEFBAEHAgUJAhECBhwDBiIEBicGBSgGKgYGLQcFLgczBwY6CAU7CTsJBj0IBj8IBkEIBUIIQwkGRAkGRQoGSAoFTwtQDAVQDVINBlYNBlcOBlYPBlIQBk8QBU8QThEGSxIFShJIEgVIEkYSBkQSBUISPhIGOBMFNhQvFAYmFQUmFSUVBSUVIxQGIRQFHhQcFQUaFRoWBRoWHRcGIBgFIRgoGQYwGwUzGzgcBTkcORwFOhw8GwY/GwVAG0EbBUUbSxwGUh4FUx5UHgVVHlgeBl4dBWIcYxwGZB0GZB0GZh4FZx9oHwVoH2ofBm4eAW8eBXEech8GdCAGdyAFfCGCIQWJIZAjBZEkkyQFkySUJAaWIwWXI5kkBpwkBaEkpiYFqSeqJwWrJ60mBa0mrSYFriavJwawKQWwKa8qBa8rrSsGqysGpywGpSwFpCyjLAWjLKEsBp8sBZssmS0FlC6LLgWFLoIuAYIuBYAufi4Gey8FcTBvMQVuMm0yBmsxBmkwBmgxBWcyYzIFXTJaMAVaMFgwBVcwVTEGUDIGTTMFTDNJMwZDMwY+NAY8NAU7NDg0Bi81Bic3BSQ4JDoFJDsnPAYsPQUuPT8/BUA/QT8GREAGRkAGSEAFSEBJQAFJQAVLQE9CBlREBVVFVkUFVkVYRAZaRAZbRAVeRWVGBWZGZ0cGaEcFaUdpRwVqR21HBXVHekkFfEp/SgV/SoFKBoRKBYZKh0oGikoGjEwBjE0FjE2LTgaJTgaHTwaETwaCTwWBT35QAXdQBnNRBXJRcVIGblIGa1MGaFQGZVQFY1RiUwVgU15TBVxTWlQFWVVXVQVXVVVUBlNUBlFUBVBVS1UGRVYFRVZDVgZAVwY9VwY7WAU7WDhZBjVaBjFcBi5fBS1hLWIFLWMtYwYvZQYxaAYzawY0bQY3bgY9bwU/b0FvBUJvQ28GRW8FR29JcAVLcE9wBU9wUXAGUnAFVHBYcQZecwVec15zBV51VnUFUHZMdwVLd0d3BUZ3RXcGQncFPXc7eAU4eDh5BTh5OHkGOXkBOXoGOnoBOnoFQHpDegVEekV6BUV6RXoFR3pQfAVRfVJ9BlZ9Blp9Bl19BV59YH0GY30GZX0FZX1mfgFofgZqfwZsfwZvfwVyf3SABneABniCBXiCeIIFeIJ4gwZ2gwZ0gwZygwFwgwVvg22EBmiFAWeFBWaEZYQFY4RihQZehgZchwVbh1WIBk2KBUmLPIwFNo02jgU2jjePBTiQOpAFO5A8kAY+kAU/kECQBUOQUJAFU5BUkAFVkAVVkFeQBlmQBVqQXJAFXZBekAVfkGCQBmKRBWOSZJIGZZIGZ5IFaJJqkgZtkgZwkwVxk3OTBXSTd5MGepMFfpN/lAWAlIKUBYOUhZQGiJQBiZQFipSOlAaVlQGXlQGZlQaalQablQaclQaclgadlgaelgaelgGflwWgl6KXAaOXAaSXBauXsZoFspuzmwW0m7aaBrmaBbqavpoGw5oFxprOmwHPmwXQm9ObBtiaAdmaBdua3ZoG4ZsG5ZsF5pzrnAHwnAH1nAH5nAX+nP6dBf6e/p8F/qD3oAH1oAHzoAXyoO+hBuuhAeqhBemh6KEF5qHeogXSo8ukBcmkyKQFxqTFpAbDpAHCpAXCpMGkBr+kBrukBbmkuKQFt6SzpQarpQalpgWkpqSmBaKmoKUGnaUFnKWbpQaZpgWXpoyoBYqoiagFiKiHqAaEqAGDqAWAqHmpBXeqcKoGYqsGW6sFWqtXrAZQrAZLrQVKrUiuBkOvBT+vOrEGM7UFMrYytgUytzS4Bji5Bjq6BTy6PbsBP7sGQLsFRr1IvQVKvU69BlO9BVS9VL0GVb0BXL4FXb5dvgVevmC+BmK+AWS+BWa+ar8Gb78FccBxwQVxwXDCBm7DBW3Da8MGaMMGZsQFZcRkxAZhxAZfxQZdxQVcxVrFBljEAVjEBVfEVMUGUMUFT8VLxgZHyAVEyUHJBUHJO8kGNMoFM8oyygYxygYxygYwygYwygYvywYvywYvywYuzAYuzAUuzS/NBjHNBjPOBTXOOs4FPM5CzgFDzgVGzkfOBkvPBk3QBU7RVNEGWtIFXNJc0gVd0l7SBmDSBWXSZ9MFaNNq0wVs02/TBW/TcNMFctN31QV41XnVBXnVetUGfNUFftWA1QGB1QaD1gaE1gaF1gGG1gaH1gGH1waH1wGH2AWH2YbZBoLZBoDaBX/afNoGd9oFddtw2wFv2wFt2wFr2wVq22jbBmXbBmLbBmDbBl7bBlzbBVXcU9wFTNxM3QVM3k3fBk7gAU7hBU7iSeIFR+JG4gFF4gVE4kLiBkDjBT3kNOUFNOUx5gYr5gUn5iPnBh7pAR7qBR7qHuoGHuoGH+sGH+sGIOsGIesGIesGIusGI+wBJewGKOwGKewGKu0GLO0GLu4FMO4x7gY07wY37wU58DvxBj3yBT7yQPIFQfJC8gZF8gVG8kjzBUnzSfMGSvQFSvVI9gU+9jz3BTr3OfcFOfc19wE09wUy9zH3Bi74ASr6BSf7IfsBIPsBIPsFHfsb+wUa+xX8Bg/+Bgr+BgT+AQH+CA==' },
  // '\u{E0C8}' is unused
  '\u{E0CA}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: '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' },
  // '\u{E0CB}' is unused
  '\u{E0CC}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0.5071 L0.8623,0.7102 L0.5865,0.7102 L0.4489,0.5071 L0.5865,0.3045 L0.8623,0.3045 Z M0.4135,0.7974 L0.2758,1 L0,1 L0,0.5944 L0.2758,0.5944 Z M0.4135,0.2026 L0.2758,0.4056 L0,0.4056 L0,0 L0.2758,0 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0CD}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.9726,0.5071 L0.8451,0.3184 L0.59,0.3184 L0.4624,0.5071 L0.59,0.6955 L0.8451,0.6955 Z M1,0.5071 L0.8588,0.716 L0.5768,0.716 L0.4355,0.5071 L0.5768,0.2982 L0.8588,0.2982 Z M0.401,0.7911 L0.2735,0.6028 L0.0236,0.6028 L0.0236,0.9799 L0.2735,0.9799 Z M0.4284,0.7911 L0.2872,1 L0,1 L0,0.5826 L0.2872,0.5826 Z M0.401,0.2089 L0.2735,0.0201 L0.0236,0.0201 L0.0236,0.3972 L0.2735,0.3972 Z M0.4284,0.2089 L0.2872,0.4174 L0,0.4174 L0,0 L0.2872,0 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0CE}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0.4996 Q1,0.5365,0.9924,0.568 T0.9718,0.6177 T0.9433,0.6363 L0.9425,0.6367 Q0.9355,0.6367,0.9285,0.6326 L0.9308,0.6326 Q0.9129,0.6195,0.9013,0.587 T0.8871,0.5164 T0.8943,0.4373 T0.9254,0.3687 L0.9254,0.3691 Q0.9339,0.3628,0.9425,0.3628 Q0.9584,0.3628,0.9716,0.3811 T0.9924,0.431 T1,0.4996 Z M0.9234,0.6321 L0.8776,0.7169 Q0.8791,0.732,0.8791,0.7441 Q0.8791,0.781,0.8716,0.8123 T0.8508,0.862 T0.8224,0.8809 L0.8216,0.8809 Q0.8154,0.8809,0.8092,0.8775 L0.8088,0.8775 Q0.7905,0.8633,0.7792,0.8297 T0.766,0.7571 T0.775,0.6768 T0.8088,0.6086 L0.7431,0.6065 Q0.719,0.6313,0.7072,0.6705 T0.6965,0.7487 T0.7097,0.823 T0.7423,0.8763 L0.7913,0.8775 L0.7314,0.9895 L0.4648,0.5038 L0.7299,0.0176 L0.7882,0.1229 L0.7404,0.1212 Q0.7244,0.138,0.7136,0.1617 T0.6982,0.2108 T0.6943,0.2632 T0.7003,0.3144 T0.7159,0.3586 T0.7396,0.3909 L0.8072,0.3926 Q0.7894,0.3796,0.7777,0.3479 T0.7635,0.2789 T0.7697,0.2011 T0.7987,0.1326 Q0.8092,0.1225,0.8204,0.1225 Q0.8321,0.1225,0.8426,0.1332 T0.8609,0.1623 T0.8731,0.2062 T0.8776,0.2592 Q0.8776,0.268,0.8768,0.2815 L0.9219,0.3628 L0.8644,0.3612 Q0.8403,0.3855,0.8284,0.4247 T0.8177,0.5029 T0.8309,0.5772 T0.8632,0.6305 Z M0.6759,0.6384 Q0.6576,0.625,0.6457,0.5914 T0.6319,0.5185 T0.6407,0.4375 T0.6751,0.3691 L0.609,0.367 Q0.5849,0.3918,0.5731,0.431 T0.5626,0.509 T0.5758,0.5833 T0.6082,0.6367 Z M0.6459,0.0025 L0.391,0.4551 L0.0035,0.4551 L0.246,0 Z M0.6553,1 L0.2421,1 L0,0.5449 L0.3875,0.5449 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0CF}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.4996,0 Q0.5562,0,0.5961,0.0166 T0.6364,0.0566 L0.6368,0.0575 Q0.6368,0.0646,0.6324,0.0713 L0.6324,0.0692 Q0.6196,0.0868,0.5872,0.0986 T0.5166,0.1128 T0.4373,0.1057 T0.3689,0.0747 L0.3694,0.0747 Q0.3627,0.0663,0.3627,0.0575 Q0.3627,0.0336,0.4028,0.0168 T0.4996,0 Z M0.6324,0.0768 L0.717,0.1225 Q0.7321,0.1212,0.744,0.1212 Q0.8007,0.1212,0.8406,0.1378 T0.8809,0.1779 L0.8813,0.1783 Q0.8813,0.1846,0.8778,0.1909 Q0.8636,0.2093,0.8299,0.2208 T0.7573,0.2343 T0.6769,0.2253 T0.6089,0.1913 L0.6067,0.2567 Q0.6315,0.281,0.6707,0.2928 T0.7489,0.3035 T0.8231,0.2903 T0.8764,0.258 L0.8778,0.2085 L0.9898,0.2685 L0.504,0.5352 L0.0177,0.2701 L0.1227,0.2118 L0.1213,0.2596 Q0.1457,0.2836,0.1851,0.2955 T0.2635,0.3062 T0.3377,0.293 T0.3911,0.2605 L0.3928,0.193 Q0.38,0.2106,0.3483,0.2221 T0.2792,0.2364 T0.2013,0.2303 T0.1324,0.2013 Q0.1222,0.1909,0.1222,0.1795 Q0.1222,0.156,0.1623,0.1393 T0.2591,0.1225 Q0.2679,0.1225,0.2817,0.1233 L0.3627,0.078 L0.3609,0.1359 Q0.3857,0.1598,0.4249,0.1718 T0.5031,0.1825 T0.5773,0.1693 T0.6306,0.1367 Z M0.6386,0.3242 Q0.6253,0.3427,0.5917,0.3544 T0.5186,0.3683 T0.4376,0.3595 T0.3689,0.3251 L0.3671,0.3909 Q0.3915,0.4148,0.4309,0.4268 T0.5093,0.4375 T0.5835,0.4243 T0.6368,0.3918 Z M0.0027,0.354 L0.4553,0.6091 L0.4553,0.9962 L0,0.7542 Z M1,0.3448 L1,0.7576 L0.5447,1 L0.5447,0.6128 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0D0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0.7699 Q0,0.7172,0.0277,0.6731 T0.103,0.6032 T0.2066,0.5774 Q0.2487,0.5774,0.2865,0.5922 T0.3526,0.6339 L0.3935,0.6715 Q0.4218,0.6984,0.438,0.7336 T0.4541,0.8075 Q0.4541,0.8602,0.4264,0.9046 T0.3511,0.9745 T0.2475,1 Q0.2054,1,0.1676,0.9852 T0.1016,0.9435 L0.0606,0.9059 Q0.0317,0.879,0.0159,0.8438 T0,0.7699 Z M0.5459,0.7699 Q0.5459,0.7172,0.5736,0.6731 T0.6489,0.6032 T0.7525,0.5774 Q0.7946,0.5774,0.8324,0.5922 T0.8984,0.6339 L0.9394,0.6715 Q0.9579,0.6892,0.9714,0.7105 T0.9925,0.7567 T1,0.8075 Q1,0.8602,0.9723,0.9046 T0.897,0.9745 T0.7934,1 Q0.7513,1,0.7135,0.9852 T0.6474,0.9435 L0.6065,0.9059 Q0.5776,0.879,0.5617,0.8438 T0.5459,0.7699 Z M0,0.1925 Q0,0.1398,0.0277,0.0957 T0.103,0.0258 T0.2066,0 Q0.2487,0,0.2865,0.0148 T0.3526,0.0565 L0.3935,0.0941 Q0.4218,0.121,0.438,0.1562 T0.4541,0.2301 Q0.4541,0.2828,0.4264,0.3269 T0.3511,0.3968 T0.2475,0.4226 Q0.2054,0.4226,0.1676,0.4078 T0.1016,0.3661 L0.0606,0.3285 Q0.0317,0.3016,0.0159,0.2664 T0,0.1925 Z M0.5459,0.1925 Q0.5459,0.1398,0.5736,0.0957 T0.6489,0.0258 T0.7525,0 Q0.7946,0,0.8324,0.0148 T0.8984,0.0565 L0.9394,0.0941 Q0.9677,0.121,0.9838,0.1562 T1,0.2301 Q1,0.2828,0.9723,0.3269 T0.897,0.3968 T0.7934,0.4226 Q0.7513,0.4226,0.7135,0.4078 T0.6474,0.3661 L0.6065,0.3285 Q0.5874,0.3108,0.5741,0.2895 T0.5534,0.2433 T0.5459,0.1925 Z M0.3301,0.6403 Q0.3306,0.6403,0.3312,0.6409 L0.3272,0.6371 L0.3272,0.6371 Z M0.8759,0.6403 Q0.8765,0.6403,0.8771,0.6409 Q0.8748,0.6387,0.8725,0.6371 L0.8731,0.6371 Z M0.3301,0.0629 Q0.3306,0.0629,0.3312,0.0634 L0.3272,0.0597 L0.3272,0.0602 Z M0.8759,0.0629 Q0.8765,0.0629,0.8771,0.0634 Q0.8748,0.0613,0.8725,0.0597 Q0.8731,0.0597,0.8731,0.0602 Z M0.779,0.4113 L0.7501,0.3849 Q0.7046,0.3844,0.6636,0.3661 Q0.7132,0.407,0.779,0.4113 Z M0.7957,0.4118 Q0.8477,0.4113,0.8918,0.3874 T0.9619,0.3223 T0.9885,0.2323 L0.9585,0.2048 Q0.9538,0.2769,0.8987,0.3282 T0.7657,0.3844 Z M0.9879,0.2167 Q0.9827,0.1554,0.9388,0.1097 Q0.9585,0.1478,0.959,0.1898 Z M0.2331,0.4113 L0.2043,0.3849 Q0.1587,0.3844,0.1177,0.3661 Q0.1673,0.407,0.2331,0.4113 Z M0.2499,0.4118 Q0.2885,0.4118,0.324,0.3973 T0.3852,0.3589 T0.4264,0.3019 T0.4426,0.2323 L0.4126,0.2048 Q0.408,0.2769,0.3529,0.3282 T0.2198,0.3844 Z M0.442,0.2167 Q0.4368,0.1554,0.393,0.1097 Q0.4126,0.1478,0.4132,0.1903 Z M0.779,0.9887 L0.7501,0.9624 Q0.7046,0.9618,0.6636,0.9435 Q0.7132,0.9844,0.779,0.9887 Z M0.7957,0.9892 Q0.8477,0.9887,0.8918,0.9648 T0.9619,0.8997 T0.9885,0.8097 L0.9585,0.7823 Q0.9538,0.8543,0.8987,0.9056 T0.7657,0.9618 Z M0.9879,0.7941 Q0.9827,0.7328,0.9388,0.6871 Q0.9585,0.7253,0.959,0.7672 Z M0.2331,0.9887 L0.2043,0.9624 Q0.1587,0.9618,0.1177,0.9435 Q0.1673,0.9844,0.2331,0.9887 Z M0.2499,0.9892 Q0.3018,0.9887,0.3459,0.9648 T0.416,0.8997 T0.4426,0.8102 L0.4126,0.7823 Q0.408,0.8543,0.3529,0.9056 T0.2198,0.9618 Z M0.442,0.7941 Q0.4368,0.7328,0.393,0.6871 Q0.4126,0.7253,0.4132,0.7672 Z M0.3191,0.6452 Q0.2943,0.622,0.2643,0.6091 T0.2066,0.5962 Q0.1795,0.5962,0.1497,0.6091 T0.0949,0.6441 T0.0537,0.6995 T0.0375,0.7699 Q0.0375,0.8419,0.0941,0.8941 Q0.1189,0.9172,0.1489,0.9304 T0.2066,0.9435 Q0.2337,0.9435,0.2634,0.9304 T0.3182,0.8952 T0.3595,0.8398 T0.3756,0.7699 Q0.3756,0.6978,0.3191,0.6452 Z M0.026,0.7731 L0.026,0.7699 Q0.026,0.6935,0.0854,0.6376 Q0.0658,0.6538,0.0514,0.6739 T0.0289,0.718 T0.0202,0.7677 Z M0.0271,0.7892 L0.0208,0.7833 Q0.0254,0.8419,0.0681,0.886 Q0.0664,0.8828,0.0646,0.879 Q0.0329,0.8382,0.0271,0.7892 Z M0.3866,0.7823 Q0.382,0.8511,0.3278,0.9016 Q0.3843,0.8565,0.3918,0.7871 Z M0.3872,0.7677 L0.393,0.7726 L0.393,0.7699 Q0.393,0.7349,0.3791,0.7038 Q0.3739,0.6973,0.3681,0.6914 Q0.3866,0.7274,0.3872,0.7677 Z M0.865,0.6452 Q0.8402,0.622,0.8102,0.6091 T0.7525,0.5962 Q0.7305,0.5962,0.7072,0.6043 T0.6619,0.628 T0.6223,0.6642 T0.5941,0.7124 T0.5834,0.7699 Q0.5834,0.8419,0.6399,0.8941 Q0.6561,0.9097,0.6757,0.9207 T0.7149,0.9376 T0.7525,0.9435 Q0.7796,0.9435,0.8093,0.9304 T0.8641,0.8952 T0.9054,0.8398 T0.9215,0.7699 Q0.9215,0.6978,0.865,0.6452 Z M0.5718,0.7731 L0.5718,0.7699 Q0.5718,0.6935,0.6313,0.6376 Q0.6013,0.6618,0.584,0.6954 T0.5661,0.7677 Z M0.573,0.7892 L0.5666,0.7833 Q0.5713,0.8419,0.614,0.886 Q0.6122,0.8828,0.6105,0.879 Q0.5788,0.8382,0.573,0.7892 Z M0.9325,0.7823 Q0.9279,0.8511,0.8736,0.9016 Q0.9308,0.8565,0.9377,0.7871 Z M0.9331,0.7672 L0.9388,0.7726 L0.9388,0.7699 Q0.9388,0.7349,0.925,0.7038 Q0.9198,0.6973,0.914,0.6914 Q0.9325,0.7274,0.9331,0.7672 Z M0.3191,0.0677 Q0.2943,0.0446,0.2643,0.0317 T0.2066,0.0188 Q0.1795,0.0188,0.1497,0.0317 T0.0949,0.0667 T0.0537,0.122 T0.0375,0.1925 Q0.0375,0.2645,0.0941,0.3167 Q0.1189,0.3398,0.1489,0.353 T0.2066,0.3661 Q0.2337,0.3661,0.2634,0.353 T0.3182,0.3177 T0.3595,0.2624 T0.3756,0.1925 Q0.3756,0.1204,0.3191,0.0677 Z M0.026,0.1957 L0.026,0.1925 Q0.026,0.1161,0.0854,0.0602 Q0.0554,0.0844,0.0381,0.118 T0.0202,0.1903 Z M0.0271,0.2118 L0.0208,0.2059 Q0.0254,0.2645,0.0681,0.3086 Q0.0664,0.3054,0.0646,0.3016 Q0.0329,0.2608,0.0271,0.2118 Z M0.3866,0.2048 Q0.382,0.2737,0.3278,0.3242 Q0.3849,0.279,0.3918,0.2097 Z M0.3872,0.1903 L0.393,0.1952 L0.393,0.1925 Q0.393,0.1581,0.3791,0.1263 Q0.3739,0.1199,0.3681,0.114 Q0.3866,0.15,0.3872,0.1903 Z M0.865,0.0677 Q0.8402,0.0446,0.8102,0.0317 T0.7525,0.0188 Q0.7253,0.0188,0.6956,0.0317 T0.6408,0.0667 T0.5995,0.122 T0.5834,0.1925 Q0.5834,0.2645,0.6399,0.3167 Q0.6647,0.3398,0.6947,0.353 T0.7525,0.3661 Q0.7796,0.3661,0.8093,0.353 T0.8641,0.3177 T0.9054,0.2624 T0.9215,0.1925 Q0.9215,0.1204,0.865,0.0677 Z M0.5718,0.1957 L0.5718,0.1925 Q0.5718,0.1161,0.6313,0.0602 Q0.6013,0.0844,0.584,0.118 T0.5661,0.1903 Z M0.573,0.2118 L0.5666,0.2059 Q0.5713,0.2645,0.614,0.3086 Q0.6122,0.3054,0.6105,0.3016 Q0.5788,0.2608,0.573,0.2118 Z M0.9325,0.2048 Q0.9279,0.2737,0.8736,0.3242 Q0.9308,0.279,0.9377,0.2097 Z M0.9331,0.1898 L0.9388,0.1952 L0.9388,0.1925 Q0.9388,0.1575,0.925,0.1263 Q0.9198,0.1199,0.914,0.114 Q0.9325,0.15,0.9331,0.1898 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0D1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.7639,0.1974 L0.9593,0.1974 L0.9593,0.1443 L0.7639,0.1443 L0.7639,0.1974 Z M0.7586,0.109 L0.9727,0.109 Q0.9839,0.109,0.992,0.1153 T1,0.1291 L1,0.382 Q1,0.3906,0.9912,0.3964 T0.9727,0.4021 L0.7586,0.4021 Q0.7468,0.4021,0.739,0.3956 T0.7313,0.382 L0.7313,0.1291 Q0.7313,0.1246,0.7339,0.1207 T0.7406,0.1143 T0.7495,0.1104 T0.7586,0.109 Z M0.7639,0.6575 L0.9593,0.6575 L0.9593,0.6044 L0.7639,0.6044 L0.7639,0.6575 Z M0.7313,0.8347 L0.7313,0.5843 Q0.7313,0.5757,0.7401,0.5699 T0.7586,0.5641 L0.9706,0.5641 Q0.9818,0.5641,0.9898,0.5705 T0.9979,0.5843 L0.9979,0.8347 Q0.9979,0.8433,0.989,0.8491 T0.9706,0.8549 L0.7586,0.8549 Q0.7468,0.8549,0.739,0.8483 T0.7313,0.8347 Z M0,1 L0,0 L0.7607,0 L0.7607,1 L0,1 Z', type: CustomGlyphVectorType.FILL } },
  '\u{E0D2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.9764,0.0029 L0.3179,0.4552 L0,0.4552 L0,0 Z M1,1 L0,1 L0,0.5448 L0.3091,0.5448 Z', type: CustomGlyphVectorType.FILL } },
  // '\u{E0C3}' is unused
  '\u{E0D4}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0.0236,0.0029 L0.6824,0.4552 L1,0.4552 L1,0 Z M0,1 L1,1 L1,0.5448 L0.6912,0.5448 Z', type: CustomGlyphVectorType.FILL } },

  // #endregion

  // #region Git Branch Symbols (F5D0-F60D)

  // Initially added in Kitty (https://github.com/kovidgoyal/kitty/pull/7681)
  // then in Wezterm (https://github.com/wezterm/wezterm/issues/6328).

  // Straight lines (F5D0-F5D9)
  '\u{F5D0}': GitBranchSymbolsParts.LINE_H, // Same as 2500
  '\u{F5D1}': GitBranchSymbolsParts.LINE_V, // Same as 2502
  '\u{F5D2}': GitBranchSymbolsParts.FADE_RIGHT,
  '\u{F5D3}': GitBranchSymbolsParts.FADE_LEFT,
  '\u{F5D4}': GitBranchSymbolsParts.FADE_DOWN,
  '\u{F5D5}': GitBranchSymbolsParts.FADE_UP,

  // Curved lines (F5D6-F5D9)
  '\u{F5D6}': GitBranchSymbolsParts.CURVE_DOWN_RIGHT, // Same as 256D)
  '\u{F5D7}': GitBranchSymbolsParts.CURVE_DOWN_LEFT, // Same as 256E)
  '\u{F5D8}': GitBranchSymbolsParts.CURVE_UP_RIGHT, // Same as 2570)
  '\u{F5D9}': GitBranchSymbolsParts.CURVE_UP_LEFT, // Same as 256F)

  // Branching lines (F5DA-F5ED)
  '\u{F5DA}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5DB}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_DOWN_RIGHT],
  '\u{F5DC}': [GitBranchSymbolsParts.CURVE_DOWN_RIGHT, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5DD}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5DE}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_DOWN_LEFT],
  '\u{F5DF}': [GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5E0}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_LEFT],
  '\u{F5E1}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_RIGHT],
  '\u{F5E2}': [GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_DOWN_RIGHT],
  '\u{F5E3}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5E4}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5E5}': [GitBranchSymbolsParts.CURVE_UP_LEFT, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5E6}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_UP_LEFT, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5E7}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_DOWN_RIGHT],
  '\u{F5E8}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5E9}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_RIGHT, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5EA}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_DOWN_RIGHT, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5EB}': [GitBranchSymbolsParts.LINE_V, GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_UP_RIGHT],
  '\u{F5EC}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_RIGHT, GitBranchSymbolsParts.CURVE_UP_LEFT],
  '\u{F5ED}': [GitBranchSymbolsParts.LINE_H, GitBranchSymbolsParts.CURVE_DOWN_LEFT, GitBranchSymbolsParts.CURVE_UP_RIGHT],

  // Nodes (F5EE-F5FB)
  '\u{F5EE}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE],
  '\u{F5EF}': GitBranchSymbolsParts.NODE_STROKE,
  '\u{F5F0}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5F1}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5F2}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F5F3}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F5F4}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5F5}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5F6}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN],
  '\u{F5F7}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN],
  '\u{F5F8}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP],
  '\u{F5F9}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP],
  '\u{F5FA}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_UP],
  '\u{F5FB}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_UP],

  // Extended Nodes (F5FC-F60D)
  // These were added a little later https://github.com/kovidgoyal/kitty/pull/7805
  '\u{F5FC}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5FD}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F5FE}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F5FF}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F600}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F601}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F602}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F603}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F604}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F605}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F606}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F607}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT],
  '\u{F608}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F609}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F60A}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F60B}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F60C}': [GitBranchSymbolsParts.NODE_FILL, GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],
  '\u{F60D}': [GitBranchSymbolsParts.NODE_STROKE, GitBranchSymbolsParts.NODE_LINE_UP, GitBranchSymbolsParts.NODE_LINE_DOWN, GitBranchSymbolsParts.NODE_LINE_LEFT, GitBranchSymbolsParts.NODE_LINE_RIGHT],

  // #endregion

  // #region Symbols for Legacy Computing (1FB00-1FB3B)

  // https://www.unicode.org/charts/PDF/U1FB00.pdf

  // Block mosaic terminal graphic characters (1FB00-1FB3B)
  // The term "sextant" refers to block mosaics divided into six parts.
  '\u{1FB00}': sextant(0b000001), // BLOCK SEXTANT-1
  '\u{1FB01}': sextant(0b000010), // BLOCK SEXTANT-2
  '\u{1FB02}': sextant(0b000011), // BLOCK SEXTANT-12 (upper one third block)
  '\u{1FB03}': sextant(0b000100), // BLOCK SEXTANT-3
  '\u{1FB04}': sextant(0b000101), // BLOCK SEXTANT-13
  '\u{1FB05}': sextant(0b000110), // BLOCK SEXTANT-23
  '\u{1FB06}': sextant(0b000111), // BLOCK SEXTANT-123
  '\u{1FB07}': sextant(0b001000), // BLOCK SEXTANT-4
  '\u{1FB08}': sextant(0b001001), // BLOCK SEXTANT-14
  '\u{1FB09}': sextant(0b001010), // BLOCK SEXTANT-24
  '\u{1FB0A}': sextant(0b001011), // BLOCK SEXTANT-124
  '\u{1FB0B}': sextant(0b001100), // BLOCK SEXTANT-34 (middle one third block)
  '\u{1FB0C}': sextant(0b001101), // BLOCK SEXTANT-134
  '\u{1FB0D}': sextant(0b001110), // BLOCK SEXTANT-234
  '\u{1FB0E}': sextant(0b001111), // BLOCK SEXTANT-1234 (upper two thirds block)
  '\u{1FB0F}': sextant(0b010000), // BLOCK SEXTANT-5
  '\u{1FB10}': sextant(0b010001), // BLOCK SEXTANT-15
  '\u{1FB11}': sextant(0b010010), // BLOCK SEXTANT-25
  '\u{1FB12}': sextant(0b010011), // BLOCK SEXTANT-125
  '\u{1FB13}': sextant(0b010100), // BLOCK SEXTANT-35
  '\u{1FB14}': sextant(0b010110), // BLOCK SEXTANT-235
  '\u{1FB15}': sextant(0b010111), // BLOCK SEXTANT-1235
  '\u{1FB16}': sextant(0b011000), // BLOCK SEXTANT-45
  '\u{1FB17}': sextant(0b011001), // BLOCK SEXTANT-145
  '\u{1FB18}': sextant(0b011010), // BLOCK SEXTANT-245
  '\u{1FB19}': sextant(0b011011), // BLOCK SEXTANT-1245
  '\u{1FB1A}': sextant(0b011100), // BLOCK SEXTANT-345
  '\u{1FB1B}': sextant(0b011101), // BLOCK SEXTANT-1345
  '\u{1FB1C}': sextant(0b011110), // BLOCK SEXTANT-2345
  '\u{1FB1D}': sextant(0b011111), // BLOCK SEXTANT-12345
  '\u{1FB1E}': sextant(0b100000), // BLOCK SEXTANT-6
  '\u{1FB1F}': sextant(0b100001), // BLOCK SEXTANT-16
  '\u{1FB20}': sextant(0b100010), // BLOCK SEXTANT-26
  '\u{1FB21}': sextant(0b100011), // BLOCK SEXTANT-126
  '\u{1FB22}': sextant(0b100100), // BLOCK SEXTANT-36
  '\u{1FB23}': sextant(0b100101), // BLOCK SEXTANT-136
  '\u{1FB24}': sextant(0b100110), // BLOCK SEXTANT-236
  '\u{1FB25}': sextant(0b100111), // BLOCK SEXTANT-1236
  '\u{1FB26}': sextant(0b101000), // BLOCK SEXTANT-46
  '\u{1FB27}': sextant(0b101001), // BLOCK SEXTANT-146
  '\u{1FB28}': sextant(0b101011), // BLOCK SEXTANT-1246
  '\u{1FB29}': sextant(0b101100), // BLOCK SEXTANT-346
  '\u{1FB2A}': sextant(0b101101), // BLOCK SEXTANT-1346
  '\u{1FB2B}': sextant(0b101110), // BLOCK SEXTANT-2346
  '\u{1FB2C}': sextant(0b101111), // BLOCK SEXTANT-12346
  '\u{1FB2D}': sextant(0b110000), // BLOCK SEXTANT-56 (lower one third block)
  '\u{1FB2E}': sextant(0b110001), // BLOCK SEXTANT-156
  '\u{1FB2F}': sextant(0b110010), // BLOCK SEXTANT-256
  '\u{1FB30}': sextant(0b110011), // BLOCK SEXTANT-1256 (upper and lower one third block)
  '\u{1FB31}': sextant(0b110100), // BLOCK SEXTANT-356
  '\u{1FB32}': sextant(0b110101), // BLOCK SEXTANT-1356
  '\u{1FB33}': sextant(0b110110), // BLOCK SEXTANT-2356
  '\u{1FB34}': sextant(0b110111), // BLOCK SEXTANT-12356
  '\u{1FB35}': sextant(0b111000), // BLOCK SEXTANT-456
  '\u{1FB36}': sextant(0b111001), // BLOCK SEXTANT-1456
  '\u{1FB37}': sextant(0b111010), // BLOCK SEXTANT-2456
  '\u{1FB38}': sextant(0b111011), // BLOCK SEXTANT-12456
  '\u{1FB39}': sextant(0b111100), // BLOCK SEXTANT-3456 (lower two thirds block)
  '\u{1FB3A}': sextant(0b111101), // BLOCK SEXTANT-13456
  '\u{1FB3B}': sextant(0b111110), // BLOCK SEXTANT-23456

  // Smooth mosaic terminal graphic characters (1FB3C-1FB6F)
  '\u{1FB3C}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAQD/AYD/CA==' },           // LOWER LEFT BLOCK DIAGONAL LOWER MIDDLE LEFT TO LOWER CENTRE
  '\u{1FB3D}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAQD/Af//CA==' },             // LOWER LEFT BLOCK DIAGONAL LOWER MIDDLE LEFT TO LOWER RIGHT
  '\u{1FB3E}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAQD/AYD/CA==' },           // LOWER LEFT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER CENTRE
  '\u{1FB3F}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAQD/Af//CA==' },             // LOWER LEFT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER RIGHT
  '\u{1FB40}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAQD/AYD/CA==' },                // LOWER LEFT BLOCK DIAGONAL UPPER LEFT TO LOWER CENTRE
  '\u{1FB41}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAYAAAf8AAf//AQD/CA==' }, // LOWER RIGHT BLOCK DIAGONAL UPPER MIDDLE LEFT TO UPPER CENTRE
  '\u{1FB42}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAf8AAf//AQD/CA==' },        // LOWER RIGHT BLOCK DIAGONAL UPPER MIDDLE LEFT TO UPPER RIGHT
  '\u{1FB43}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAYAAAf8AAf//AQD/CA==' }, // LOWER RIGHT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER CENTRE
  '\u{1FB44}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAf8AAf//AQD/CA==' },        // LOWER RIGHT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER RIGHT
  '\u{1FB45}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/AYAAAf8AAf//CA==' },           // LOWER RIGHT BLOCK DIAGONAL LOWER LEFT TO UPPER CENTRE
  '\u{1FB46}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAf9VAf//AQD/CA==' },   // LOWER RIGHT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB47}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/Af+qAf//CA==' },           // LOWER RIGHT BLOCK DIAGONAL LOWER CENTRE TO LOWER MIDDLE RIGHT
  '\u{1FB48}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/Af+qAf//CA==' },             // LOWER RIGHT BLOCK DIAGONAL LOWER LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB49}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/Af9VAf//CA==' },           // LOWER RIGHT BLOCK DIAGONAL LOWER CENTRE TO UPPER MIDDLE RIGHT
  '\u{1FB4A}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/Af9VAf//CA==' },             // LOWER RIGHT BLOCK DIAGONAL LOWER LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB4B}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/Af8AAf//CA==' },                // LOWER RIGHT BLOCK DIAGONAL LOWER CENTRE TO UPPER RIGHT
  '\u{1FB4C}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAQAAAQD/Af//Af9VCA==' }, // LOWER LEFT BLOCK DIAGONAL UPPER CENTRE TO UPPER MIDDLE RIGHT
  '\u{1FB4D}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAQD/Af//Af9VCA==' },        // LOWER LEFT BLOCK DIAGONAL UPPER LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB4E}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAQAAAQD/Af//Af+qCA==' }, // LOWER LEFT BLOCK DIAGONAL UPPER CENTRE TO LOWER MIDDLE RIGHT
  '\u{1FB4F}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAQD/Af//Af+qCA==' },        // LOWER LEFT BLOCK DIAGONAL UPPER LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB50}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAQAAAQD/Af//CA==' },           // LOWER LEFT BLOCK DIAGONAL UPPER CENTRE TO LOWER RIGHT
  '\u{1FB51}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAQD/Af//Af+qCA==' },   // LOWER LEFT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB52}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAYD/Af//Af8AAQAACA==' }, // UPPER RIGHT BLOCK DIAGONAL LOWER MIDDLE LEFT TO LOWER CENTRE
  '\u{1FB53}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAf//Af8AAQAACA==' },        // UPPER RIGHT BLOCK DIAGONAL LOWER MIDDLE LEFT TO LOWER RIGHT
  '\u{1FB54}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAYD/Af//Af8AAQAACA==' }, // UPPER RIGHT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER CENTRE
  '\u{1FB55}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAf//Af8AAQAACA==' },        // UPPER RIGHT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER RIGHT
  '\u{1FB56}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAYD/Af//Af8ACA==' },           // UPPER RIGHT BLOCK DIAGONAL UPPER LEFT TO LOWER CENTRE
  '\u{1FB57}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAQAAAYAACA==' },           // UPPER LEFT BLOCK DIAGONAL UPPER MIDDLE LEFT TO UPPER CENTRE
  '\u{1FB58}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAQAAAf8ACA==' },             // UPPER LEFT BLOCK DIAGONAL UPPER MIDDLE LEFT TO UPPER RIGHT
  '\u{1FB59}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAQAAAYAACA==' },           // UPPER LEFT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER CENTRE
  '\u{1FB5A}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAQAAAf8ACA==' },             // UPPER LEFT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER RIGHT
  '\u{1FB5B}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/AQAAAYAACA==' },                // UPPER LEFT BLOCK DIAGONAL LOWER LEFT TO UPPER CENTRE
  '\u{1FB5C}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACqAQAAAf8AAf9VCA==' },   // UPPER LEFT BLOCK DIAGONAL LOWER MIDDLE LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB5D}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/AQD/AQAAAf8AAf+qCA==' }, // UPPER LEFT BLOCK DIAGONAL LOWER CENTRE TO LOWER MIDDLE RIGHT
  '\u{1FB5E}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/AQAAAf8AAf+qCA==' },        // UPPER LEFT BLOCK DIAGONAL LOWER LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB5F}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/AQD/AQAAAf8AAf9VCA==' }, // UPPER LEFT BLOCK DIAGONAL LOWER CENTRE TO UPPER MIDDLE RIGHT
  '\u{1FB60}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/AQAAAf8AAf9VCA==' },        // UPPER LEFT BLOCK DIAGONAL LOWER LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB61}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AID/AQD/AQAAAf8ACA==' },           // UPPER LEFT BLOCK DIAGONAL LOWER CENTRE TO UPPER RIGHT
  '\u{1FB62}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAf8AAf9VCA==' },           // UPPER RIGHT BLOCK DIAGONAL UPPER CENTRE TO UPPER MIDDLE RIGHT
  '\u{1FB63}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAf9VCA==' },             // UPPER RIGHT BLOCK DIAGONAL UPPER LEFT TO UPPER MIDDLE RIGHT
  '\u{1FB64}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAf8AAf+qCA==' },           // UPPER RIGHT BLOCK DIAGONAL UPPER CENTRE TO LOWER MIDDLE RIGHT
  '\u{1FB65}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAf+qCA==' },             // UPPER RIGHT BLOCK DIAGONAL UPPER LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB66}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AIAAAf8AAf//CA==' },                // UPPER RIGHT BLOCK DIAGONAL UPPER CENTRE TO LOWER RIGHT
  '\u{1FB67}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABVAf+qAf8AAQAACA==' },   // UPPER RIGHT BLOCK DIAGONAL UPPER MIDDLE LEFT TO LOWER MIDDLE RIGHT
  '\u{1FB68}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAf//AQD/AYCACA==' },    // UPPER AND RIGHT AND LOWER TRIANGULAR THREE QUARTERS BLOCK (missing left)
  '\u{1FB69}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAYCAAf8AAf//AQD/CA==' },    // LEFT AND LOWER AND RIGHT TRIANGULAR THREE QUARTERS BLOCK (missing upper)
  '\u{1FB6A}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAYCAAf//AQD/CA==' },    // UPPER AND LEFT AND LOWER TRIANGULAR THREE QUARTERS BLOCK (missing right)
  '\u{1FB6B}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAf//AYCAAQD/CA==' },    // LEFT AND UPPER AND RIGHT TRIANGULAR THREE QUARTERS BLOCK (missing lower)
  '\u{1FB6C}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAYCAAQD/CA==' },              // LEFT TRIANGULAR ONE QUARTER BLOCK
  '\u{1FB6D}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAYCACA==' },              // UPPER TRIANGULAR ONE QUARTER BLOCK
  '\u{1FB6E}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AP8AAf//AYCACA==' },              // RIGHT TRIANGULAR ONE QUARTER BLOCK
  '\u{1FB6F}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAD/Af//AYCACA==' },              // LOWER TRIANGULAR ONE QUARTER BLOCK

  // Block elements (1FB70-1FB80)
  '\u{1FB70}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 1, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-2
  '\u{1FB71}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 2, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-3
  '\u{1FB72}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 3, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-4
  '\u{1FB73}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-5
  '\u{1FB74}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 5, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-6
  '\u{1FB75}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 6, y: 0, w: 1, h: 8 }] },                             // VERTICAL ONE EIGHTH BLOCK-7
  '\u{1FB76}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 1, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-2
  '\u{1FB77}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 2, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-3
  '\u{1FB78}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 3, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-4
  '\u{1FB79}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 4, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-5
  '\u{1FB7A}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 5, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-6
  '\u{1FB7B}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 6, w: 8, h: 1 }] },                             // HORIZONTAL ONE EIGHTH BLOCK-7
  '\u{1FB7C}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 1, h: 8 }, { x: 0, y: 7, w: 8, h: 1 }] }, // LEFT AND LOWER ONE EIGHTH BLOCK
  '\u{1FB7D}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 1, h: 8 }, { x: 0, y: 0, w: 8, h: 1 }] }, // LEFT AND UPPER ONE EIGHTH BLOCK
  '\u{1FB7E}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 7, y: 0, w: 1, h: 8 }, { x: 0, y: 0, w: 8, h: 1 }] }, // RIGHT AND UPPER ONE EIGHTH BLOCK
  '\u{1FB7F}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 7, y: 0, w: 1, h: 8 }, { x: 0, y: 7, w: 8, h: 1 }] }, // RIGHT AND LOWER ONE EIGHTH BLOCK
  '\u{1FB80}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 1 }, { x: 0, y: 7, w: 8, h: 1 }] }, // UPPER AND LOWER ONE EIGHTH BLOCK

  // Window title bar (1FB81-1FB81)
  '\u{1FB81}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 1 }, { x: 0, y: 2, w: 8, h: 1 }, { x: 0, y: 4, w: 8, h: 1 }, { x: 0, y: 7, w: 8, h: 1 }] }, // HORIZONTAL ONE EIGHTH BLOCK-1358

  // Block elements (1FB82-1FB8B)
  '\u{1FB82}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 2 }] }, // UPPER ONE QUARTER BLOCK
  '\u{1FB83}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 3 }] }, // UPPER THREE EIGHTHS BLOCK
  '\u{1FB84}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 5 }] }, // UPPER FIVE EIGHTHS BLOCK
  '\u{1FB85}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 6 }] }, // UPPER THREE QUARTERS BLOCK
  '\u{1FB86}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 7 }] }, // UPPER SEVEN EIGHTHS BLOCK
  '\u{1FB87}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 6, y: 0, w: 2, h: 8 }] }, // RIGHT ONE QUARTER BLOCK
  '\u{1FB88}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 5, y: 0, w: 3, h: 8 }] }, // RIGHT THREE EIGHTHS B0OCK
  '\u{1FB89}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 3, y: 0, w: 5, h: 8 }] }, // RIGHT FIVE EIGHTHS BL0CK
  '\u{1FB8A}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 2, y: 0, w: 6, h: 8 }] }, // RIGHT THREE QUARTERS 0LOCK
  '\u{1FB8B}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 1, y: 0, w: 7, h: 8 }] }, // RIGHT SEVEN EIGHTHS B0OCK

  // Rectangular shade characters (1FB8C-1FB94)
  '\u{1FB8C}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // LEFT HALF MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0 L0.5,0 L0.5,1 L0,1 Z' },
  '\u{1FB8D}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [  // RIGHT HALF MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0.5,0 L1,0 L1,1 L0.5,1 Z' },
  '\u{1FB8E}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [  // UPPER HALF MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0 L1,0 L1,0.5 L0,0.5 Z' },
  '\u{1FB8F}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [  // LOWER HALF MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0.5 L1,0.5 L1,1 L0,1 Z' },
  '\u{1FB90}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [  // INVERSE MEDIUM SHADE
    [0, 1],
    [1, 0]
  ] },
  '\u{1FB91}': [ // UPPER HALF BLOCK AND LOWER HALF INVERSE MEDIUM SHADE
    { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [
      [0, 1],
      [1, 0]
    ], clipPath: 'M0,0.5 L1,0.5 L1,1 L0,1 Z' },
    { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 0, w: 8, h: 4 }] }
  ],
  '\u{1FB92}': [ // UPPER HALF INVERSE MEDIUM SHADE AND LOWER HALF BLOCK
    { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [
      [0, 1],
      [1, 0]
    ], clipPath: 'M0,0 L1,0 L1,0.5 L0,0.5 Z' },
    { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 4, w: 8, h: 4 }] }
  ],
  // 1FB93 is <reserved>
  '\u{1FB94}': [ // LEFT HALF INVERSE MEDIUM SHADE AND RIGHT HALF BLOCK
    { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [
      [0, 1],
      [1, 0]
    ], clipPath: 'M0,0 L0.5,0 L0.5,1 L0,1 Z' },
    { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 0, w: 4, h: 8 }] }
  ],

  // Fill characters (1FB95-1FB97)
  '\u{1FB95}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [ // CHECKER BOARD FILL
    { x: 0, y: 0, w: 2, h: 2 }, { x: 4, y: 0, w: 2, h: 2 },
    { x: 2, y: 2, w: 2, h: 2 }, { x: 6, y: 2, w: 2, h: 2 },
    { x: 0, y: 4, w: 2, h: 2 }, { x: 4, y: 4, w: 2, h: 2 },
    { x: 2, y: 6, w: 2, h: 2 }, { x: 6, y: 6, w: 2, h: 2 }
  ] },
  '\u{1FB96}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [ // INVERSE CHECKER BOARD FILL
    { x: 2, y: 0, w: 2, h: 2 }, { x: 6, y: 0, w: 2, h: 2 },
    { x: 0, y: 2, w: 2, h: 2 }, { x: 4, y: 2, w: 2, h: 2 },
    { x: 2, y: 4, w: 2, h: 2 }, { x: 6, y: 4, w: 2, h: 2 },
    { x: 0, y: 6, w: 2, h: 2 }, { x: 4, y: 6, w: 2, h: 2 }
  ] },
  '\u{1FB97}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [ // HEAVY HORIZONTAL FILL (upper middle and lower one quarter block)
    { x: 0, y: 2, w: 8, h: 2 }, { x: 0, y: 6, w: 8, h: 2 }
  ] },

  // Diagonal fill characters (1FB98-1FB99)
  '\u{1FB98}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L1,1 M0,.25 L.75,1 M0,.5 L.5,1 M0,.75 L.25,1 M.25,0 L1,.75 M.5,0 L1,.5 M.75,0 L1,.25', strokeWidth: 1 }, // UPPER LEFT TO LOWER RIGHT FILL
  '\u{1FB99}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.25 L.25,0 M0,.5 L.5,0 M0,.75 L.75,0 M0,1 L1,0 M.25,1 L1,.25 M.5,1 L1,.5 M.75,1 L1,.75', strokeWidth: 1 }, // UPPER RIGHT TO LOWER LEFT FILL

  // Smooth mosaic terminal graphic characters (1FB9A-1FB9B)
  '\u{1FB9A}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L.5,.5 L0,1 L1,1 L.5,.5 L1,0', type: CustomGlyphVectorType.FILL } }, // UPPER AND LOWER TRIANGULAR HALF BLOCK
  '\u{1FB9B}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L.5,.5 L1,0 L1,1 L.5,.5 L0,1', type: CustomGlyphVectorType.FILL } }, // LEFT AND RIGHT TRIANGULAR HALF BLOCK

  // Triangular shade characters (1FB9C-1FB9F)
  '\u{1FB9C}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // UPPER LEFT TRIANGULAR MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0 L1,0 L0,1 Z' },
  '\u{1FB9D}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // UPPER RIGHT TRIANGULAR MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0 L1,0 L1,1 Z' },
  '\u{1FB9E}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // LOWER RIGHT TRIANGULAR MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M1,0 L1,1 L0,1 Z' },
  '\u{1FB9F}': { type: CustomGlyphDefinitionType.BLOCK_PATTERN, data: [ // LOWER LEFT TRIANGULAR MEDIUM SHADE
    [1, 0],
    [0, 1]
  ], clipPath: 'M0,0 L1,1 L0,1 Z' },

  // Character cell diagonals (1FBA0-1FBAE)
  '\u{1FBA0}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L0,.5', strokeWidth: 1 },               // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE LEFT
  '\u{1FBA1}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,.5', strokeWidth: 1 },               // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE RIGHT
  '\u{1FBA2}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L.5,1', strokeWidth: 1 },               // BOX DRAWINGS LIGHT DIAGONAL MIDDLE LEFT TO LOWER CENTRE
  '\u{1FBA3}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,.5 L.5,1', strokeWidth: 1 },               // BOX DRAWINGS LIGHT DIAGONAL MIDDLE RIGHT TO LOWER CENTRE
  '\u{1FBA4}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L0,.5 L.5,1', strokeWidth: 1 },         // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE LEFT TO LOWER CENTRE
  '\u{1FBA5}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,.5 L.5,1', strokeWidth: 1 },         // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE RIGHT TO LOWER CENTRE
  '\u{1FBA6}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L.5,1 L1,.5', strokeWidth: 1 },         // BOX DRAWINGS LIGHT DIAGONAL MIDDLE LEFT TO LOWER CENTRE TO MIDDLE RIGHT
  '\u{1FBA7}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L.5,0 L1,.5', strokeWidth: 1 },         // BOX DRAWINGS LIGHT DIAGONAL MIDDLE LEFT TO UPPER CENTRE TO MIDDLE RIGHT
  '\u{1FBA8}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L0,.5 M1,.5 L.5,1', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE LEFT AND MIDDLE RIGHT TO LOWER CENTRE
  '\u{1FBA9}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,.5 M0,.5 L.5,1', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE RIGHT AND MIDDLE LEFT TO LOWER CENTRE
  '\u{1FBAA}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,.5 L.5,1 L0,.5', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE RIGHT TO LOWER CENTRE TO MIDDLE LEFT
  '\u{1FBAB}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L0,.5 L.5,1 L1,.5', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO MIDDLE LEFT TO LOWER CENTRE TO MIDDLE RIGHT
  '\u{1FBAC}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L.5,0 L1,.5 L.5,1', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL MIDDLE LEFT TO UPPER CENTRE TO MIDDLE RIGHT TO LOWER CENTRE
  '\u{1FBAD}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,.5 L.5,0 L0,.5 L.5,1', strokeWidth: 1 },   // BOX DRAWINGS LIGHT DIAGONAL MIDDLE RIGHT TO UPPER CENTRE TO MIDDLE LEFT TO LOWER CENTRE
  '\u{1FBAE}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,.5 L.5,1 L0,.5 Z', strokeWidth: 1 }, // BOX DRAWINGS LIGHT DIAGONAL DIAMOND

  // Light solid line with stroke (1FBAF-1FBAF)
  '\u{1FBAF}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: `${Shapes.LEFT_TO_RIGHT} M.5,.35 L.5,.65`, strokeWidth: 1 }, // BOX DRAWINGS LIGHT HORIZONTAL WITH VERTICAL STROKE

  // Terminal graphic characters (1FBB0-1FBB3)
  '\u{1FBB0}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'ABozARrMAWaZAeaZCA==', scaleType: CustomGlyphScaleType.CHAR },                                           // ARROWHEAD-SHAPED POINTER
  '\u{1FBB1}': { type: CustomGlyphDefinitionType.PATH_NEGATIVE, data: { d: 'M.1,.525 L.35,.675 L.9,.35', type: CustomGlyphVectorType.STROKE }, scaleType: CustomGlyphScaleType.CHAR }, // INVERSE CHECK MARK
  '\u{1FBB2}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AEpFASGPATiWAVlZAatZAZGRAbXCATjCAWv/AYf6AW7bAebbAbWZAf+ZAf+FAdSFAetcAf9cAf9FAPwhBx8fAP//vyEHHx8A///8IQ==' }, // LEFT HALF RUNNING MAN
  '\u{1FBB3}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AABFAU1FAYwfAaEuAVRcAQBcAACFAVSFAZbjAbrjAbr6AYf6AUeZAQCZ' },                                                                                                      // RIGHT HALF RUNNING MAN

  // Arrows (1FBB4-1FBB8)
  // TODO: Improve all arrows, use hybrid approach
  '\u{1FBB4}': { type: CustomGlyphDefinitionType.PATH_NEGATIVE, data: { d: 'M.15,.55 L.5,.4 L.5,.45 L.65,.45 L.65,.35 L.85,.35 L.85,.625 L.5,.625 L.5,.7 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR },                                        // INVERSE DOWNWARDS ARROW WITH TIP LEFTWARDS
  '\u{1FBB5}': [ // LEFTWARDS ARROW AND UPPER AND LOWER ONE EIGHTH BLOCK
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L1,0 L1,.0625 L0,.0625 Z M0,.9375 L1,.9375 L1,1 L0,1 Z', type: CustomGlyphVectorType.FILL } },
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.15,.5 L.5,.35 L.5,.425 L.85,.425 L.85,.575 L.5,.575 L.5,.65 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }
  ],
  '\u{1FBB6}': [ // RIGHTWARDS ARROW AND UPPER AND LOWER ONE EIGHTH BLOCK
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L1,0 L1,.0625 L0,.0625 Z M0,.9375 L1,.9375 L1,1 L0,1 Z', type: CustomGlyphVectorType.FILL } },
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.85,.5 L.5,.35 L.5,.425 L.15,.425 L.15,.575 L.5,.575 L.5,.65 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }
  ],
  '\u{1FBB7}': [ // DOWNWARDS ARROW AND RIGHT ONE EIGHTH BLOCK
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.875,0 L1,0 L1,1 L.875,1 Z', type: CustomGlyphVectorType.FILL } },
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.5,.675 L.2,.5 L.35,.5 L.35,.325 L.65,.325 L.65,.5 L.8,.5 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }
  ],
  '\u{1FBB8}': [ // UPWARDS ARROW AND RIGHT ONE EIGHTH BLOCK
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.875,0 L1,0 L1,1 L.875,1 Z', type: CustomGlyphVectorType.FILL } },
    { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.5,.325 L.2,.5 L.35,.5 L.35,.675 L.65,.675 L.65,.5 L.8,.5 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }
  ],

  // Terminal graphic characters (1FBB9-1FBBC)
  '\u{1FBB9}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,.89 L.11,.89 L.11,.37 L.36,.12 L.74,.12 L.96,.34 L1,.34 L1,.405 L.92,.405 L.69,.185 L.41,.185 L.21,.42 L.21,.825 L1,.825 Z', type: CustomGlyphVectorType.FILL } }, // LEFT HALF FOLDER
  '\u{1FBBA}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,.89 L0,.825 L.78,.825 L.78,.53 L.7,.415 L0,.415 L0,.35 L.75,.35 L.88,.48 L.88,.89 Z', type: CustomGlyphVectorType.FILL } }, // RIGHT HALF FOLDER
  '\u{1FBBB}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.31,.275 L.44,.275 L.44,.47 L.05,.47 L.05,.405 L.31,.405 Z M.56,.275 L.69,.275 L.69,.405 L.95,.405 L.95,.47 L.56,.47 Z M.05,.53 L.44,.53 L.44,.725 L.31,.725 L.31,.595 L.05,.595 Z M.56,.53 L.95,.53 L.95,.595 L.69,.595 L.69,.725 L.56,.725 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // VOIDED GREEK CROSS
  '\u{1FBBC}': [ // RIGHT OPEN SQUARED DOT
    { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAf8AAf//AQD/AQDuAeLuAeIRAQARCA==' },
    { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AKuABysWAP//VIAHKxYA//+rgA==', scaleType: CustomGlyphScaleType.CHAR }
  ],

  // Negative terminal graphic characters (1FBBD-1FBBF)
  '\u{1FBBD}': { type: CustomGlyphDefinitionType.PATH_NEGATIVE, data: { d: 'M0,0 L.5,.5 L1,0 L1,1 L.5,.5 L0,1 Z', type: CustomGlyphVectorType.STROKE } }, // NEGATIVE DIAGONAL CROSS
  '\u{1FBBE}': { type: CustomGlyphDefinitionType.PATH_NEGATIVE, data: { d: 'M1,.5 L.5,1', type: CustomGlyphVectorType.STROKE } },                         // NEGATIVE DIAGONAL MIDDLE RIGHT TO LOWER CENTRE
  '\u{1FBBF}': { type: CustomGlyphDefinitionType.PATH_NEGATIVE, data: { d: 'M.5,0 L1,.5 L.5,1 L0,.5 Z', type: CustomGlyphVectorType.STROKE } },           // NEGATIVE DIAGONAL DIAMOND

  // Terminal graphic characters (1FBC0-1FBCA)
  '\u{1FBC0}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AClxBwUDAAD/Y1QBgGABnFQHBQMAAP/WcQG/gAHWjgcFAwAA/5yrAYCfAWOrBwUDAAD/KY4BQIAIAD1pAWOAAT2WAVKhAYCOAa2hAcKWAZyAAcJpAa1eAYBxAVJeCA==', scaleType: CustomGlyphScaleType.CHAR }, // WHITE HEAVY SALTIRE WITH ROUNDED CORNERS
  // 1FBC1-1FBC4 is dervied from the Iosevka font (SIL OFL v1.1) https://github.com/be5invis/Iosevka
  '\u{1FBC1}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'ACTsBSHsH+sGGuoGF+cGFuQDBgUWBRcDBhoBBh8ABiQABSYAKAAGLAABbhYFcw9+CgaWAwaxAAbMAAL/Aw4CzAXFDr0OBq8PBqERBpQVBosbBociA6UChwWYpKijBsidBuSUBv+HA58F7qThqAbErwamswaHtAPJBYfNi9AGlNYGodkGr9sGvdwGzN0C/wPsAswFvuyx6waW5wZ+4AZu1QEs6wUq6yjrBiTsCAAz1gFqxAMmATMUA9YIAP+yBfix97AG9q0F9qv3qgb/qAOyCA==' }, // LEFT THIRD WHITE RIGHT POINTING INDEX
  '\u{1FBC2}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AACfA4cFC4MQfQYYcgYcZgYdWgNaBR1YHlcGIVQGJlMGLFICgAWIUpBRBp1NBqZHBqk+Az0FqTioMgajJwaaHQaMFQZ5EAZkDgIAAwAC/wMOAqoFsRK2Fwa+IQbDKwbGNgL/A1EF+E70TAbrSAbgRgbURQLFBcRMvlEGrlsGmGAGgGECOgU5ajZyBiyDBhySBgCfCACc7AIAA90CnAWk3azbBrrXBsLRBsXJA8gFxcTCwAa6uQastQactAIPBQy0CbQGALEDpwUHpQmlBg+kArgFwKTIowbWnwbfmAbikAOQBeKM34gG1oEGyH0GuHwCZAVhfF57Blp6Bld3BlV0BldxBlpvBl5tBmRtAtQF2m3gbAbragb0Zgb/YQN3Bfl49ngG8noF9Xv3fQb/gQOeBfal7KoG1rEF3bXguwbkyAPJBeTQ4NcG0eMGueoGnOwI' }, // MIDDLE THIRD WHITE RIGHT POINTING INDEX
  '\u{1FBC3}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAB5A2IFBmAHXgYIWgNZBQhXB1UGAFEDNgKmBa82tjUGxDEGzSoG0CIDIgXQHs0aBsQTBrYPBqYOAgADAAKmBbQAwgEG2wgG6RQG7iIDIgXuKukxBts8BsJDBqZFAhwFIkokTwYmWQNaBSZeJGMGHmwGFHMGAHkIAACfA4MFCIYIigYJkQORBQmVCJgGAJ8I' }, // RIGHT THIRD WHITE RIGHT POINTING INDEX
  '\u{1FBC4}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAX/AwAC+gP/AgUIAHKGAo0FjYKPfgaXdwahcAaqaQawYgayWQWyVK5PBqRHBpNCBn9BBmtCBltHBlBQBk1aA1sCaANaBWhYalUGblEGdk4Gf04FhE6ITgaQUQaVVQaWWQWWXZJhBoloBn9vBnd2BnN+BnKGCACAqgWEqompBpGnBpaiBpidBpaYBpGUBomSBoCRBnaSBm6UBmmYBmedBmmiBm6nBnapBoCqCA==', scaleType: CustomGlyphScaleType.CHAR }, // NEGATIVE SQUARED QUESTION MARK
  '\u{1FBC5}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.44,.425 L.44,.51 L.44,.56 L.19,.685 L.26,.72 L.5,.605 L.74,.72 L.81,.685 L.56,.56 L.56,.51 L.56,.425 Z M.17,.46 L.17,.51 L.83,.51 L.83,.46 Z M.67,.35 C.67,.303,.594,.265,.5,.265 C.406,.265,.33,.303,.33,.35 C.33,.397,.406,.435,.5,.435 C.594,.435,.67,.397,.67,.35 Z M.56,.35 C.56,.3665,.533,.38,.5,.38 C.467,.38,.44,.3665,.44,.35 C.44,.3335,.467,.32,.5,.32 C.533,.32,.56,.3335,.56,.35 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // STICK FIGURE
  '\u{1FBC6}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.44,.425 L.44,.46 L.23,.385 L.19,.43 L.44,.51 L.44,.56 L.29,.71 L.38,.735 L.5,.605 L.61,.735 L.7,.71 L.56,.56 L.56,.51 L.81,.43 L.77,.385 L.56,.46 L.56,.425 Z M.67,.35 C.67,.303,.594,.265,.5,.265 C.406,.265,.33,.303,.33,.35 C.33,.397,.406,.435,.5,.435 C.594,.435,.67,.397,.67,.35 Z M.56,.35 C.56,.3665,.533,.38,.5,.38 C.467,.38,.44,.3665,.44,.35 C.44,.3335,.467,.32,.5,.32 C.533,.32,.56,.3335,.56,.35 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // STICK FIGURE WITH ARMS RAISED
  '\u{1FBC7}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.44,.425 L.44,.56 L.29,.71 L.38,.735 L.5,.605 L.74,.72 L.81,.685 L.56,.56 L.56,.425 Z M.18,.53 L.23,.575 L.81,.43 L.77,.385 Z M.67,.35 C.67,.303,.594,.265,.5,.265 C.406,.265,.33,.303,.33,.35 C.33,.397,.406,.435,.5,.435 C.594,.435,.67,.397,.67,.35 Z M.56,.35 C.56,.3665,.533,.38,.5,.38 C.467,.38,.44,.3665,.44,.35 C.44,.3335,.467,.32,.5,.32 C.533,.32,.56,.3335,.56,.35 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // STICK FIGURE LEANING LEFT
  '\u{1FBC8}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.44,.425 L.44,.56 L.19,.685 L.26,.72 L.5,.605 L.62,.735 L.71,.71 L.56,.56 L.56,.425 Z M.23,.385 L.18,.43 L.77,.575 L.81,.53 Z M.67,.35 C.67,.303,.594,.265,.5,.265 C.406,.265,.33,.303,.33,.35 C.33,.397,.406,.435,.5,.435 C.594,.435,.67,.397,.67,.35 Z M.56,.35 C.56,.3665,.533,.38,.5,.38 C.467,.38,.44,.3665,.44,.35 C.44,.3335,.467,.32,.5,.32 C.533,.32,.56,.3335,.56,.35 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // STICK FIGURE LEANING RIGHT
  '\u{1FBC9}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.44,.425 L.45,.495 L.15,.645 L.34,.645 L.34,.7 L.44,.7 L.44,.645 L.56,.645 L.56,.7 L.66,.7 L.66,.645 L.84,.645 L.54,.495 L.56,.425 Z M.39,.6 L.5,.55 L.60,.6 Z M.17,.46 L.17,.51 L.83,.51 L.83,.46 Z M.67,.35 C.67,.303,.594,.265,.5,.265 C.406,.265,.33,.303,.33,.35 C.33,.397,.406,.435,.5,.435 C.594,.435,.67,.397,.67,.35 Z M.56,.35 C.56,.3665,.533,.38,.5,.38 C.467,.38,.44,.3665,.44,.35 C.44,.3335,.467,.32,.5,.32 C.533,.32,.56,.3335,.56,.35 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // STICK FIGURE WITH DRESS
  '\u{1FBCA}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.26,.375 L.5,.255 L.74,.375 L.74,.665 L.5,.55 L.26,.665 Z M.37,.395 L.37,.54 L.5,.475 L.63,.54 L.63,.395 L.5,.33 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // WHITE UP-POINTING CHEVRON

  // Terminal graphic characters (1FBCB-1FBCD)
  '\u{1FBCB}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.09,.41 L.32,.295 L.5,.375 L.68,.295 L.91,.41 L.75,.5 L.91,.59 L.68,.705 L.5,.625 L.32,.705 L.09,.59 L.25,.5 Z M.24,.41 L.39,.5 L.24,.59 L.32,.63 L.5,.555 L.68,.63 L.76,.59 L.61,.5 L.76,.41 L.68,.37 L.5,.445 L.32,.37 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // WHITE CROSS MARK
  '\u{1FBCC}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.55,.305 L.88,.305 L.88,.355 L.65,.355 L.65,.47 L.88,.47 L.88,.52 L.55,.52 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // RAISED SMALL LEFT SQUARE BRACKET
  '\u{1FBCD}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.38,.39 L.5,.33 L.62,.39 L.62,.53 L.5,.47 L.38,.53 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // BLACK SMALL UP-POINTING CHEVRON

  // Block elements (1FBCE-1FBCF)
  '\u{1FBCE}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAaoAAar/AQD/CA==' }, // LEFT TWO THIRDS BLOCK
  '\u{1FBCF}': { type: CustomGlyphDefinitionType.PATH_BINARY, data: 'AAAAAVUAAVX/AQD/CA==' }, // LEFT ONE THIRD BLOCK

  // Character cell diagonals (1FBD0-1FBDF)
  '\u{1FBD0}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,.5 L0,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL MIDDLE RIGHT TO LOWER LEFT
  '\u{1FBD1}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L0,.5', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO MIDDLE LEFT
  '\u{1FBD2}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L1,.5', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO MIDDLE RIGHT
  '\u{1FBD3}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,.5 L1,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL MIDDLE LEFT TO LOWER RIGHT
  '\u{1FBD4}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L.5,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO LOWER CENTRE
  '\u{1FBD5}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L1,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO LOWER RIGHT
  '\u{1FBD6}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L.5,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO LOWER CENTRE
  '\u{1FBD7}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M.5,0 L0,1', strokeWidth: 1 },       // BOX DRAWINGS LIGHT DIAGONAL UPPER CENTRE TO LOWER LEFT
  '\u{1FBD8}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L.5,.5 L1,0', strokeWidth: 1 }, // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO MIDDLE CENTRE TO UPPER RIGHT
  '\u{1FBD9}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L.5,.5 L1,1', strokeWidth: 1 }, // BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO MIDDLE CENTRE TO LOWER RIGHT
  '\u{1FBDA}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,1 L.5,.5 L1,1', strokeWidth: 1 }, // BOX DRAWINGS LIGHT DIAGONAL LOWER LEFT TO MIDDLE CENTRE TO LOWER RIGHT
  '\u{1FBDB}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L.5,.5 L0,1', strokeWidth: 1 }, // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO MIDDLE CENTRE TO LOWER LEFT
  '\u{1FBDC}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L.5,1 L1,0', strokeWidth: 1 },  // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO LOWER CENTRE TO UPPER RIGHT
  '\u{1FBDD}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M1,0 L0,.5 L1,1', strokeWidth: 1 },  // BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO MIDDLE LEFT TO LOWER RIGHT
  '\u{1FBDE}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,1 L.5,0 L1,1', strokeWidth: 1 },  // BOX DRAWINGS LIGHT DIAGONAL LOWER LEFT TO UPPER CENTRE TO LOWER RIGHT
  '\u{1FBDF}': { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: 'M0,0 L1,.5 L0,1', strokeWidth: 1 },  // BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO MIDDLE RIGHT TO LOWER LEFT

  // Geometric shapes (1FBE0-1FBEF)
  '\u{1FBE0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 C0,.276,.224,.5,.5,.5 C.776,.5,1,.276,1,0', type: CustomGlyphVectorType.STROKE } }, // TOP JUSTIFIED LOWER HALF WHITE CIRCLE
  '\u{1FBE1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0 C.724,0,.5,.224,.5,.5 C.5,.776,.724,1,1,1', type: CustomGlyphVectorType.STROKE } }, // RIGHT JUSTIFIED LEFT HALF WHITE CIRCLE
  '\u{1FBE2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,1 C0,.724,.224,.5,.5,.5 C.776,.5,1,.724,1,1', type: CustomGlyphVectorType.STROKE } }, // BOTTOM JUSTIFIED UPPER HALF WHITE CIRCLE
  '\u{1FBE3}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 C.276,0,.5,.224,.5,.5 C.5,.776,.276,1,0,1', type: CustomGlyphVectorType.STROKE } }, // LEFT JUSTIFIED RIGHT HALF WHITE CIRCLE
  '\u{1FBE4}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 2, y: 0, w: 4, h: 4 }] },                                                   // UPPER CENTRE ONE QUARTER BLOCK
  '\u{1FBE5}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 2, y: 4, w: 4, h: 4 }] },                                                   // LOWER CENTRE ONE QUARTER BLOCK
  '\u{1FBE6}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 0, y: 2, w: 4, h: 4 }] },                                                   // MIDDLE LEFT ONE QUARTER BLOCK
  '\u{1FBE7}': { type: CustomGlyphDefinitionType.SOLID_OCTANT_BLOCK_VECTOR, data: [{ x: 4, y: 2, w: 4, h: 4 }] },                                                   // MIDDLE RIGHT ONE QUARTER BLOCK
  '\u{1FBE8}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 C0,.276,.224,.5,.5,.5 C.776,.5,1,.276,1,0 Z', type: CustomGlyphVectorType.FILL } }, // TOP JUSTIFIED LOWER HALF BLACK CIRCLE
  '\u{1FBE9}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0 C.724,0,.5,.224,.5,.5 C.5,.776,.724,1,1,1 Z', type: CustomGlyphVectorType.FILL } }, // RIGHT JUSTIFIED LEFT HALF BLACK CIRCLE
  '\u{1FBEA}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,1 C0,.724,.224,.5,.5,.5 C.776,.5,1,.724,1,1 Z', type: CustomGlyphVectorType.FILL } }, // BOTTOM JUSTIFIED UPPER HALF BLACK CIRCLE
  '\u{1FBEB}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 C.276,0,.5,.224,.5,.5 C.5,.776,.276,1,0,1 Z', type: CustomGlyphVectorType.FILL } }, // LEFT JUSTIFIED RIGHT HALF BLACK CIRCLE
  '\u{1FBEC}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,0 L.5,0 C.5,.276,.724,.5,1,.5 Z', type: CustomGlyphVectorType.FILL } },               // TOP RIGHT JUSTIFIED LOWER LEFT QUARTER BLACK CIRCLE
  '\u{1FBED}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,1 L.5,1 C.5,.724,.276,.5,0,.5 Z', type: CustomGlyphVectorType.FILL } },               // BOTTOM LEFT JUSTIFIED UPPER RIGHT QUARTER BLACK CIRCLE
  '\u{1FBEE}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M1,1 L1,.5 C.724,.5,.5,.724,.5,1 Z', type: CustomGlyphVectorType.FILL } },               // BOTTOM RIGHT JUSTIFIED UPPER LEFT QUARTER BLACK CIRCLE
  '\u{1FBEF}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M0,0 L0,.5 C.276,.5,.5,.276,.5,0 Z', type: CustomGlyphVectorType.FILL } },               // TOP LEFT JUSTIFIED LOWER RIGHT QUARTER BLACK CIRCLE

  // Segmented digits (1FBF0-1FBF9)
  '\u{1FBF0}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1111110), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT ZERO (abcdef)
  '\u{1FBF1}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b0110000), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT ONE (bc)
  '\u{1FBF2}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1101101), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT TWO (abdeg)
  '\u{1FBF3}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1111001), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT THREE (abcdg)
  '\u{1FBF4}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b0110011), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT FOUR (bcfg)
  '\u{1FBF5}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1011011), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT FIVE (acdfg)
  '\u{1FBF6}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1011111), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT SIX (acdefg)
  '\u{1FBF7}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1110010), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT SEVEN (abcf)
  '\u{1FBF8}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1111111), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT EIGHT (abcdefg)
  '\u{1FBF9}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: segmentedDigit(0b1111011), type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // SEGMENTED DIGIT NINE (abcdfg)

  // Terminal graphic character (1FBFA-1FBFA)
  '\u{1FBFA}': { type: CustomGlyphDefinitionType.VECTOR_SHAPE, data: { d: 'M.5,.175 C.2,.175,.15,.305,.15,.435 L.05,.63 L.35,.63 C.35,.682,.42,.76,.5,.76 C.58,.76,.65,.682,.65,.63 L.95,.63 L.85,.435 C.85,.305,.8,.175,.5,.175 Z', type: CustomGlyphVectorType.FILL }, scaleType: CustomGlyphScaleType.CHAR }, // ALARM BELL SYMBOL

  // #endregion

  // #region Braille Patterns (2800-28FF)

  // https://www.unicode.org/charts/PDF/U2800.pdf

  // Braille patterns (2800-28FF)
  ...Object.fromEntries(
    Array.from({ length: 256 }, (_, i) => [
      String.fromCodePoint(0x2800 + i),
      { type: CustomGlyphDefinitionType.BRAILLE, data: i }
    ])
  ),

  // #endregion
};

/**
 * Generates a drawing function for sextant characters. Sextants are a 2x3 grid where each cell
 * can be on or off.
 * @param pattern A 6-bit pattern where bit 0 = top-left, bit 1 = top-right, bit 2 = middle-left,
 * bit 3 = middle-right, bit 4 = bottom-left, bit 5 = bottom-right
 */
function sextant(pattern: number): { type: CustomGlyphDefinitionType.PATH_FUNCTION, data: CustomGlyphPathDrawFunctionDefinition } {
  return {
    type: CustomGlyphDefinitionType.PATH_FUNCTION,
    data: () => {
      // Sextant grid: 2 columns, 3 rows
      // Row heights in 8ths: top=3, middle=2, bottom=3
      // Column widths: left=4, right=4
      const rects: string[] = [];
      const colW = 0.5; // Each column is half width
      const rowH = [3 / 8, 2 / 8, 3 / 8]; // Row heights as fractions
      const rowY = [0, 3 / 8, 5 / 8]; // Row Y positions

      for (let row = 0; row < 3; row++) {
        const leftBit = (pattern >> (row * 2)) & 1;
        const rightBit = (pattern >> (row * 2 + 1)) & 1;

        if (leftBit && rightBit) {
          // Full row
          rects.push(`M0,${rowY[row]} L1,${rowY[row]} L1,${rowY[row] + rowH[row]} L0,${rowY[row] + rowH[row]} Z`);
        } else if (leftBit) {
          rects.push(`M0,${rowY[row]} L${colW},${rowY[row]} L${colW},${rowY[row] + rowH[row]} L0,${rowY[row] + rowH[row]} Z`);
        } else if (rightBit) {
          rects.push(`M${colW},${rowY[row]} L1,${rowY[row]} L1,${rowY[row] + rowH[row]} L${colW},${rowY[row] + rowH[row]} Z`);
        }
      }
      return rects.join(' ');
    }
  };
}

/**
 * Generates SVG path data for a 7-segment display digit.
 *
 * Segment mapping (bit positions):
 *
 * - bit 6: a (top)
 * - bit 5: b (upper right)
 * - bit 4: c (lower right)
 * - bit 3: d (bottom)
 * - bit 2: e (lower left)
 * - bit 1: f (upper left)
 * - bit 0: g (middle)
 *
 * ```
 *   ─a─
 *  │   │
 *  f   b
 *   ─g─
 *  e   c
 *  │   │
 *   ─d─
 * ```
 */
function segmentedDigit(pattern: number): string {
  const paths: string[] = [];

  // Each segment should have approximately the same stroke width, this is somewhat difficult to be
  // precise since coordinates are 0-1 of the whole cell (percentage-based). To handle this, the
  // fact that terminal cells are typically sized at ~2:1 (height:width) is leveraged.
  // for horizontal vs vertical to make segments appear the same thickness
  const segW = 0.15;  // Width of vertical segments (fraction of cell width)
  const segH = 0.075; // Height of horizontal segments (fraction of cell height, ~half of segW for 2:1 cells)
  const padX = 0.05;  // Horizontal padding from edge
  const padY = 0.175; // Vertical padding from edge (35% total = 65% height)
  const gap = 0.015;  // Gap between segments
  const taperX = segW / 2; // Horizontal taper for vertical segments
  const taperY = segH / 2; // Vertical taper for horizontal segments

  const left = padX;
  const right = 1 - padX;
  const top = padY;
  const bottom = 1 - padY;
  const midY = 0.5;

  // Segment a (top horizontal) - hexagonal with pointed left/right ends
  if (pattern & 0b1000000) {
    const y1 = top;
    const y2 = top + segH / 2;
    const y3 = top + segH;
    const x1 = left + segW + gap;
    const x2 = right - segW - gap;
    paths.push(`M${x1},${y2} L${x1 + taperX},${y1} L${x2 - taperX},${y1} L${x2},${y2} L${x2 - taperX},${y3} L${x1 + taperX},${y3} Z`);
  }
  // Segment b (upper right vertical) - hexagonal with pointed top/bottom ends
  if (pattern & 0b0100000) {
    const x1 = right - segW;
    const x2 = right - segW / 2;
    const x3 = right;
    const y1 = top + segH + gap;
    const y2 = midY - gap;
    paths.push(`M${x2},${y1} L${x3},${y1 + taperY} L${x3},${y2 - taperY} L${x2},${y2} L${x1},${y2 - taperY} L${x1},${y1 + taperY} Z`);
  }
  // Segment c (lower right vertical) - hexagonal with pointed top/bottom ends
  if (pattern & 0b0010000) {
    const x1 = right - segW;
    const x2 = right - segW / 2;
    const x3 = right;
    const y1 = midY + gap;
    const y2 = bottom - segH - gap;
    paths.push(`M${x2},${y1} L${x3},${y1 + taperY} L${x3},${y2 - taperY} L${x2},${y2} L${x1},${y2 - taperY} L${x1},${y1 + taperY} Z`);
  }
  // Segment d (bottom horizontal) - hexagonal with pointed left/right ends
  if (pattern & 0b0001000) {
    const y1 = bottom - segH;
    const y2 = bottom - segH / 2;
    const y3 = bottom;
    const x1 = left + segW + gap;
    const x2 = right - segW - gap;
    paths.push(`M${x1},${y2} L${x1 + taperX},${y1} L${x2 - taperX},${y1} L${x2},${y2} L${x2 - taperX},${y3} L${x1 + taperX},${y3} Z`);
  }
  // Segment e (lower left vertical) - hexagonal with pointed top/bottom ends
  if (pattern & 0b0000100) {
    const x1 = left;
    const x2 = left + segW / 2;
    const x3 = left + segW;
    const y1 = midY + gap;
    const y2 = bottom - segH - gap;
    paths.push(`M${x2},${y1} L${x3},${y1 + taperY} L${x3},${y2 - taperY} L${x2},${y2} L${x1},${y2 - taperY} L${x1},${y1 + taperY} Z`);
  }
  // Segment f (upper left vertical) - hexagonal with pointed top/bottom ends
  if (pattern & 0b0000010) {
    const x1 = left;
    const x2 = left + segW / 2;
    const x3 = left + segW;
    const y1 = top + segH + gap;
    const y2 = midY - gap;
    paths.push(`M${x2},${y1} L${x3},${y1 + taperY} L${x3},${y2 - taperY} L${x2},${y2} L${x1},${y2 - taperY} L${x1},${y1 + taperY} Z`);
  }
  // Segment g (middle horizontal) - hexagonal with pointed left/right ends
  if (pattern & 0b0000001) {
    const y1 = midY - segH / 2;
    const y2 = midY;
    const y3 = midY + segH / 2;
    const x1 = left + segW + gap;
    const x2 = right - segW - gap;
    paths.push(`M${x1},${y2} L${x1 + taperX},${y1} L${x2 - taperX},${y1} L${x2},${y2} L${x2 - taperX},${y3} L${x1 + taperX},${y3} Z`);
  }

  return paths.join(' ');
}

const enum Shapes {
  /** │ */ TOP_TO_BOTTOM = 'M.5,0 L.5,1',
  /** ─ */ LEFT_TO_RIGHT = 'M0,.5 L1,.5',

  /** └ */ TOP_TO_RIGHT = 'M.5,0 L.5,.5 L1,.5',
  /** ┘ */ TOP_TO_LEFT = 'M.5,0 L.5,.5 L0,.5',
  /** ┐ */ LEFT_TO_BOTTOM = 'M0,.5 L.5,.5 L.5,1',
  /** ┌ */ RIGHT_TO_BOTTOM = 'M0.5,1 L.5,.5 L1,.5',

  /** ╵ */ MIDDLE_TO_TOP = 'M.5,.5 L.5,0',
  /** ╴ */ MIDDLE_TO_LEFT = 'M.5,.5 L0,.5',
  /** ╶ */ MIDDLE_TO_RIGHT = 'M.5,.5 L1,.5',
  /** ╷ */ MIDDLE_TO_BOTTOM = 'M.5,.5 L.5,1',

  /** ┴ */ T_TOP = 'M0,.5 L1,.5 M.5,.5 L.5,0',
  /** ┤ */ T_LEFT = 'M.5,0 L.5,1 M.5,.5 L0,.5',
  /** ├ */ T_RIGHT = 'M.5,0 L.5,1 M.5,.5 L1,.5',
  /** ┬ */ T_BOTTOM = 'M0,.5 L1,.5 M.5,.5 L.5,1',

  /** ┼ */ CROSS = 'M0,.5 L1,.5 M.5,0 L.5,1',

  /** ╌ */ TWO_DASHES_HORIZONTAL = 'M.1,.5 L.4,.5 M.6,.5 L.9,.5', // .2 empty, .3 filled
  /** ┄ */ THREE_DASHES_HORIZONTAL = 'M.0667,.5 L.2667,.5 M.4,.5 L.6,.5 M.7333,.5 L.9333,.5', // .1333 empty, .2 filled
  /** ┉ */ FOUR_DASHES_HORIZONTAL = 'M.05,.5 L.2,.5 M.3,.5 L.45,.5 M.55,.5 L.7,.5 M.8,.5 L.95,.5', // .1 empty, .15 filled
  /** ╎ */ TWO_DASHES_VERTICAL = 'M.5,.1 L.5,.4 M.5,.6 L.5,.9',
  /** ┆ */ THREE_DASHES_VERTICAL = 'M.5,.0667 L.5,.2667 M.5,.4 L.5,.6 M.5,.7333 L.5,.9333',
  /** ┊ */ FOUR_DASHES_VERTICAL = 'M.5,.05 L.5,.2 M.5,.3 L.5,.45 L.5,.55 M.5,.7 L.5,.95',
}
