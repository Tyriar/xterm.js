/**
 * @license MIT
 */

/**
 * The type for individual character data within the buffer, in the format:
 * [char_attr, char_string, char_width]
 */
export type CharData = [number, string, number];

export type LineData = CharData[];

export type LinkMatcher = {
  id: number,
  regex: RegExp,
  handler: LinkMatcherHandler,
  matchIndex?: number,
  validationCallback?: LinkMatcherValidationCallback,
  priority?: number
};
export type LinkMatcherHandler = (event: MouseEvent, uri: string) => boolean | void;
export type LinkMatcherValidationCallback = (uri: string, element: HTMLElement, callback: (isValid: boolean) => void) => void;
