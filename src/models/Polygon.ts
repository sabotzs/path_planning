import { Vec2 } from "./Vec2"

export type Polygon = {
    points: Vec2[]
}

export function Polygon(points: Vec2[]): Polygon {
    return { points: points }
}
