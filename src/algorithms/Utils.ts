import { LineSegment } from "../models/LineSegment"
import {
    add,
    cross3,
    distanceSquared,
    dot,
    lengthSquared,
    scale,
    subtract,
    Vec2,
} from "../models/Vec2"
import { approxEq, strictlyLess } from "./Float"

export function angleComparePoints(origin: Vec2, a: Vec2, b: Vec2): number {
    const aAbove = a.y < origin.y
    const bAbove = b.y < origin.y
    if (aAbove !== bAbove) {
        return bAbove ? -1 : 1
    }

    const oab = cross3(origin, a, b)
    if (approxEq(oab, 0)) {
        return distanceSquared(origin, a) - distanceSquared(origin, b)
    }

    return strictlyLess(0, oab) ? -1 : 1
}

export function distanceToSegmentSquared(
    point: Vec2,
    segment: LineSegment
): number {
    const ap = subtract(point, segment.a)
    const ab = subtract(segment.b, segment.a)
    const abLengthSquared = lengthSquared(ab)

    if (approxEq(abLengthSquared, 0)) {
        return lengthSquared(ap)
    }

    const s = dot(ap, ab) / abLengthSquared
    const t = Math.max(0, Math.min(1, s))
    const projection = add(segment.a, scale(ab, t))
    return distanceSquared(point, projection)
}
