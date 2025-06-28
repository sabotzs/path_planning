import { drawPath, drawPolygon } from "./drawing/Draw"
import { Polygon } from "./models/Polygon"
import { Vec2 } from "./models/Vec2"

// MARK: State
let isCreatingCharacter = false
let isCreatingTarget = false

// MARK: Objects
const character = Polygon([])
const target = Polygon([])

// MARK: Elements
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const createCharacterButton = document.getElementById(
    "createCharacter"
) as HTMLButtonElement
const createTargetButton = document.getElementById(
    "createTarget"
) as HTMLButtonElement

// MARK: Events
window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    draw()
})

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect()
    const point = Vec2(event.clientX - rect.x, event.clientY - rect.y)

    if (isCreatingCharacter) {
        character.points.push(point)
        draw()
    }

    if (isCreatingTarget) {
        target.points.push(point)
        draw()
    }
})

createCharacterButton.addEventListener("click", (event) => {
    isCreatingCharacter = !isCreatingCharacter
    createCharacterButton.classList.toggle("active", isCreatingCharacter)
    createCharacterButton.textContent = isCreatingCharacter
        ? "Creating character"
        : "Create character"

    if (!isCreatingCharacter) {
        draw()
    }
})

createTargetButton.addEventListener("click", (event) => {
    isCreatingTarget = !isCreatingTarget
    createTargetButton.classList.toggle("active", isCreatingTarget)
    createTargetButton.textContent = isCreatingTarget
        ? "Creating target"
        : "Create target"

    if (!isCreatingTarget) {
        draw()
    }
})

function draw() {
    ctx.reset()
    drawCharacter()
    drawTarget()
}

function drawCharacter() {
    const style = "rgb(31, 109, 46)"
    ctx.strokeStyle = style
    ctx.fillStyle = style

    if (isCreatingCharacter) {
        drawPath(ctx, character.points)
    } else {
        drawPolygon(ctx, character)
    }
}

function drawTarget() {
    const style = "rgb(231, 201, 36)"
    ctx.strokeStyle = style
    ctx.fillStyle = style

    if (isCreatingTarget) {
        drawPath(ctx, target.points)
    } else {
        drawPolygon(ctx, target)
    }
}
