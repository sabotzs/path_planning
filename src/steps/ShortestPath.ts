import { dijkstra } from "../algorithms/Dijkstra"
import { setShortestPathColor } from "../drawing/Colors"
import { drawPath } from "../drawing/Draw"
import { Vec2 } from "../models/Vec2"
import { minkowskiSpaceCharacter, minkowskiSpaceTarget } from "./MinkowskiSpace"
import { graph } from "./VisibilityGraph"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export let shortestPath: Vec2[] = []

export function drawShortestPath() {
    shortestPath = dijkstra(
        minkowskiSpaceCharacter,
        minkowskiSpaceTarget,
        graph
    )

    setShortestPathColor(ctx)
    drawPath(ctx, shortestPath)
}
