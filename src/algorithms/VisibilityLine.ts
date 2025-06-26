import { AvlTree } from "@datastructures-js/binary-search-tree"
import {
    cross3,
    distance,
    distanceSquared,
    subtract,
    Vec2,
} from "../models/Vec2"
import { LineSegment } from "../models/LineSegment"
import { approxEqVec, strictlyLess } from "./Float"
import { angleComparePoints, castRay, distanceCompareSegments } from "./Utils"
import { Polygon } from "../models/Polygon"
import { Graph, GraphEdge } from "../models/Graph"

type EventType = "start" | "end"

type Event = {
    point: Vec2
    segment?: LineSegment
    type: EventType
}

export function visibilityLines(
    start: Vec2,
    target: Vec2,
    obstacles: Polygon[],
    segments: LineSegment[]
): Graph {
    const result = new Map<Vec2, GraphEdge[]>()
    result.set(start, visibilityFromPoint(start, segments, undefined, target))
    result.set(target, visibilityFromPoint(target, segments, start, undefined))

    obstacles.forEach((obstacle) => {
        obstacle.points.forEach((point, index) => {
            const nextIndex = (index + 1) % obstacle.points.length
            const prevIndex =
                (obstacle.points.length + index - 1) % obstacle.points.length
            const visiblePoints = visibilityFromPoint(
                point,
                segments,
                start,
                target,
                obstacle.points[prevIndex],
                obstacle.points[nextIndex]
            )
            result.set(point, visiblePoints)
        })
    })

    return result
}

export function visibilityFromPoint(
    origin: Vec2,
    segments: LineSegment[],
    start: Vec2 | undefined,
    target: Vec2 | undefined,
    prev?: Vec2,
    next?: Vec2
): GraphEdge[] {
    const events: Event[] = []
    const openEdges = new AvlTree<LineSegment>((a, b) =>
        distanceCompareSegments(origin, a, b)
    )
    generateEventsAndOpenEdges(origin, segments, events, openEdges)
    if (start) {
        events.push({ point: start, type: "end" })
    }
    if (target) {
        events.push({ point: target, type: "end" })
    }
    sortEvents(origin, events)
    const visiblePoints = processEvents(origin, events, openEdges, prev, next)
    return visiblePoints.map((point) => {
        return { vertex: point, distance: distance(origin, point) }
    })
}

function generateEventsAndOpenEdges(
    origin: Vec2,
    segments: LineSegment[],
    events: Event[],
    openEdges: AvlTree<LineSegment>
) {
    for (const segment of segments) {
        const oab = cross3(origin, segment.a, segment.b)

        if (strictlyLess(0, oab)) {
            events.push({ point: segment.a, segment: segment, type: "start" })
            events.push({ point: segment.b, segment: segment, type: "end" })
        } else if (strictlyLess(oab, 0)) {
            events.push({ point: segment.b, segment: segment, type: "start" })
            events.push({ point: segment.a, segment: segment, type: "end" })
        } else {
            continue
        }

        const intersection = castRay(origin, Vec2(1, 0), segment)
        if (
            intersection &&
            !approxEqVec(intersection, segment.a) &&
            !approxEqVec(intersection, segment.b)
        ) {
            openEdges.insert(segment)
        }
    }
}

function sortEvents(origin: Vec2, events: Event[]) {
    events.sort((first, second) => {
        const a = first.point
        const b = second.point
        if (approxEqVec(a, b)) {
            if (first.type === "end" && second.type === "start") {
                return -1
            } else if (first.type === "start" && second.type === "end") {
                return 1
            } else {
                return 0
            }
        }
        return angleComparePoints(origin, a, b)
    })
}

function processEvents(
    origin: Vec2,
    events: Event[],
    openEdges: AvlTree<LineSegment>,
    prev?: Vec2,
    next?: Vec2
): Vec2[] {
    const inVisibleHalfPlane = (eventPoint: Vec2) => {
        if (prev && next) {
            const ope = cross3(origin, prev, eventPoint)
            const one = cross3(origin, next, eventPoint)
            return !strictlyLess(ope, 0) || !strictlyLess(0, one)
        } else {
            return true
        }
    }
    const visible: Vec2[] = []

    for (const event of events) {
        if (event.type === "end" && event.segment) {
            openEdges.remove(event.segment)
        }

        if (inVisibleHalfPlane(event.point)) {
            if (openEdges.count() === 0) {
                visible.push(event.point)
            } else {
                const nearest = openEdges.min()!.getValue()
                const direction = subtract(event.point, origin)
                const intersection = castRay(origin, direction, nearest)

                if (!intersection) {
                    visible.push(event.point)
                } else {
                    const distEventPoint = distanceSquared(origin, event.point)
                    const distIntersection = distanceSquared(
                        origin,
                        intersection
                    )
                    if (strictlyLess(distEventPoint, distIntersection)) {
                        visible.push(event.point)
                    }
                }
            }
        }

        if (event.type === "start" && event.segment) {
            openEdges.insert(event.segment)
        }
    }

    return visible
}
