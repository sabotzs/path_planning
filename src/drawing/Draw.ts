import { Polygon } from "../models/Polygon"
import { Vec2 } from "../models/Vec2"

export function drawPoint(ctx: CanvasRenderingContext2D, point: Vec2) {
    ctx.beginPath()
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
    ctx.fill()
}

export function drawLineSegment(
    ctx: CanvasRenderingContext2D,
    from: Vec2,
    to: Vec2
) {
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
}

export function drawPolygon(ctx: CanvasRenderingContext2D, polygon: Polygon) {
    if (polygon.points.length < 2) {
        return
    }

    const last = polygon.points[polygon.points.length - 1]
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    polygon.points.forEach((point) => {
        ctx.lineTo(point.x, point.y)
        ctx.moveTo(point.x, point.y)
    })
    ctx.stroke()

    polygon.points.forEach((point) => drawPoint(ctx, point))
}
