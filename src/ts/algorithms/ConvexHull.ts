import { cross3, distanceSquared, Vec2 } from "../models/Vec2"
import { approxEq, strictlyLess } from "./Float"

export function convexHull(points: Vec2[]): Vec2[] {
    if (points.length <= 1) {
        return points.slice()
    }

    const pivot = points.reduce((lowest, p) =>
        p.y < lowest.y || (p.y === lowest.y && p.x < lowest.x) ? p : lowest
    )

    const sorted = points.slice().sort((a, b) => {
        const angle = cross3(pivot, a, b)
        if (approxEq(angle, 0)) {
            return distanceSquared(pivot, a) - distanceSquared(pivot, b)
        }
        return -angle
    })

    const hull: Vec2[] = []
    for (const pt of sorted) {
        while (
            hull.length >= 2 &&
            !strictlyLess(
                0,
                cross3(hull[hull.length - 2], hull[hull.length - 1], pt)
            )
        ) {
            hull.pop()
        }
        hull.push(pt)
    }

    return hull
}
