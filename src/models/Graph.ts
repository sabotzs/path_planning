import { Vec2 } from "./Vec2"

export type GraphEdge = {
    to: Vec2
    dist: number
}

export type Graph = Map<Vec2, GraphEdge[]>
