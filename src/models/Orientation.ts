export type Orientation = "left" | "right"

export class OrientationError extends Error {
    readonly type = "orientation-error"
}

// export function getOrientation(
//     polygon: Polygon
// ): Result<Orientation, OrientationError> {
//     if (polygon.points.length < 3) {
//         return Result.ok("right")
//     }

//     let orientation: Orientation | undefined

//     for (let i = 0; i < polygon.points.length - 2; ++i) {
//         const product = cross3(
//             polygon.points[i],
//             polygon.points[i + 1],
//             polygon.points[i + 2]
//         )
//         const currentOrientation = areaToOrientation(product)

//         if (orientation && currentOrientation !== orientation) {
//             return Result.error(new OrientationError("Not a convex polygon"))
//         }

//         if (!orientation) {
//             orientation = currentOrientation
//         }
//     }
//     return Result.ok(orientation!)
// }

// function areaToOrientation(area: number): Orientation | undefined {
//     if (strictlyLess(area, 0)) {
//         return "left"
//     } else if (strictlyLess(0, area)) {
//         return "right"
//     } else {
//         return undefined
//     }
// }

// export function normaliseOrientation(polygon: Polygon) {
//     if (polygon.points.length < 3) {
//         return
//     }

//     const orientation = getOrientation(polygon)
//     orientation.onSuccess((orientation) => {
//         if (orientation === "left") {
//             polygon.points.reverse()
//         }
//     })
// }
