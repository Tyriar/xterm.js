import { IEventEmitter, IListenerType } from './Interfaces';
export declare class EventEmitter implements IEventEmitter {
    private _events;
    constructor();
    on(type: string, listener: IListenerType): void;
    off(type: string, listener: IListenerType): void;
    removeAllListeners(type: string): void;
    once(type: string, listener: IListenerType): void;
    emit(type: string, ...args: any[]): void;
    listeners(type: string): IListenerType[];
    protected destroy(): void;
}
