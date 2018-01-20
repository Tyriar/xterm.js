import { IMouseZoneManager, IMouseZone } from './Interfaces';
import { ITerminal } from '../Interfaces';
export declare class MouseZoneManager implements IMouseZoneManager {
    private _terminal;
    private _zones;
    private _areZonesActive;
    private _mouseMoveListener;
    private _clickListener;
    private _tooltipTimeout;
    private _currentZone;
    private _lastHoverCoords;
    constructor(_terminal: ITerminal);
    add(zone: IMouseZone): void;
    clearAll(start?: number, end?: number): void;
    private _activate();
    private _deactivate();
    private _onMouseMove(e);
    private _onHover(e);
    private _onTooltip(e);
    private _onMouseDown(e);
    private _onClick(e);
    private _findZoneEventAt(e);
}
export declare class MouseZone implements IMouseZone {
    x1: number;
    x2: number;
    y: number;
    clickCallback: (e: MouseEvent) => any;
    hoverCallback: (e: MouseEvent) => any;
    tooltipCallback: (e: MouseEvent) => any;
    leaveCallback: () => void;
    constructor(x1: number, x2: number, y: number, clickCallback: (e: MouseEvent) => any, hoverCallback?: (e: MouseEvent) => any, tooltipCallback?: (e: MouseEvent) => any, leaveCallback?: () => void);
}
