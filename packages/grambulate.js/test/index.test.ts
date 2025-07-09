import { describe, expect, it, test } from "vitest";
import { Grambulator, getRingNumber, getPositionOfNumber } from "../src/index";
import { Vector2D } from "../src/vector2d";

describe("Testing the Grambulator class", () => {
  it("initializes with the correct limit", () => {
    let g1 = new Grambulator();
    expect(g1.limit).toBe(4000);
    let g2 = new Grambulator(3000);
    expect(g2.limit).toBe(3000);
  });

  let grambulator = new Grambulator(50);

  describe("Finding the position of a number on a positive board", () => {
    it("refuses to find it if input < degree", () => {
      expect(() => getPositionOfNumber(-1, true, 1)).toThrow(RangeError);
    });

    it("finds the position if input == degree", () => {
      expect(getPositionOfNumber(1, true, 1)).toEqual(new Vector2D(0, 0));
      expect(getPositionOfNumber(3, true, 3)).toEqual(new Vector2D(0, 0));
      expect(getPositionOfNumber(-2, true, -2)).toEqual(new Vector2D(0, 0));
    });

    it("finds the position if input != degree (degree == 1)", () => {
      expect(getPositionOfNumber(13, true, 1)).toEqual(new Vector2D(2, 2));
      expect(getPositionOfNumber(24, true, 1)).toEqual(new Vector2D(1, -2));
      expect(getPositionOfNumber(25, true, 1)).toEqual(new Vector2D(2, -2));
      expect(getPositionOfNumber(17, true, 1)).toEqual(new Vector2D(-2, 2));
      expect(getPositionOfNumber(32, true, 1)).toEqual(new Vector2D(2, 3));
      expect(getPositionOfNumber(47, true, 1)).toEqual(new Vector2D(1, -3));
      expect(getPositionOfNumber(49, true, 1)).toEqual(new Vector2D(3, -3));
    });

    it("finds the position if input != degree (degree != 1)", () => {
      expect(getPositionOfNumber(13, true, 0)).toEqual(new Vector2D(1, 2));
      expect(getPositionOfNumber(24, true, -1)).toEqual(new Vector2D(3, -2));
      expect(getPositionOfNumber(25, true, 1)).toEqual(new Vector2D(2, -2));
      expect(getPositionOfNumber(17, true, 1)).toEqual(new Vector2D(-2, 2));
      expect(getPositionOfNumber(32, true, 1)).toEqual(new Vector2D(2, 3));
      expect(getPositionOfNumber(47, true, 1)).toEqual(new Vector2D(1, -3));
      expect(getPositionOfNumber(49, true, 1)).toEqual(new Vector2D(3, -3));
    });
  });

  describe("Grambulating on positive board", () => {
    it("grambulates differentiating values with degree=1", () => {
      let res = grambulator.grambulatePlus(1, 3);
      expect(res).toBe(13);
      let res2 = grambulator.grambulatePlus(7, 1);
      expect(res2).toBe(3);
    });

    it("grambulates the same values with degree=1", () => {
      let res = grambulator.grambulatePlus(1, 1);
      expect(res).toBe(1);
      let res2 = grambulator.grambulatePlus(4, 4);
      expect(res2).toBe(4);
    });

    it("refuses to grambulate values lower than degree", () => {
      describe("When the degree is 1", () => {
        let res = grambulator.grambulatePlus(1, -1);
        expect(res).toThrowError();
        let res2 = grambulator.grambulatePlus(-1, 1);
        expect(res2).toThrowError();
        let res3 = grambulator.grambulatePlus(-3, -1);
        expect(res3).toThrowError();
      });
      describe("When the degree is higher", () => {
        let res = grambulator.grambulatePlus(2, 1, 2);
        expect(res).toThrowError();
        let res2 = grambulator.grambulatePlus(1, 2, 2);
        expect(res2).toThrowError();
        let res3 = grambulator.grambulatePlus(0, 1, 2);
        expect(res3).toThrowError();
      });
      describe("When the degree is lower", () => {
        let res = grambulator.grambulatePlus(-2, -3, -2);
        expect(res).toThrowError();
        let res2 = grambulator.grambulatePlus(-3, -2, -2);
        expect(res2).toThrowError();
        let res3 = grambulator.grambulatePlus(-3, -4, -2);
        expect(res3).toThrowError();
      });
    });

    it("stops grambulating when the limit has been reached", () => {
      expect(() => grambulator.grambulatePlus(1, 30000)).toThrowError();
      expect(() => grambulator.grambulatePlus(-2, 20800)).toThrowError();
    });
  });
});
