import { dijkstra } from "./algorithms/Dijkstra"
import { checkCollision } from "./algorithms/GJK"
import { minkowskiSum } from "./algorithms/MinkowskiSum"
import { visibilityLines } from "./algorithms/VisibilityLine"
import {
    drawLineSegment,
    drawPath,
    drawPoint,
    drawPolygon,
} from "./drawing/Draw"
import {
    setCharacterStyle,
    setTargetStyle,
    setObstacleStyle,
    setVisibilityLineStyle,
    setShortestPathStyle,
} from "./drawing/DrawStyle"
import { Graph } from "./models/Graph"
import {
    offsetPolygon,
    Polygon,
    polygonBoundingBox,
    polygonToLineSegments,
    polygonUnion,
} from "./models/Polygon"
import { Vec2 } from "./models/Vec2"
import {
    beginCreateObjects,
    character,
    endCreateObjects,
    obstacles,
    target,
} from "./steps/CreateObject"
import { nextStep, previousStep, Step, stepDescription } from "./steps/Step"
import scc from "@rtsao/scc"
import rtreeLib from "rtree"

// MARK: - State
let step: Step = "createObject"
let minkowskiSpaceCharacter = Vec2(0, 0)
let minkowskiSpaceTarget = Vec2(0, 0)
let minkowskiSpaceObstacles: Polygon[] = []
let graph: Graph
let shortestPath: Vec2[] = []

// MARK: - Logic
function drawMinkowskiSpace() {
    const pivot = character.points[0]

    minkowskiSpaceCharacter = pivot
    minkowskiSpaceTarget = target.points[0]
    minkowskiSpaceObstacles = obstacles.map((obstacle) => {
        const sum = minkowskiSum(character, obstacle)
        return offsetPolygon(sum, pivot)
    })

    ctx.reset()
    setCharacterStyle(ctx)
    drawPoint(ctx, minkowskiSpaceCharacter)

    setTargetStyle(ctx)
    drawPoint(ctx, minkowskiSpaceTarget)

    setObstacleStyle(ctx)
    minkowskiSpaceObstacles.forEach((obstacle) => drawPolygon(ctx, obstacle))
}

function checkCollisionsAndMakeUnions(obstacles: Polygon[]): Polygon[] {
    const polygonsWithAABB = obstacles.map((obstacle) => {
        return { polygon: obstacle, aabb: polygonBoundingBox(obstacle) }
    })

    const rtree = rtreeLib(obstacles.length)
    polygonsWithAABB.forEach((obstacle) =>
        rtree.insert(obstacle.aabb, obstacle.polygon)
    )

    const graph = new Map<Polygon, Set<Polygon>>()
    polygonsWithAABB.forEach((current) => {
        const overlapping = rtree.search(current.aabb) as Polygon[]
        const colliding = overlapping.filter((other) => {
            return (
                other === current.polygon ||
                checkCollision(current.polygon, other)
            )
        })
        graph.set(current.polygon, new Set(colliding))
    })
    const components = scc(graph)

    return components.map((colliding) => polygonUnion(...colliding))
}

function drawVisibilityGraph() {
    const begin = minkowskiSpaceCharacter
    const end = minkowskiSpaceTarget
    const collidedObstacles = checkCollisionsAndMakeUnions(minkowskiSpaceObstacles)

    const lineSegments = collidedObstacles.flatMap((obstacle) =>
        polygonToLineSegments(obstacle)
    )

    graph = visibilityLines(begin, end, collidedObstacles, lineSegments)

    setVisibilityLineStyle(ctx)
    graph.forEach((edges, vertex) => {
        edges.forEach((edge) => {
            drawLineSegment(ctx, vertex, edge.vertex)
        })
    })
}

function drawShortestPath() {
    shortestPath = dijkstra(
        minkowskiSpaceCharacter,
        minkowskiSpaceTarget,
        graph
    )

    setShortestPathStyle(ctx)
    drawPath(ctx, shortestPath)
}

// MARK: Elements
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const backwardButton = document.getElementById(
    "backwardButton"
) as HTMLButtonElement
const forwardButton = document.getElementById(
    "forwardButton"
) as HTMLButtonElement
const stepDescriptionLabel = document.getElementById(
    "stepDescription"
) as HTMLLabelElement

// MARK: - Events
window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    updateNavigationElements()
})

canvas.addEventListener("contextmenu", (event) => event.preventDefault())

backwardButton.addEventListener("click", (event) => {
    const isDisabled = backwardButton.classList.contains("disabled")
    if (isDisabled) {
        return
    }

    const previous = previousStep(step)
    if (previous) {
        step = previous
        updateNavigationElements()
    }
})

forwardButton.addEventListener("click", (event) => {
    const isDisabled = forwardButton.classList.contains("disabled")
    if (isDisabled) {
        return
    }

    const next = nextStep(step)
    if (next) {
        step = next
        updateNavigationElements()
    }
})

function updateNavigationElements() {
    // prettier-ignore
    backwardButton.classList.toggle("disabled", previousStep(step) === undefined)
    forwardButton.classList.toggle("disabled", nextStep(step) === undefined)
    stepDescriptionLabel.textContent = stepDescription(step)

    if (step !== "createObject") {
        endCreateObjects()
    }

    switch (step) {
        case "createObject":
            beginCreateObjects()
            break
        case "minkowskiSum":
            drawMinkowskiSpace()
            break
        case "visibilityGraph":
            drawVisibilityGraph()
            break
        case "dijkstra":
            drawShortestPath()
            break
        case "finalAnimation":
            break
    }
}
