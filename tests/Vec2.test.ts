import { version } from "typescript"
import * as V2 from "../src/models/Vec2"

describe("test adding vectors", () => {
    test("adding two different vectors", () => {
        const v = V2.Vec2(7, 2)
        const u = V2.Vec2(1, 3)
        const result = V2.add(v, u)

        const expected = V2.Vec2(8, 5)

        expect(result).toStrictEqual(expected)
    })

    test("adding null vector", () => {
        const nil = V2.Vec2(0, 0)
        const v = V2.Vec2(10, 20)
        const result = V2.add(v, nil)

        expect(result).toStrictEqual(v)
    })

    test("adding is comutative", () => {
        const v = V2.Vec2(1, 3)
        const u = V2.Vec2(5, 1)

        const l = V2.add(v, u)
        const r = V2.add(u, v)

        expect(l).toStrictEqual(r)
    })
})

describe("test subtracting vectors", () => {
    test("subtract two different vectors", () => {
        const u = V2.Vec2(7, 2)
        const v = V2.Vec2(3, 6)
        const result = V2.subtract(u, v)

        const expected = V2.Vec2(4, -4)

        expect(result).toStrictEqual(expected)
    })

    test("subtracting nil vector", () => {
        const u = V2.Vec2(7, 2)
        const v = V2.Vec2(0, 0)
        const result = V2.subtract(u, v)

        expect(result).toStrictEqual(u)
    })

    test("subtracting from nil vector", () => {
        const u = V2.Vec2(7, 2)
        const v = V2.Vec2(0, 0)
        const result = V2.subtract(v, u)

        const expected = V2.Vec2(-7, -2)

        expect(result).toStrictEqual(expected)
    })
})

describe("test scaling vectors", () => {
    test("scaling with 0", () => {
        const s = 0
        const v = V2.Vec2(3, 2)
        const result = V2.scale(v, s)

        const expected = V2.Vec2(0, 0)

        expect(result).toStrictEqual(expected)
    })

    test("scaling with 1", () => {
        const s = 1
        const v = V2.Vec2(3, 2)
        const result = V2.scale(v, s)

        expect(result).toStrictEqual(v)
    })

    test("scaling with positive", () => {
        const s = 3
        const v = V2.Vec2(4, 3)
        const result = V2.scale(v, s)

        const expected = V2.Vec2(12, 9)

        expect(result).toStrictEqual(expected)
    })

    test("scaling with negative", () => {
        const s = -1
        const v = V2.Vec2(4, 3)
        const result = V2.scale(v, s)

        const expected = V2.Vec2(-4, -3)

        expect(result).toStrictEqual(expected)
    })
})

describe("test dot product of vectors", () => {
    test("dot product with null vector", () => {
        const u = V2.Vec2(4, 3)
        const v = V2.Vec2(0, 0)
        const result = V2.dot(u, v)

        expect(result).toStrictEqual(0)
    })

    test("dot product with parallel vector", () => {
        const u = V2.Vec2(1, 2)
        const v = V2.Vec2(2, 4)
        const result = V2.dot(u, v)

        const expected = 10

        expect(result).toStrictEqual(expected)
    })

    test("dot product with perpendicular vector", () => {
        const u = V2.Vec2(2, 1)
        const v = V2.Vec2(-2, 4)
        const result = V2.dot(u, v)

        expect(result).toStrictEqual(0)
    })

    test("dot product of self gives the squared length", () => {
        const u = V2.Vec2(4, 3)
        const result = V2.dot(u, u)

        const expected = 25

        expect(result).toStrictEqual(expected)
    })
})
