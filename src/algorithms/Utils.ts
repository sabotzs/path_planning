import { cross3, distanceSquared, Vec2 } from "../models/Vec2"
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
