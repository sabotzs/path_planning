export type Vec2 = {
    x: number
    y: number
}

export function Vec2(x: number, y: number): Vec2 {
    return { x: x, y: y }
}

export function add(u: Vec2, v: Vec2): Vec2 {
    return {
        x: u.x + v.x,
        y: u.y + v.y,
    }
}

export function subtract(u: Vec2, v: Vec2): Vec2 {
    return {
        x: u.x - v.x,
        y: u.y - v.y,
    }
}

export function scale(v: Vec2, scalar: number): Vec2 {
    return {
        x: v.x * scalar,
        y: v.y * scalar,
    }
}

export function dot(u: Vec2, v: Vec2): number {
    return u.x * v.x + u.y * v.y
}

export function cross(u: Vec2, v: Vec2): number {
    return u.x * v.y - u.y * v.x
}

export function cross3(a: Vec2, b: Vec2, c: Vec2): number {
    return cross(subtract(b, a), subtract(c, a))
}

export function lengthSquared(v: Vec2): number {
    return dot(v, v)
}

export function distanceSquared(u: Vec2, v: Vec2): number {
    return lengthSquared(subtract(u, v))
}
