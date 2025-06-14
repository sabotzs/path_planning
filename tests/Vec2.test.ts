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
