import { normaliseOrientation, isConvex } from "../algorithms/Utils"
import { characterColor, obstacleColor, targetColor } from "../drawing/Colors"
import { drawPath, drawPoint, drawPolygon } from "../drawing/Draw"
import { Polygon } from "../models/Polygon"
import { distance, Vec2 } from "../models/Vec2"

// MARK: Constants
const approximationRadius = 8

// MARK: State
let isCreatingCharacter = false
let isCreatingTarget = false
let isMouseHoveringPoint = false
let movedPoint: Vec2 | undefined = undefined
let hasError = false

// MARK: Objects
export let character = Polygon([])
export let target = Polygon([])
export const obstacles: Polygon[] = []
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
const errorIcon = document.getElementById("errorIcon") as HTMLDivElement
const objectCreationSection = document.getElementById(
    "objectCreationSection"
) as HTMLDivElement
const forwardButton = document.getElementById(
    "forwardButton"
) as HTMLButtonElement

// MARK: Events
export function beginCreateObjects() {
    createCharacterButton.addEventListener("click", onCreateCharacter)
    createTargetButton.addEventListener("click", onCreateTarget)
    createObstacleButton.addEventListener("click", onCreateObstacle)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    objectCreationSection.style.visibility = "visible"
    drawObjectsOnCanvas()
    updateForwardButton()
}

export function endCreateObjects() {
    createCharacterButton.removeEventListener("click", onCreateCharacter)
    createTargetButton.removeEventListener("click", onCreateTarget)
    createObstacleButton.removeEventListener("click", onCreateObstacle)
    canvas.removeEventListener("mousedown", handleMouseDown)
    canvas.removeEventListener("mousemove", handleMouseMove)
    canvas.removeEventListener("mouseup", handleMouseUp)
    objectCreationSection.style.visibility = "hidden"
}

// MARK: - Mouse Down
function handleMouseDown(event: MouseEvent) {
    if (isCreatingCharacter) {
        handleClickOnObject(event, character, stopCreatingCharacter)
    } else if (isCreatingTarget) {
        handleClickOnObject(event, target, stopCreatingTarget)
    } else if (createdObstacle) {
        handleClickOnObject(event, createdObstacle, stopCreatingObstacle)
    }
}

function handleClickOnObject(
    event: MouseEvent,
    object: Polygon,
    done: () => void
) {
    const eventPoint = eventPointToCanvasPoint(event)
    if (event.button === 0) {
        handleLeftClickOnObject(eventPoint, object, done)
        updateUI()
    } else if (event.button === 2) {
        if (handleRightClickOnObject(eventPoint, object)) {
            updateUI()
        }
    }
}

function handleLeftClickOnObject(
    eventPoint: Vec2,
    object: Polygon,
    close: () => void
) {
    const firstPoint = object.points.at(0)
    const lastPoint = object.points.at(object.points.length - 1)

    if (lastPoint && distance(lastPoint, eventPoint) < approximationRadius) {
        movedPoint = lastPoint
    } else if (
        firstPoint &&
        !hasError &&
        object.points.length > 2 &&
        distance(firstPoint, eventPoint) < approximationRadius
    ) {
        close()
    } else if (!hasError) {
        object.points.push(eventPoint)
    }
}

function handleRightClickOnObject(eventPoint: Vec2, object: Polygon): boolean {
    if (object.points.length < 1) {
        return false
    }
    const objectPoint = object.points[object.points.length - 1]
    if (distance(eventPoint, objectPoint) <= approximationRadius) {
        object.points.pop()
        return true
    }
    return false
}

// MARK: - Mouse Move
function handleMouseMove(event: MouseEvent) {
    const point = eventPointToCanvasPoint(event)

    if (movedPoint) {
        movedPoint.x = point.x
        movedPoint.y = point.y
        updateUI()
    } else if (isCreatingCharacter && character.points.length > 2) {
        checkMouseEnterExitOnPoint(point, character.points[0])
    } else if (isCreatingTarget && target.points.length > 2) {
        checkMouseEnterExitOnPoint(point, target.points[0])
    } else if (createdObstacle && createdObstacle.points.length > 2) {
        checkMouseEnterExitOnPoint(point, createdObstacle.points[0])
    }
}

function checkMouseEnterExitOnPoint(eventPoint: Vec2, currentPoint: Vec2) {
    if (hasError) {
        return
    }

    const dist = distance(eventPoint, currentPoint)
    if (isMouseHoveringPoint && approximationRadius < dist) {
        isMouseHoveringPoint = false
        drawObjectsOnCanvas()
    } else if (!isMouseHoveringPoint && dist <= approximationRadius) {
        isMouseHoveringPoint = true
        ctx.reset()
        ctx.fillStyle = "rgb(115, 132, 231)"
        drawPoint(ctx, currentPoint, approximationRadius)
        drawWithoutReset()
    }
}

// MARK: - Mouse Up
function handleMouseUp(event: MouseEvent) {
    movedPoint = undefined
}

// MARK: - Button Actions
function onCreateCharacter(event: MouseEvent) {
    if (isCreatingTarget || createdObstacle) {
        return
    }

    if (isCreatingCharacter) {
        if (character.points.length > 2) {
            stopCreatingCharacter()
        }
    } else {
        startCreatingCharacter()
    }
    drawObjectsOnCanvas()
}

