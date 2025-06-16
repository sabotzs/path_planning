import { LineSegment } from "../models/LineSegment"
import {
    add,
    cross,
    cross3,
    distanceSquared,
    dot,
    lengthSquared,
    scale,
    subtract,
    Vec2,
} from "../models/Vec2"
import { approxEq, approxEqVec, strictlyLess } from "./Float"

export function angleComparePoints(origin: Vec2, a: Vec2, b: Vec2): number {
    const aAbove = a.y < origin.y
    const bAbove = b.y < origin.y
    if (aAbove !== bAbove) {
        return bAbove ? -1 : 1
    }

    const oab = cross3(origin, a, b)
    if (approxEq(oab, 0)) {
        const distA = distanceSquared(origin, a)
        const distB = distanceSquared(origin, b)

        if (strictlyLess(distA, distB)) {
            return -1
        } else if (strictlyLess(distB, distA)) {
            return 1
        } else {
            return 0
        }
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

export function distanceCompareSegments(
    origin: Vec2,
    first: LineSegment,
    second: LineSegment
): number {
    if (approxEqVec(first.a, second.a) && approxEqVec(first.b, second.b)) {
        return 0
    }

    const distA = distanceToSegmentSquared(origin, first)
    const distB = distanceToSegmentSquared(origin, second)
    const diff = distA - distB

    if (strictlyLess(0, diff)) {
        return 1
    } else {
        return -1
    }
}

export function castRay(
    origin: Vec2,
    direction: Vec2,
    segment: LineSegment
): Vec2 | undefined {
    const ab = subtract(segment.b, segment.a)
    const det = cross(direction, ab)

    if (approxEq(det, 0)) {
        const abo = cross3(segment.a, segment.b, origin)
        if (!approxEq(abo, 0)) {
            return undefined
        }

        const dotA = dot(subtract(segment.a, origin), direction)
        const dotB = dot(subtract(segment.b, origin), direction)

        if (strictlyLess(dotA, 0) && strictlyLess(dotB, 0)) {
            return undefined
        } else if (strictlyLess(dotA, 0) || strictlyLess(dotB, 0)) {
            return origin
        } else {
            return strictlyLess(dotA, dotB) ? segment.a : segment.b
        }
    }

    const oa = subtract(segment.a, origin)
    const t = cross(oa, ab) / det
    const u = cross(oa, direction) / det
    if (strictlyLess(t, 0) || strictlyLess(u, 0) || strictlyLess(1, u)) {
        return undefined
    }
    return add(origin, scale(direction, t))
}
