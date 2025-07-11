import { describe, expect, it, test } from "vitest";
import { grambulatePlus, grambulateMinus, getRingFromNumber, getPositionOfNumber } from "../src/index";
import { Vector2D } from "../src/vector2d";

describe("Finding the ring of a number on a positive board", () => {
    test("with degree == 1", () => {
        expect(getRingFromNumber(1, true)).toBe(0)
        expect(getRingFromNumber(5, true)).toBe(1)
        expect(getRingFromNumber(36, true)).toBe(3)
    })

    test("with degree != 1", () => {
        expect(getRingFromNumber(1, true, 0)).toBe(1)
        expect(getRingFromNumber(5, true, -2)).toBe(1)
        expect(getRingFromNumber(49, true, -1)).toBe(4)
    })
})

describe("Finding the ring of a number on a negative board", () => {
    test("with degree == -1", () => {
        expect(getRingFromNumber(-1, false)).toBe(0)
        expect(getRingFromNumber(-5, false)).toBe(1)
        expect(getRingFromNumber(-36, false)).toBe(3)
    })

    test("with degree != 1", () => {
        expect(getRingFromNumber(-1, false, 0)).toBe(1)
        expect(getRingFromNumber(-5, false, 2)).toBe(1)
        expect(getRingFromNumber(-49, false, 1)).toBe(4)
    })
})

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
  });
});

describe("Finding the position of a number on a negative board", () => {
  it("refuses to find it if input > degree", () => {
    expect(() => getPositionOfNumber(1, false, -1)).toThrow(RangeError);
  });

  it("finds the position if input == degree", () => {
    expect(getPositionOfNumber(-1, false, -1)).toEqual(new Vector2D(0, 0));
    expect(getPositionOfNumber(-3, false, -3)).toEqual(new Vector2D(0, 0));
    expect(getPositionOfNumber(2, false, 2)).toEqual(new Vector2D(0, 0));
  });

  it("finds the position if input != degree (degree == 1)", () => {
    expect(getPositionOfNumber(-13, false, -1)).toEqual(new Vector2D(2, 2));
    expect(getPositionOfNumber(-24, false, -1)).toEqual(new Vector2D(1, -2));
    expect(getPositionOfNumber(-25, false, -1)).toEqual(new Vector2D(2, -2));
    expect(getPositionOfNumber(-17, false, -1)).toEqual(new Vector2D(-2, 2));
    expect(getPositionOfNumber(-32, false, -1)).toEqual(new Vector2D(2, 3));
    expect(getPositionOfNumber(-47, false, -1)).toEqual(new Vector2D(1, -3));
    expect(getPositionOfNumber(-49, false, -1)).toEqual(new Vector2D(3, -3));
  });

  it("finds the position if input != degree (degree != 1)", () => {
    expect(getPositionOfNumber(-13, false, -0)).toEqual(new Vector2D(1, 2));
    expect(getPositionOfNumber(-24, false, 1)).toEqual(new Vector2D(3, -2));
  });
});


  describe("Grambulating on positive board", () => {
    it("grambulates differentiating values with degree=1", () => {
      let res = grambulatePlus(1, 3);
      expect(res).toBe(13);
      let res2 = grambulatePlus(7, 1);
      expect(res2).toBe(3);
    });

    it("grambulates the same values with degree=1", () => {
      let res = grambulatePlus(1, 1);
      expect(res).toBe(1);
      let res2 = grambulatePlus(4, 4);
      expect(res2).toBe(4);
    });

    it("refuses to grambulate values lower than degree", () => {
      describe("When the degree is 1", () => {
        let res = grambulatePlus(1, -1);
        expect(res).toThrowError();
        let res2 = grambulatePlus(-1, 1);
        expect(res2).toThrowError();
        let res3 = grambulatePlus(-3, -1);
        expect(res3).toThrowError();
      });
      describe("When the degree is higher", () => {
        let res = grambulatePlus(2, 1, 2);
        expect(res).toThrowError();
        let res2 = grambulatePlus(1, 2, 2);
        expect(res2).toThrowError();
        let res3 = grambulatePlus(0, 1, 2);
        expect(res3).toThrowError();
      });
      describe("When the degree is lower", () => {
        let res = grambulatePlus(-2, -3, -2);
        expect(res).toThrowError();
        let res2 = grambulatePlus(-3, -2, -2);
        expect(res2).toThrowError();
        let res3 = grambulatePlus(-3, -4, -2);
        expect(res3).toThrowError();
      });
    });
  });

  describe("Grambulating on negative board", () => {
    it("grambulates differentiating values with degree=-1", () => {
      let res = grambulateMinus(-1, -3);
      expect(res).toBe(-13);
      let res2 = grambulateMinus(-7, -1);
      expect(res2).toBe(-3);
    });

    it("grambulates the same values with degree=-1", () => {
      let res = grambulateMinus(-1, -1);
      expect(res).toBe(-1);
      let res2 = grambulateMinus(-4, -4);
      expect(res2).toBe(-4);
    });

    it("refuses to grambulate values higher than degree", () => {
      describe("When the degree is -1", () => {
        let res = grambulateMinus(1, -1);
        expect(res).toThrowError();
        let res2 = grambulateMinus(-1, 1);
        expect(res2).toThrowError();
        let res3 = grambulateMinus(3, 1);
        expect(res3).toThrowError();
      });
      describe("When the degree is lower", () => {
        let res = grambulateMinus(-2, -1, -2);
        expect(res).toThrowError();
        let res2 = grambulateMinus(-1, -2, -2);
        expect(res2).toThrowError();
        let res3 = grambulateMinus(0, -1, -2);
        expect(res3).toThrowError();
      });
      describe("When the degree is higher", () => {
        let res = grambulateMinus(2, 3, 2);
        expect(res).toThrowError();
        let res2 = grambulateMinus(3, 2, 2);
        expect(res2).toThrowError();
        let res3 = grambulateMinus(3, 4, 2);
        expect(res3).toThrowError();
      });
    });
  });
