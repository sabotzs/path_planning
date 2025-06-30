export function setCharacterStyle(ctx: CanvasRenderingContext2D) {
    const color = "rgb(31, 109, 46)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
}

export function setTargetStyle(ctx: CanvasRenderingContext2D) {
    const color = "rgb(231, 201, 36)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
}

export function setObstacleStyle(ctx: CanvasRenderingContext2D) {
    const color = "rgb(0, 0, 0)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
}

export function setVisibilityLineStyle(ctx: CanvasRenderingContext2D) {
    const color = "rgb(180, 90, 90)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
}

export function setShortestPathStyle(ctx: CanvasRenderingContext2D) {
    const color = "rgb(67, 60, 200)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 2
}
