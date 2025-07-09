export class Vector2D {
  public x: number;
  public y: number;

  static calculateFromPoints(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(b.x - a.x, b.y - a.y)
  }

  static addVector(point: Vector2D, vector: Vector2D): Vector2D {
    return new Vector2D(point.x + vector.x, point.y + vector.y)
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `Vector2D [${this.x}, ${this.y}]`;
  }
}
