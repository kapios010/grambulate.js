import { Vector2D } from "../src/vector2d";
import { describe, it, expect } from "vitest";
import { isEqual } from 'lodash'

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

    it('can be modified', () => {
        v.moveTo(5,6)
        expect(v.x).toBe(5)
        expect(v.y).toBe(6)
    })

    it('can be compared', () => {
        expect(v).toEqual(new Vector2D(5,6))
    })

    it('can calculate vector between 2 points', () => {
        expect(Vector2D.calculateFromPoints(new Vector2D(5,2), new Vector2D(-2, 3))).toEqual(new Vector2D(-7, 1))
    })
})