const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(50, 50)
ctx.stroke()
ctx.closePath()
