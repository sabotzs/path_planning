import { angleComparePoints } from "../src/algorithms/Utils"
import { Vec2 } from "../src/models/Vec2"

describe("test angle comparison of points", () => {
    test("comparison of the same point", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const result = angleComparePoints(origin, a, a)

        expect(result).toBeCloseTo(0)
    })

    test("comparison of colinear points", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(2, 4)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant I and II", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(-1, 2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant I and III", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(-1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant I and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant II and III", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, 2)
        const b = Vec2(-1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant II and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, 2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })

    test("comparison of points in quadrant III and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, -2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBeLessThan(0)
        expect(result2).toBeGreaterThan(0)
    })
})
