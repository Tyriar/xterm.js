export declare type ScreenDprListener = (newDevicePixelRatio?: number, oldDevicePixelRatio?: number) => void;
export declare class ScreenDprMonitor {
    private _currentDevicePixelRatio;
    private _outerListener;
    private _listener;
    private _resolutionMediaMatchList;
    setListener(listener: ScreenDprListener): void;
    private _updateDpr();
    clearListener(): void;
}
