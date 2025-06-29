import { LineSegment } from "../models/LineSegment"
import { Polygon } from "../models/Polygon"
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
        if (approxEq(origin.y, a.y)) {
            const oa = subtract(a, origin)
            const ob = subtract(b, origin)
            const oaLenghtSquared = lengthSquared(oa)
            const d = dot(oa, ob) / oaLenghtSquared

            if (approxEq(d, 1)) {
                return 0
            } else if (strictlyLess(1, d)) {
                // A is between OB
                return -1
            } else if (strictlyLess(d, 0)) {
                const s = dot(oa, Vec2(1, 0))
                return strictlyLess(0, s) ? -1 : 1
            } else {
                return 1
            }
        } else {
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

    if (strictlyLess(diff, 0)) {
        return -1
    } else {
        return 1
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

export function isConvex(polygon: Polygon): boolean {
    const size = polygon.points.length
    if (size < 3) {
        return true
    }

    let orientation = 0

    for (let i = 0; i < size; ++i) {
        const currentOrientation = cross3(
            polygon.points[i],
            polygon.points[(i + 1) % size],
            polygon.points[(i + 2) % size]
        )

        if (orientation === 0) {
            orientation = currentOrientation
        } else if (orientation * currentOrientation < 0) {
            return false
        }
    }
    return true
}

export function normaliseOrientation(polygon: Polygon) {
    if (polygon.points.length < 3) {
        return
    }

    const orientation = cross3(
        polygon.points[0],
        polygon.points[1],
        polygon.points[2]
    )
    if (strictlyLess(orientation, 0)) {
        polygon.points = [
            polygon.points[0],
            ...polygon.points.slice(1).reverse(),
        ]
    }
}
