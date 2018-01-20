import { IDisposable } from "../Interfaces";
export declare function addDisposableListener(node: Element | Window | Document, type: string, handler: (e: any) => void, useCapture?: boolean): IDisposable;
