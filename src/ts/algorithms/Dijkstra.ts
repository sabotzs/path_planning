import { Graph, GraphEdge } from "../models/Graph"
import { Vec2 } from "../models/Vec2"
import { FibonacciHeap, INode } from "@tyriar/fibonacci-heap"

export function dijkstra(start: Vec2, target: Vec2, graph: Graph): Vec2[] {
    const queue = new FibonacciHeap<GraphEdge, any>((a, b) => {
        return a.key.distance - b.key.distance
    })
    const parent = new Map<Vec2, Vec2>()
    const distance = new Map<Vec2, number>()
    const vertexNodeInQueue = new Map<Vec2, INode<GraphEdge, any>>()

    distance.set(start, 0)
    queue.insert({ vertex: start, distance: 0 })

    while (!queue.isEmpty()) {
        const current = queue.extractMinimum()!.key.vertex

        if (current === target) {
            return reconstructPath(target, parent)
        }

        for (const edge of graph.get(current)!) {
            const adjacent = edge.vertex
            const newDistance = distance.get(current)! + edge.distance
            const oldDistance = distance.get(adjacent)

            if (oldDistance == undefined || newDistance < oldDistance) {
                parent.set(adjacent, current)
                distance.set(adjacent, newDistance)

                const newPriority: GraphEdge = {
                    vertex: adjacent,
                    distance: newDistance,
                }
                const node = vertexNodeInQueue.get(adjacent)
                if (node) {
                    queue.decreaseKey(node, newPriority)
                } else {
                    const newNode = queue.insert(newPriority)
                    vertexNodeInQueue.set(adjacent, newNode)
                }
            }
        }
    }

    return []
}

function reconstructPath(target: Vec2, parents: Map<Vec2, Vec2>): Vec2[] {
    let current = target

    const result = [current]
    while (parents.has(current)) {
        current = parents.get(current)!
        result.push(current)
    }

    return result.reverse()
}
