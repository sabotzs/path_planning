export function setCharacterColor(ctx: CanvasRenderingContext2D) {
    const color = "rgb(31, 109, 46)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
}

export function setTargetColor(ctx: CanvasRenderingContext2D) {
    const color = "rgb(231, 201, 36)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
}

export function setObstacleColor(ctx: CanvasRenderingContext2D) {
    const color = "rgb(0, 0, 0)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
}

export function setVisibilityLineColor(ctx: CanvasRenderingContext2D) {
    const color = "rgb(180, 90, 90)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
}

export function setShortestPathColor(ctx: CanvasRenderingContext2D) {
    const color = "rgb(67, 60, 200)"
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 2
}
