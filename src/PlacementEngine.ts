export class PlacementEngine {
    private x: number;
    private y: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    getPlacementCoordinates() {
        return { x:this.x, y:this.y };
    }
}