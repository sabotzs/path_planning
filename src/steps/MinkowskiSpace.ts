import { minkowskiSum } from "../algorithms/MinkowskiSum"
import {
    setCharacterColor,
    setObstacleColor,
    setTargetColor,
} from "../drawing/Colors"
import { drawPoint, drawPolygon } from "../drawing/Draw"
import { offsetPolygon } from "../models/Polygon"
import { character, obstacles, target } from "./CreateObject"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export function drawMinkowskiSpace() {
    const pivot = character.points[0]

    const minkowskiSpaceCharacter = pivot
    const minkowskiSpaceTarget = target.points[0]
    const minkowskiSpaceObstacles = obstacles.map((obstacle) => {
        const sum = minkowskiSum(character, obstacle)
        return offsetPolygon(sum, pivot)
    })

    ctx.reset()
    setCharacterColor(ctx)
    drawPoint(ctx, minkowskiSpaceCharacter)

    setTargetColor(ctx)
    drawPoint(ctx, minkowskiSpaceTarget)

    setObstacleColor(ctx)
    minkowskiSpaceObstacles.forEach((obstacle) => drawPolygon(ctx, obstacle))
}
