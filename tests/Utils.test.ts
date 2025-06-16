import {
    angleComparePoints,
    castRay,
    distanceCompareSegments,
    distanceToSegmentSquared,
} from "../src/algorithms/Utils"
import { LineSegment } from "../src/models/LineSegment"
import { add, distanceSquared, scale, Vec2 } from "../src/models/Vec2"

describe("test angle comparison of points", () => {
    test("comparison of the same point", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const result = angleComparePoints(origin, a, a)

        expect(result).toBe(0)
    })

    test("comparison of colinear points", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(2, 4)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant I and II", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(-1, 2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant I and III", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(-1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant I and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(1, 2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant II and III", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, 2)
        const b = Vec2(-1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant II and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, 2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })

    test("comparison of points in quadrant III and IV", () => {
        const origin = Vec2(0, 0)
        const a = Vec2(-1, -2)
        const b = Vec2(1, -2)
        const result1 = angleComparePoints(origin, a, b)
        const result2 = angleComparePoints(origin, b, a)

        expect(result1).toBe(-1)
        expect(result2).toBe(1)
    })
})

describe("test squared distance from point to segment", () => {
    test("distance when segment is point", () => {
        const point = Vec2(1, 1)
        const segmentPoint = Vec2(2, 2)
        const segment = LineSegment(segmentPoint, segmentPoint)
        const result = distanceToSegmentSquared(point, segment)

        const expected = 2

        expect(result).toStrictEqual(expected)
        expect(result).toStrictEqual(distanceSquared(point, segmentPoint))
    })

    test("distance when point is on segment", () => {
        const point = Vec2(1, 1)
        const segment = LineSegment(Vec2(0, 0), Vec2(2, 2))
        const result = distanceToSegmentSquared(point, segment)

        const expected = 0

        expect(result).toStrictEqual(expected)
        expect(result).toStrictEqual(distanceSquared(Vec2(1, 1), Vec2(1, 1)))
    })

    test("distance when perpendicular hits the segment", () => {
        const point = Vec2(1, 1)
        const segment = LineSegment(Vec2(0, 1), Vec2(1, 0))
        const result = distanceToSegmentSquared(point, segment)

        const expected = 0.5

        expect(result).toBeCloseTo(expected)
    })

    test("distance when perpendiculat hits an end of the segment", () => {
        const point = Vec2(1, 1)
        const closest = Vec2(2, 1)
        const segment = LineSegment(closest, Vec2(2, 3))
        const result = distanceToSegmentSquared(point, segment)

        const expected = 1

        expect(result).toBeCloseTo(expected)
        expect(result).toBeCloseTo(distanceSquared(point, closest))
    })

    test("distance when perpendicular doesn't hit the segment", () => {
        const point = Vec2(1, 1)
        const closest = Vec2(2, 2)
        const segment = LineSegment(closest, Vec2(5, 2))
        const result = distanceToSegmentSquared(point, segment)

        const expected = 2

        expect(result).toBeCloseTo(expected)
        expect(result).toBeCloseTo(distanceSquared(point, closest))
    })

    test("distance when point is collinear, but not on segment", () => {
        const point = Vec2(1, 1)
        const closest = Vec2(2, 2)
        const segment = LineSegment(closest, Vec2(4, 4))
        const result = distanceToSegmentSquared(point, segment)

        const expected = 2

        expect(result).toBeCloseTo(expected)
        expect(result).toBeCloseTo(distanceSquared(point, closest))
    })
})

describe("test distance from point comparison of line segments", () => {
    test("first segment is in front of the other, relative to point", () => {
        const origin = Vec2(0, 0)
        const first = LineSegment(Vec2(1, 0), Vec2(0, 1))
        const second = LineSegment(Vec2(2, 0), Vec2(0, 2))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBeLessThan(0)
    })

    test("second segment is in front of the other, relative to point", () => {
        const origin = Vec2(0, 0)
        const first = LineSegment(Vec2(2, 0), Vec2(0, 2))
        const second = LineSegment(Vec2(1, 0), Vec2(0, 1))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBeGreaterThan(0)
    })

    test("segments with equal distances to point result in the first being greater", () => {
        const origin = Vec2(0, 0)
        const first = LineSegment(Vec2(-1, 0), Vec2(-1, 1))
        const second = LineSegment(Vec2(1, 0), Vec2(1, 1))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBe(1)
    })

    test("segments with common point result in the first being greater", () => {
        const origin = Vec2(0, 0)
        const common = Vec2(1, 0)
        const first = LineSegment(common, Vec2(2, 1))
        const second = LineSegment(common, Vec2(2, -1))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBe(1)
    })

    test("same segment result in being compared equal", () => {
        const origin = Vec2(0, 0)
        const segment = LineSegment(Vec2(1, 0), Vec2(0, 1))
        const result = distanceCompareSegments(origin, segment, segment)

        expect(result).toBe(0)
    })
})

describe("test ray casting", () => {
    test("cast ray to first end of segment", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(0, 1)
        const a = Vec2(0, 5)
        const b = Vec2(3, 4)
        const segment = LineSegment(a, b)
        const result = castRay(origin, direction, segment)

        expect(result).toStrictEqual(a)
    })

    test("cast ray to second end of segment", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(3, 4)
        const a = Vec2(0, 5)
        const b = direction
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toStrictEqual(b)
    })

    test("cast ray to middle of segment", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(1, 1)
        const a = Vec2(0, 2)
        const b = Vec2(2, 0)
        const expected = scale(add(a, b), 0.5)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toStrictEqual(expected)
    })

    test("cast ray to segment, which contains origin", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(0, 1)
        const a = Vec2(-2, 0)
        const b = Vec2(3, 0)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toStrictEqual(origin)
    })

    test("cast ray misses segment sideways", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(1, 0)
        const a = Vec2(1, 1)
        const b = Vec2(0, 2)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toBeUndefined()
    })

    test("cast ray parallel to segment segment misses", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(1, 0)
        const a = Vec2(0, 1)
        const b = Vec2(1, 1)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toBeUndefined()
    })

    test("cast ray to colinear segment hits the closer point", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(1, 0)
        const a = Vec2(2, 0)
        const b = Vec2(3, 0)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toStrictEqual(a)
    })

    test("cast ray to colinear segment in the opposite direction misses", () => {
        const origin = Vec2(0, 0)
        const direction = Vec2(-1, 0)
        const a = Vec2(2, 0)
        const b = Vec2(3, 0)
        const result = castRay(origin, direction, LineSegment(a, b))

        expect(result).toBeUndefined()
    })
})
