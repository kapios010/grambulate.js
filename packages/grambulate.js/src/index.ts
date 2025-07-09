import { Vector2D } from "./vector2d.js";

interface GrambulationMap<Holder> {
    [key:number]: Holder
}

export class Grambulator {
  public limit: number;

  constructor(spiral_limit: number = 4000) {
    if (spiral_limit < 1)
      throw new RangeError("Spiral limit must be greater than 1");
    this.limit = spiral_limit;
  }

  public grambulatePlus(
    inputA: number,
    inputB: number,
    degree: number = 1
  ): number {
    // Truncate inputs
    inputA = Math.trunc(inputA);
    inputB = Math.trunc(inputB);
    degree = Math.trunc(degree);
    // Check if inputs are lower than degree
    if (inputA < degree || inputB < degree)
      throw new RangeError("Inputs must be lower than degree");
    // If both inputs are the same, the vector is [0,0] so the output is the same number
    if (inputA == inputB) return inputA;
    // Declaring variables
    let map: GrambulationMap<GrambulationMap<number>> = {};
    let groupCount: number = 1;
    let positionA: Vector2D | null = null;
    let positionB: Vector2D | null = null;
    let pointerPosition: Vector2D = new Vector2D(0, 0);
    let pointerValue: number = degree;
    // We know the position of the input if it equals the degree
    if (inputA == degree) positionA = new Vector2D(0, 0);
    if (inputB == degree) positionB = new Vector2D(0, 0);
    // Otherwise we search
    while(positionA == null || positionB == null) {
        let howToMove = groupCount%4
        switch(howToMove) {

        }
    }
    console.log(positionA.toString())
    console.log(positionB.toString())
    let vectorAB = new Vector2D(positionB.x - positionA.x, positionB.y - positionA.y)
    let positionC = new Vector2D(positionB.x + vectorAB.x, positionB.y +vectorAB.y)
    let valueC: number|null = null
    if(map[positionC.y] != undefined && map[positionC.y]![positionC.x] != undefined) {
        valueC = map[positionC.y]![positionC.x]!
    }
    else {
        while(valueC == null) {
            let isHalfRingTop = halfRing%2
            let multiplier = isHalfRingTop && 1 || -1
            if(map[pointerPosition.y] == undefined)
                map[pointerPosition.y] = {}
            map[pointerPosition.y]![pointerPosition.x] = pointerValue
            if(pointerPosition.x == positionC.x && pointerPosition.y == positionC.y) valueC = pointerValue
            if(halfRingMoves < halfRing) {
                pointerPosition.y += multiplier
            } else {
                pointerPosition.x -= multiplier
            }
            if(halfRing*2 >= this.limit) throw new Error(`Cannot finish grambulating. Reached spiral limit of ${this.limit}`)
            if(halfRingMoves == halfRing*2+1) {
                halfRing++
                halfRingMoves == 0
            }
            pointerValue++
            halfRingMoves++
        }
    }
    return valueC!
  }
}