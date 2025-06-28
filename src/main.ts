import { drawPath, drawPolygon } from "./drawing/Draw"
import { Polygon } from "./models/Polygon"
import { Vec2 } from "./models/Vec2"

// MARK: State
let isCreatingCharacter = false
let isCreatingTarget = false

// MARK: Objects
let character = Polygon([])
let target = Polygon([])
const obstacles: Polygon[] = []
let createdObstacle: Polygon | undefined = undefined

// MARK: Elements
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const createCharacterButton = document.getElementById(
    "createCharacter"
) as HTMLButtonElement
const createTargetButton = document.getElementById(
    "createTarget"
) as HTMLButtonElement
const createObstacleButton = document.getElementById(
    "createObstacle"
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

    if (createdObstacle) {
        createdObstacle.points.push(point)
        draw()
    }
})

createCharacterButton.addEventListener("click", (event) => {
    if (isCreatingCharacter) {
        stopCreatingCharacter()
    } else {
        startCreatingCharacter()
    }
    draw()
})

createTargetButton.addEventListener("click", (event) => {
    if (isCreatingTarget) {
        stopCreatingTarget()
    } else {
        startCreatingTarget()
    }
    draw()
})

createObstacleButton.addEventListener("click", (event) => {
    if (createdObstacle) {
        stopCreatingObstacle()
        draw()
    } else {
        startCreatingObstacle()
    }
})

function startCreatingObstacle() {
    createdObstacle = Polygon([])
    createObstacleButton.classList.toggle("active", true)
    createObstacleButton.textContent = "Creating obstacle"
}

function stopCreatingObstacle() {
    if (!createdObstacle) return

    obstacles.push(createdObstacle)
    createdObstacle = undefined
    createObstacleButton.classList.toggle("active", false)
    createObstacleButton.textContent = "Create obstacle"
}

function startCreatingCharacter() {
    character = Polygon([])
    isCreatingCharacter = true
    createCharacterButton.classList.toggle("active", true)
    createCharacterButton.textContent = "Creating character"
}

function stopCreatingCharacter() {
    isCreatingCharacter = false
    createCharacterButton.classList.toggle("active", false)
    createCharacterButton.textContent = "Create character"
}

function startCreatingTarget() {
    target = Polygon([])
    isCreatingTarget = true
    createTargetButton.classList.toggle("active", true)
    createTargetButton.textContent = "Creating target"
}

function stopCreatingTarget() {
    isCreatingTarget = false
    createTargetButton.classList.toggle("active", false)
    createTargetButton.textContent = "Create target"
}

// MARK: Drawing
function draw() {
    ctx.reset()
    drawCharacter()
    drawTarget()
    drawObstacles()
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

function drawObstacles() {
    const style = "rgb(0, 0, 0)"
    ctx.strokeStyle = style
    ctx.fillStyle = style

    obstacles.forEach((obstacle) => {
        drawPolygon(ctx, obstacle)
    })

    if (createdObstacle) {
        drawPath(ctx, createdObstacle.points)
    }
}
