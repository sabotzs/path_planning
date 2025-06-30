import { beginCreateObjects, endCreateObjects } from "./steps/CreateObject"
import { drawMinkowskiSpace } from "./steps/MinkowskiSpace"
import { nextStep, previousStep, Step, stepDescription } from "./steps/Step"
import { drawVisibilityGraph } from "./steps/VisibilityGraph"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const backwardButton = document.getElementById(
    "backwardButton"
) as HTMLButtonElement
const forwardButton = document.getElementById(
    "forwardButton"
) as HTMLButtonElement
const stepDescriptionLabel = document.getElementById(
    "stepDescription"
) as HTMLLabelElement

let step: Step = "createObject"

window.addEventListener("load", () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    updateNavigationElements()
})

canvas.addEventListener("contextmenu", (event) => event.preventDefault())

backwardButton.addEventListener("click", (event) => {
    const isDisabled = backwardButton.classList.contains("disabled")
    if (isDisabled) {
        return
    }

    const previous = previousStep(step)
    if (previous) {
        step = previous
        updateNavigationElements()
    }
})

forwardButton.addEventListener("click", (event) => {
    const isDisabled = forwardButton.classList.contains("disabled")
    if (isDisabled) {
        return
    }

    const next = nextStep(step)
    if (next) {
        step = next
        updateNavigationElements()
    }
})

function updateNavigationElements() {
    // prettier-ignore
    backwardButton.classList.toggle("disabled", previousStep(step) === undefined)
    forwardButton.classList.toggle("disabled", nextStep(step) === undefined)
    stepDescriptionLabel.textContent = stepDescription(step)

    if (step !== "createObject") {
        endCreateObjects()
    }

    switch (step) {
        case "createObject":
            beginCreateObjects()
            break
        case "minkowskiSum":
            drawMinkowskiSpace()
            break
        case "visibilityGraph":
            drawVisibilityGraph()
            break
        case "dijkstra":
            break
        case "finalAnimation":
            break
    }
}
