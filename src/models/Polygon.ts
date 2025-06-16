import { LineSegment } from "./LineSegment"
import { add, Vec2 } from "./Vec2"

export type Polygon = {
    points: Vec2[]
}

export function Polygon(points: Vec2[]): Polygon {
    return { points: points }
}

export function offsetPolygon(polygon: Polygon, t: Vec2): Polygon {
    return Polygon(polygon.points.map((point) => add(point, t)))
}

export function polygonToLineSegments(polygon: Polygon): LineSegment[] {
    const next = (i: number) => (i + 1) % polygon.points.length

    return polygon.points.map((point, index) => {
        return LineSegment(point, polygon.points[next(index)])
    })
}
