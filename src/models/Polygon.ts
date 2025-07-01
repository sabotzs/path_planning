import { convexHull } from "../algorithms/ConvexHull"
import { LineSegment } from "./LineSegment"
import { Rect } from "./Rect"
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

export function polygonUnion(...polygons: Polygon[]): Polygon {
    const allPoints = polygons.flatMap((polygon) => polygon.points)
    const union = convexHull(allPoints)
    return Polygon(union)
}

export function polygonBoundingBox(polygon: Polygon): Rect {
    const { min, max } = Math
    let minX: number = polygon.points[0].x
    let minY: number = polygon.points[0].y
    let maxX: number = polygon.points[0].x
    let maxY: number = polygon.points[0].y

    for (let i = 1; i < polygon.points.length; ++i) {
        minX = min(minX, polygon.points[i].x)
        maxX = max(maxX, polygon.points[i].x)
        minY = min(minY, polygon.points[i].y)
        maxY = max(maxY, polygon.points[i].y)
    }

    return Rect(minX, minY, maxX - minX, maxY - minY)
}
