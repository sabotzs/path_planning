import { minkowskiSum } from "../algorithms/MinkowskiSum"
import {
    setCharacterColor,
    setObstacleColor,
    setTargetColor,
} from "../drawing/Colors"
import { drawPoint, drawPolygon } from "../drawing/Draw"
import { offsetPolygon, Polygon } from "../models/Polygon"
import { Vec2 } from "../models/Vec2"
import { character, obstacles, target } from "./CreateObject"

export let minkowskiSpaceCharacter = Vec2(0, 0)
export let minkowskiSpaceTarget = Vec2(0, 0)
export let minkowskiSpaceObstacles: Polygon[] = []

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export function drawMinkowskiSpace() {
    const pivot = character.points[0]

    minkowskiSpaceCharacter = pivot
    minkowskiSpaceTarget = target.points[0]
    minkowskiSpaceObstacles = obstacles.map((obstacle) => {
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
