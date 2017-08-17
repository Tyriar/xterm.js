export declare class DomElementObjectPool {
    private type;
    private static readonly OBJECT_ID_ATTRIBUTE;
    private static _objectCount;
    private _type;
    private _pool;
    private _inUse;
    constructor(type: string);
    acquire(): HTMLElement;
    release(element: HTMLElement): void;
    private _createNew();
    private _cleanElement(element);
}