function onCreateTarget(event: MouseEvent) {
    if (isCreatingCharacter || createdObstacle) {
        return
    }

    if (isCreatingTarget) {
        if (target.points.length > 2) {
            stopCreatingTarget()
        }
    } else {
        startCreatingTarget()
    }
    drawObjectsOnCanvas()
}

function onCreateObstacle(event: MouseEvent) {
    if (isCreatingCharacter || isCreatingTarget) {
        return
    }

    if (createdObstacle) {
        if (createdObstacle.points.length > 2) {
            stopCreatingObstacle()
        }
    } else {
        startCreatingObstacle()
    }
    drawObjectsOnCanvas()
}

// MARK: - Start/Stop creating object
function startCreatingCharacter() {
    character = Polygon([])
    isCreatingCharacter = true
    updateCreateCharacterButton()
    updateCreateTargetButton(false)
    updateCreateObstacleButton(false)
    updateForwardButton()
}

function stopCreatingCharacter() {
    normaliseOrientation(character)
    isCreatingCharacter = false
    updateCreateCharacterButton()
    updateCreateTargetButton(true)
    updateCreateObstacleButton(true)
    updateForwardButton()
}

function startCreatingTarget() {
    target = Polygon([])
    isCreatingTarget = true
    updateCreateCharacterButton(false)
    updateCreateTargetButton()
    updateCreateObstacleButton(false)
    updateForwardButton()
}

function stopCreatingTarget() {
    normaliseOrientation(target)
    isCreatingTarget = false
    updateCreateCharacterButton(true)
    updateCreateTargetButton()
    updateCreateObstacleButton(true)
    updateForwardButton()
}

function startCreatingObstacle() {
    createdObstacle = Polygon([])
    updateCreateCharacterButton(false)
    updateCreateTargetButton(false)
    updateCreateObstacleButton()
    updateForwardButton()
}

function stopCreatingObstacle() {
    if (!createdObstacle) return

    normaliseOrientation(createdObstacle)
    obstacles.push(createdObstacle)
    createdObstacle = undefined
    updateCreateCharacterButton(true)
    updateCreateTargetButton(true)
    updateCreateObstacleButton()
    updateForwardButton()
}

// MARK: Drawing
function drawObjectsOnCanvas() {
    ctx.reset()
    drawWithoutReset()
}

function drawWithoutReset() {
    drawCharacter()
    drawTarget()
    drawObstacles()
}

function drawCharacter() {
    const style = characterColor
    ctx.strokeStyle = style
    ctx.fillStyle = style

    if (isCreatingCharacter) {
        drawPath(ctx, character.points)
    } else {
        drawPolygon(ctx, character)
    }
}

function drawTarget() {
    const style = targetColor
    ctx.strokeStyle = style
    ctx.fillStyle = style

    if (isCreatingTarget) {
        drawPath(ctx, target.points)
    } else {
        drawPolygon(ctx, target)
    }
}

function drawObstacles() {
    const style = obstacleColor
    ctx.strokeStyle = style
    ctx.fillStyle = style

    obstacles.forEach((obstacle) => {
        drawPolygon(ctx, obstacle)
    })

    if (createdObstacle) {
        drawPath(ctx, createdObstacle.points)
    }
}

// MARK: Updating UI
function updateUI() {
    drawObjectsOnCanvas()
    if (isCreatingCharacter) {
        hasError = !isConvex(character)
        updateCreateCharacterButton()
    } else if (isCreatingTarget) {
        hasError = !isConvex(target)
        updateCreateTargetButton()
    } else if (createdObstacle) {
        hasError = !isConvex(createdObstacle)
        updateCreateObstacleButton()
    }
    errorIcon.style.visibility = hasError ? "visible" : "hidden"
}

function updateCreateCharacterButton(enabled?: boolean) {
    if (isCreatingCharacter) {
        const enabled = character.points.length > 2 && !hasError
        createCharacterButton.classList.toggle("disabled", !enabled)
    } else if (enabled !== undefined) {
        createCharacterButton.classList.toggle("disabled", !enabled)
    } else {
        createCharacterButton.classList.toggle("disabled", false)
    }
}

function updateCreateTargetButton(enabled?: boolean) {
    if (isCreatingTarget) {
        const enabled = target.points.length > 2 && !hasError
        createTargetButton.classList.toggle("disabled", !enabled)
    } else if (enabled !== undefined) {
        createTargetButton.classList.toggle("disabled", !enabled)
    } else {
        createTargetButton.classList.toggle("disabled", false)
    }
}

function updateCreateObstacleButton(enabled?: boolean) {
    if (createdObstacle) {
        const enabled = createdObstacle.points.length > 2 && !hasError
        createObstacleButton.classList.toggle("disabled", !enabled)
    } else if (enabled !== undefined) {
        createObstacleButton.classList.toggle("disabled", !enabled)
    } else {
        createObstacleButton.classList.toggle("disabled", false)
    }
}

function updateForwardButton() {
    const isDisabled =
        isCreatingCharacter ||
        isCreatingTarget ||
        createdObstacle !== undefined ||
        character.points.length < 3 ||
        target.points.length < 2

    forwardButton.classList.toggle("disabled", isDisabled)
}

// MARK: Utility
function eventPointToCanvasPoint(event: MouseEvent): Vec2 {
    const rect = canvas.getBoundingClientRect()
    return Vec2(event.clientX - rect.x, event.clientY - rect.y)
}
