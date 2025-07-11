import { Vector2D } from "./vector2d.js";
import { isEqual } from "lodash";

export function getRingFromNumber(
  input: number,
  onPlusBoard: boolean,
  degree: number = onPlusBoard ? 1 : -1
): number {
  input = Math.trunc(input);
  degree = Math.trunc(degree);
  if(onPlusBoard) {
    if (input < degree)
      throw new RangeError("Inputs cannot be lower than degree on positive board.");
  } else {
    if (input > degree)
      throw new RangeError("Inputs cannot be higher than degree on negative board.");
  }
  if (input == degree) return 0;
  let result: number;
  let multiplier = onPlusBoard ? 1 : -1;
  // Equation courtesy of @DDMPlayer
  result =
    Math.floor(
      (Math.sqrt(
        Math.floor((multiplier*input - (multiplier*degree - 1) - 2) / 8) * 8 + 1
      ) -
        1) /
        2
    ) + 1;
  return result;
}

export function getRingFromPosition(
  input: Vector2D
): number {
  return Math.max(Math.abs(input.x), Math.abs(input.y))
}

export function getPositionOfNumber(
  input: number,
  onPlusBoard: boolean,
  degree: number = (onPlusBoard && 1) || -1
): Vector2D {
  //Truncate inputs
  input = Math.trunc(input);
  degree = Math.trunc(degree);
  const multiplier = (onPlusBoard && 1) || -1;
  if(onPlusBoard) {
    if (input < degree)
      throw new RangeError("Inputs cannot be lower than degree on positive board.");
  } else {
    if (input > degree)
      throw new RangeError("Inputs cannot be higher than degree on negative board.");
  }
  if (input == degree) return new Vector2D(0, 0);
  let pointerValue = degree;
  let pointerPosition = new Vector2D(0, 0);
  let ring = getRingFromNumber(input, onPlusBoard, degree);
  pointerPosition.moveTo(-ring, ring);
  pointerValue = (multiplier*degree + 4 * Math.pow(ring, 2)) * multiplier;
  if (input == pointerValue) return pointerPosition;
  // LEFT AND TOP
  // Left Side of ring
  while (pointerPosition.y > -ring) {
    pointerPosition.y--;
    pointerValue += multiplier;
    if (input == pointerValue) return pointerPosition;
  }
  // Reset to initial position
  pointerPosition.moveTo(-ring, ring);
  pointerValue = (multiplier*degree + 4 * Math.pow(ring, 2)) * multiplier;
  // Top Side of ring
  while (pointerPosition.x < ring) {
    pointerPosition.x++;
    pointerValue -= multiplier;
    if (input == pointerValue) return pointerPosition;
  }
  // Right side of ring
  while (pointerPosition.y > -ring + 1) {
    pointerPosition.y--;
    pointerValue -= multiplier;
    if (input == pointerValue) return pointerPosition;
  }
  // BOTTOM
  // Set up position
  pointerPosition.moveTo(ring, -ring);
  pointerValue = (multiplier*degree - 1 + Math.pow(2 * ring + 1, 2)) * multiplier;
  if (input == pointerValue) return pointerPosition;
  // Bottom side of ring
  while (pointerPosition.x > -ring) {
    pointerPosition.x--;
    pointerValue -= multiplier;
    if (input == pointerValue) return pointerPosition;
  }
  throw new Error(
    `An error in ring calculation has occured. Please report this.`
  );
}

  export function grambulatePlus(
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
      throw new RangeError("Inputs cannot be lower than degree");
    // If both inputs are the same, the vector is [0,0] so the output is the same number
    if (inputA == inputB) return inputA;
    // Declaring variables
    let positionA: Vector2D = getPositionOfNumber(inputA, true, degree);
    let positionB: Vector2D = getPositionOfNumber(inputB, true, degree);
    let vectorAB: Vector2D = Vector2D.calculateFromPoints(
      positionA,
      positionB
    );
    let positionC = Vector2D.addVector(positionB, vectorAB)
    if (isEqual(positionC, new Vector2D(0, 0))) return degree;
    let ring = getRingFromPosition(positionC);
    let pointerValue = degree;
    let pointerPosition = new Vector2D(0, 0);
      pointerPosition.moveTo(-ring, ring);
      pointerValue = (degree + 4 * Math.pow(ring, 2));
      if (isEqual(positionC, pointerPosition)) return pointerValue;
      // LEFT AND TOP
      // Left Side of ring
      while (pointerPosition.y > -ring) {
        pointerPosition.y--;
        pointerValue ++;
        if (isEqual(positionC, pointerPosition)) return pointerValue;
      }
      // Reset to initial position
      pointerPosition.moveTo(-ring, ring);
      pointerValue = (degree + 4 * Math.pow(ring, 2));
      // Top Side of ring
      while (pointerPosition.x < ring) {
        pointerPosition.x++;
        pointerValue--;
        if (isEqual(positionC, pointerPosition)) return pointerValue;
      }
      // Right side of ring
      while (pointerPosition.y > -ring + 1) {
        pointerPosition.y--;
        pointerValue--;
        if (isEqual(positionC, pointerPosition)) return pointerValue;
      }
      // BOTTOM
      // Set up position
      pointerPosition.moveTo(ring, -ring);
      pointerValue = (degree - 1 + Math.pow(2 * ring + 1, 2));
      if (isEqual(positionC, pointerPosition)) return pointerValue;
      // Bottom side of ring
      while (pointerPosition.x > -ring) {
        pointerPosition.x--;
        pointerValue--;
        if (isEqual(positionC, pointerPosition)) return pointerValue;
      }
      ring++
      throw new Error('Failed to calculate.')
  }

  export function grambulateMinus(
    inputA: number,
    inputB: number,
    degree: number = -1
  ): number {
    try {
      return -grambulatePlus(-inputA, -inputB, -degree)
    } catch(err) {
      if(err instanceof RangeError)
        throw new RangeError("Inputs cannot be higher than degree.")
      throw err
    }
  }
