import { describe, expect, it } from 'vitest'
import { Grambulator } from '../src/index'

describe('Testing the Grambulator class', () => {
    it('initializes with the correct limit', () => {
        let g1 = new Grambulator()
        expect(g1.limit).toBe(4000)
        let g2 = new Grambulator(3000)
        expect(g2.limit).toBe(3000)
    })

    let grambulator = new Grambulator(50)

    describe('Grambulating on positive board', () => {
        it('grambulates differentiating values with degree=1', ()=> {
            let res = grambulator.grambulatePlus(1, 3)
            expect(res).toBe(13)
        })

        it('grambulates differentiating values with degree=1 when C is on the board', ()=> {
            let res = grambulator.grambulatePlus(7, 1)
            expect(res).toBe(3)
        })


        it('grambulates the same values with degree=1', () => {
            let res = grambulator.grambulatePlus(1,1)
            expect(res).toBe(1)
            let res2 = grambulator.grambulatePlus(4,4)
            expect(res2).toBe(4)
        })

        it('refuses to grambulate values lower than degree', () => {
            describe('When the degree is 1', () => {
                let res = grambulator.grambulatePlus(1,-1)
                expect(res).toThrowError()
                let res2 = grambulator.grambulatePlus(-1, 1)
                expect(res2).toThrowError()
                let res3 = grambulator.grambulatePlus(-3,-1)
                expect(res3).toThrowError()
            })
            describe('When the degree is higher', () => {
                let res = grambulator.grambulatePlus(2,1,2)
                expect(res).toThrowError()
                let res2 = grambulator.grambulatePlus(1,2,2)
                expect(res2).toThrowError()
                let res3 = grambulator.grambulatePlus(0,1,2)
                expect(res3).toThrowError()
            })
            describe('When the degree is lower', () => {
                let res = grambulator.grambulatePlus(-2,-3,-2)
                expect(res).toThrowError()
                let res2 = grambulator.grambulatePlus(-3,-2,-2)
                expect(res2).toThrowError()
                let res3 = grambulator.grambulatePlus(-3,-4,-2)
                expect(res3).toThrowError()
            })
        })

        it('stops grambulating when the limit has been reached', () => {
            expect(() => grambulator.grambulatePlus(1, 30)).toThrowError()
            expect(() => grambulator.grambulatePlus(-2, 28)).toThrowError()
        })
    })


})