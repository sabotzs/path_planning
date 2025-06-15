import {
    angleComparePoints,
    distanceCompareSegments,
    distanceToSegmentSquared,
} from "../src/algorithms/Utils"
import { LineSegment } from "../src/models/LineSegment"
import { distanceSquared, Vec2 } from "../src/models/Vec2"

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

    test("segments with equal distances to point", () => {
        const origin = Vec2(0, 0)
        const first = LineSegment(Vec2(-1, 0), Vec2(-1, 1))
        const second = LineSegment(Vec2(1, 0), Vec2(1, 1))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBe(0)
    })

    test("segments with common point", () => {
        const origin = Vec2(0, 0)
        const common = Vec2(1, 0)
        const first = LineSegment(common, Vec2(2, 1))
        const second = LineSegment(common, Vec2(2, -1))
        const result = distanceCompareSegments(origin, first, second)

        expect(result).toBe(0)
    })

    test("same segment", () => {
        const origin = Vec2(0, 0)
        const segment = LineSegment(Vec2(1, 0), Vec2(0, 1))
        const result = distanceCompareSegments(origin, segment, segment)

        expect(result).toBe(0)
    })
})
