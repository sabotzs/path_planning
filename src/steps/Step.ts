export type Step =
    | "createObject"
    | "minkowskiSum"
    | "visibilityGraph"
    | "dijkstra"

export function nextStep(step: Step): Step | undefined {
    switch (step) {
        case "createObject":
            return "minkowskiSum"
        case "minkowskiSum":
            return "visibilityGraph"
        case "visibilityGraph":
            return "dijkstra"
        case "dijkstra":
            return undefined
    }
}

export function previousStep(step: Step): Step | undefined {
    switch (step) {
        case "createObject":
            return undefined
        case "minkowskiSum":
            return "createObject"
        case "visibilityGraph":
            return "minkowskiSum"
        case "dijkstra":
            return "visibilityGraph"
    }
}

export function stepDescription(step: Step): string {
    switch (step) {
        case "createObject":
            return "Create Object"
        case "minkowskiSum":
            return "Minkowski Space"
        case "visibilityGraph":
            return "Visibility Graph"
        case "dijkstra":
            return "Shortest path"
    }
}
