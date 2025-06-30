import { Polygon } from "../models/Polygon"
import {
    cross,
    dot,
    perpendicular,
    scale,
    subtract,
    Vec2,
} from "../models/Vec2"

export function checkCollision(first: Polygon, second: Polygon): boolean {
    let direction = subtract(first.points[0], second.points[0])
    if (direction.x === 0 && direction.y === 0) {
        direction = Vec2(1, 0)
    }

    const simplex = [supportPoint(first, second, direction)]
    direction = scale(simplex[0], -1)

    while (true) {
        const next = supportPoint(first, second, direction)
        if (dot(next, direction) <= 0) {
            return false
        }

        simplex.push(next)

        if (handleSimplex(simplex, direction)) {
            return true
        }
    }
}

function handleSimplex(simplex: Vec2[], direction: Vec2): boolean {
    const a = simplex[simplex.length - 1]
    const ao = scale(a, -1)

    if (simplex.length === 3) {
        const b = simplex[1]
        const c = simplex[0]

        const ab = subtract(b, a)
        const ac = subtract(c, a)

        const abPerp = trippleProduct(ac, ab, ab)
        if (dot(abPerp, ao) >= 0) {
            simplex.splice(0, 1)
            direction.x = abPerp.x
            direction.y = abPerp.y
        } else {
            const acPerp = trippleProduct(ab, ac, ac)
            if (dot(acPerp, ao) >= 0) {
                simplex.splice(1, 1)
                direction.x = acPerp.x
                direction.y = acPerp.y
            } else {
                return true
            }
        }
    } else {
        const ab = subtract(simplex[1], simplex[0])
        const abPerp = trippleProduct(ab, ao, ab)
        direction.x = abPerp.x
        direction.y = abPerp.y
    }
    return false
}

function trippleProduct(a: Vec2, b: Vec2, c: Vec2): Vec2 {
    const ba = cross(a, b)
    const cPerp = perpendicular(c)
    return scale(cPerp, ba)
}

function supportPoint(first: Polygon, second: Polygon, direction: Vec2): Vec2 {
    const support = (polygon: Polygon, direction: Vec2): Vec2 => {
        let bestDot = 0
        return polygon.points.reduce((best, current) => {
            const currentDot = dot(current, direction)
            if (bestDot < currentDot) {
                bestDot = currentDot
                return current
            }
            return best
        })
    }

    const p1 = support(first, direction)
    const p2 = support(second, scale(direction, -1))
    return subtract(p1, p2)
}
