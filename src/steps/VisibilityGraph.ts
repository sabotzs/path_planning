import { visibilityLines } from "../algorithms/VisibilityLine"
import { setVisibilityLineStyle } from "../drawing/DrawStyle"
import { drawLineSegment } from "../drawing/Draw"
import { Graph } from "../models/Graph"
import { polygonToLineSegments } from "../models/Polygon"
import {
    minkowskiSpaceCharacter,
    minkowskiSpaceObstacles,
    minkowskiSpaceTarget,
} from "./MinkowskiSpace"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export let graph: Graph

export function drawVisibilityGraph() {
    const begin = minkowskiSpaceCharacter
    const end = minkowskiSpaceTarget
    const lineSegments = minkowskiSpaceObstacles.flatMap((obstacle) =>
        polygonToLineSegments(obstacle)
    )

    graph = visibilityLines(begin, end, minkowskiSpaceObstacles, lineSegments)

    setVisibilityLineStyle(ctx)
    graph.forEach((edges, vertex) => {
        edges.forEach((edge) => {
            drawLineSegment(ctx, vertex, edge.vertex)
        })
    })
}
