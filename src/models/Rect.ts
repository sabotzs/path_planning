export type Rect = {
    x: number
    y: number
    w: number
    h: number
}

export function Rect(x: number, y: number, w: number, h: number): Rect {
    return { x: x, y: y, w: w, h: h }
}
