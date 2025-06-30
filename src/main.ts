import { beginCreateObjects, endCreateObjects } from "./steps/CreateObject"
import { nextStep, previousStep, Step, stepDescription } from "./steps/Step"

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
    const previous = previousStep(step)
    if (previous) {
        step = previous
        updateNavigationElements()

        if (step === "createObject") {
            beginCreateObjects()
        }
    }
})

forwardButton.addEventListener("click", (event) => {
    const next = nextStep(step)
    if (next) {
        if (step === "createObject") {
            endCreateObjects()
        }
        step = next
        updateNavigationElements()
    }
})

function updateNavigationElements() {
    backwardButton.style.visibility =
        previousStep(step) === undefined ? "hidden" : "visible"
    forwardButton.style.visibility =
        nextStep(step) === undefined ? "hidden" : "visible"
    stepDescriptionLabel.textContent = stepDescription(step)
}
