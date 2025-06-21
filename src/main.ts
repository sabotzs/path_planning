import { minkowskiSum } from "./algorithms/MinkowskiSum"
import { visibilityLines } from "./algorithms/VisibilityLine"
import { drawLineSegment, drawPoint, drawPolygon } from "./drawing/Draw"
import { offsetPolygon, Polygon, polygonToLineSegments } from "./models/Polygon"
import { Vec2 } from "./models/Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

window.addEventListener("load", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
})

// MARK: Objects
// prettier-ignore
const character = Polygon([
  Vec2(50, 50),
  Vec2(75, 50),
  Vec2(75, 75),
  // Vec2(50, 75),
])

// prettier-ignore
const obstacles: Polygon[] = [
  Polygon([
    Vec2(150, 75),
    Vec2(250, 75),
    Vec2(200, 150)
  ]),
  Polygon([
    Vec2(400, 125),
    Vec2(450, 200),
    Vec2(360, 150),
  ]),
  Polygon([
    Vec2(400, 500),
    Vec2(500, 400),
    Vec2(500, 500),
  ]),
]

const target = Vec2(200, 400)

function draw() {
    const origin = character.points[0]
    const minkowskiSums = obstacles
        .map((obstacle) => minkowskiSum(character, obstacle))
        .map((obstacle) => offsetPolygon(obstacle, origin))
    const lineSegments = minkowskiSums.flatMap((obstacle) =>
        polygonToLineSegments(obstacle)
    )

    minkowskiSums.forEach((p) => console.log(p))
    const visibilityGraph = visibilityLines(
        origin,
        target,
        minkowskiSums,
        lineSegments
    )

    drawPoint(ctx, origin)
    drawPoint(ctx, target)
    minkowskiSums.forEach((obstacle) => drawPolygon(ctx, obstacle))

    ctx.strokeStyle = "rgb(255, 0, 0)"
    visibilityGraph.forEach((visiblePoints, point) => {
        visiblePoints.forEach((visiblePoint) => {
            drawLineSegment(ctx, point, visiblePoint.to)
        })
    })
}
