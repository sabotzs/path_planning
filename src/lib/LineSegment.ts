import { Vec2 } from "./Vec2"

export type LineSegment = {
    a: Vec2
    b: Vec2
}

export function LineSegment(a: Vec2, b: Vec2): LineSegment {
    return { a: a, b: b }
}
