import { drawPath, drawPoint, drawPolygon } from "./drawing/Draw"
import { Polygon } from "./models/Polygon"
import { distance, Vec2 } from "./models/Vec2"

// MARK: Constants
const approximationRadius = 8

// MARK: State
let isCreatingCharacter = false
let isCreatingTarget = false
let isMouseHoveringPoint = false

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
    const eventPoint = eventPointToCanvasPoint(event)

    if (isCreatingCharacter) {
        handleClickOnObject(eventPoint, character, stopCreatingCharacter)
        draw()
    }

    if (isCreatingTarget) {
        handleClickOnObject(eventPoint, target, stopCreatingTarget)
        draw()
    }

    if (createdObstacle) {
        handleClickOnObject(eventPoint, createdObstacle, stopCreatingObstacle)
        draw()
    }
})

function handleClickOnObject(
    eventPoint: Vec2,
    object: Polygon,
    close: () => void
) {
    const objectPoint = object.points.at(0)
    if (
        objectPoint &&
        distance(objectPoint, eventPoint) < approximationRadius
    ) {
        close()
    } else {
        object.points.push(eventPoint)
    }
}

canvas.addEventListener("mousemove", (event) => {
    const point = eventPointToCanvasPoint(event)

    if (isCreatingCharacter && character.points.length > 0) {
        checkMouseEnterExitOnPoint(point, character.points[0])
    } else if (isCreatingTarget && target.points.length > 0) {
        checkMouseEnterExitOnPoint(point, target.points[0])
    } else if (createdObstacle && createdObstacle.points.length > 0) {
        checkMouseEnterExitOnPoint(point, createdObstacle.points[0])
    }
})

function checkMouseEnterExitOnPoint(eventPoint: Vec2, currentPoint: Vec2) {
    const dist = distance(eventPoint, currentPoint)
    if (isMouseHoveringPoint && approximationRadius < dist) {
        isMouseHoveringPoint = false
        draw()
    } else if (!isMouseHoveringPoint && dist <= approximationRadius) {
        isMouseHoveringPoint = true
        ctx.reset()
        ctx.fillStyle = "rgb(115, 132, 231)"
        drawPoint(ctx, currentPoint, approximationRadius)
        drawWithoutReset()
    }
}

createCharacterButton.addEventListener("click", (event) => {
    if (isCreatingCharacter) {
        stopCreatingCharacter()
    } else {
        startCreatingCharacter()
    }
    if (isCreatingTarget) {
        stopCreatingTarget()
    }
    if (createdObstacle) {
        stopCreatingObstacle()
    }
    draw()
})

createTargetButton.addEventListener("click", (event) => {
    if (isCreatingTarget) {
        stopCreatingTarget()
    } else {
        startCreatingTarget()
    }
    if (isCreatingCharacter) {
        stopCreatingCharacter()
    }
    if (createdObstacle) {
        stopCreatingObstacle()
    }
    draw()
})

createObstacleButton.addEventListener("click", (event) => {
    if (createdObstacle) {
        stopCreatingObstacle()
    } else {
        startCreatingObstacle()
    }
    if (isCreatingCharacter) {
        stopCreatingCharacter()
    }
    if (isCreatingTarget) {
        stopCreatingTarget()
    }
    draw()
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
    drawWithoutReset()
}

function drawWithoutReset() {
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

// MARK: Utility
function eventPointToCanvasPoint(event: MouseEvent): Vec2 {
    const rect = canvas.getBoundingClientRect()
    return Vec2(event.clientX - rect.x, event.clientY - rect.y)
}
