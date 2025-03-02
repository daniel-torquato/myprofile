import { createCanvas, addRectangle } from "/modules/elements.js"
import { getSize } from "/modules/utils.js"
import { createGrdAnimator } from "/modules/circle.js"
import { animatorLinear } from "/modules/animations.js"
import { rgba } from "/modules/color.js"

var [width, height] = getSize()

var newCanvas = createCanvas(width, height)
addRectangle(newCanvas)

document.body.appendChild(newCanvas)

var maxRadius = Math.min(width, height)
var resizeFactor = 0.986;
var [centerX, centerY] = [width / 2, height / 2]
var grdAnimator = createGrdAnimator(
    newCanvas,
    centerX,
    centerY,
    rgba(1, 0, 0, 1),
    rgba(0, 0, 1, 1),
    0.1 * maxRadius,
    0.01 * maxRadius
)
animatorLinear(10, 1000, grdAnimator)

