import { Vec2 } from "./Vec2"

export type GraphEdge = {
    vertex: Vec2
    distance: number
}

export type Graph = Map<Vec2, GraphEdge[]>
