import { visibilityLines } from "../algorithms/VisibilityLine"
import { setVisibilityLineColor } from "../drawing/Colors"
import { drawLineSegment } from "../drawing/Draw"
import { polygonToLineSegments } from "../models/Polygon"
import {
    minkowskiSpaceCharacter,
    minkowskiSpaceObstacles,
    minkowskiSpaceTarget,
} from "./MinkowskiSpace"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export function drawVisibilityGraph() {
    const begin = minkowskiSpaceCharacter
    const end = minkowskiSpaceTarget
    const lineSegments = minkowskiSpaceObstacles.flatMap((obstacle) =>
        polygonToLineSegments(obstacle)
    )

    const graph = visibilityLines(
        begin,
        end,
        minkowskiSpaceObstacles,
        lineSegments
    )

    setVisibilityLineColor(ctx)
    graph.forEach((edges, vertex) => {
        edges.forEach((edge) => {
            drawLineSegment(ctx, vertex, edge.vertex)
        })
    })
}
