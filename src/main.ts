import { drawPolygon } from "./drawing/Draw"
import { Polygon } from "./models/Polygon"
import { Vec2 } from "./models/Vec2"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

window.addEventListener("load", () => {
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
    Vec2(400, 500),
    Vec2(500, 400),
    Vec2(500, 500),
  ]),
]

function draw() {
    drawPolygon(ctx, character)
    obstacles.forEach((obstacle) => drawPolygon(ctx, obstacle))
}
