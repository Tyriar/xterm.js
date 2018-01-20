export declare class GridCache<T> {
    cache: T[][];
    constructor();
    resize(width: number, height: number): void;
    clear(): void;
}
