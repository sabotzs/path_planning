import { Polygon } from "../models/Polygon"
import { subtract } from "../models/Vec2"
import { convexHull } from "./ConvexHull"

export function minkowskiSum(first: Polygon, second: Polygon): Polygon {
    const points = first.points.flatMap((a) => {
        return second.points.map((b) => subtract(b, a))
    })

    return Polygon(convexHull(points))
}
