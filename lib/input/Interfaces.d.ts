export interface IMouseZoneManager {
    add(zone: IMouseZone): void;
    clearAll(start?: number, end?: number): void;
}
export interface IMouseZone {
    x1: number;
    x2: number;
    y: number;
    clickCallback: (e: MouseEvent) => any;
    hoverCallback?: (e: MouseEvent) => any;
    tooltipCallback?: (e: MouseEvent) => any;
    leaveCallback?: () => any;
}
