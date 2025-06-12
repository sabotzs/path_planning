import { Vec2 } from "../models/Vec2"

const { max, abs } = Math
const { EPSILON } = Number

export function approxEq(x: number, y: number): boolean {
    return abs(x - y) <= max(abs(x), abs(y)) * EPSILON
}

export function strictlyLess(x: number, y: number): boolean {
    return y - x > max(abs(x), abs(y)) * EPSILON
}
