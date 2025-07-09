export class Vector2D {
    public x: number
    public y: number

    constructor(x: number, y:number) {
        this.x = x
        this.y = y
    }

    public toString(): string {
        return `Vector2D [${this.x}, ${this.y}]`
    }
}