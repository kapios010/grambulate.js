import { Vector2D } from "../src/vector2d";
import { describe, it, expect } from "vitest";

describe('Testing the Vector2D class', () => {
    let v = new Vector2D(2, 3)

    it('initializes with the correct values', () => {
        expect(v.x).toBe(2)
        expect(v.y).toBe(3)
    })

    it('can modify its x variable', () => {
        v.x++
        expect(v.x).toBe(3)
    })

    it('can modify its y variable', () => {
        v.y++
        expect(v.y).toBe(4)
    })
})