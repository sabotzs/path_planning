import { beginCreateObjects } from "./steps/CreateObject"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    beginCreateObjects()
})

canvas.addEventListener("contextmenu", (event) => event.preventDefault())
