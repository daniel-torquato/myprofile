import { createCanvas, addRectangle, addCircle, addCircleWithContext, addContext } from "/modules/elements.js"
import { getSize } from "/modules/utils.js"
import { createGrdAnimator } from "/modules/circle.js"
import { animatorLinear } from "/modules/animations.js"
import { rgba } from "/modules/color.js"
import { MouseHandler } from "/modules/mouseHandler.js"

document.body.style = 'width: 100%;'
+ 'height: 100%;'
+ 'color: black;'
+ 'color: red;'
+ 'margin-right: 0px;'
+ 'margin-top: 0px;'
+ 'background-color: black;'
+ 'overflow-x: hidden;'
+ 'overflow-y: hidden;'

var [width, height] = getSize()

var newCanvas = createCanvas(width, height)
const mouseCanvas = createCanvas(width, height, 2)

document.body.appendChild(mouseCanvas)
document.body.appendChild(newCanvas)


addRectangle(newCanvas)
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

const handler = new MouseHandler(mouseCanvas, centerX, centerY, 100);

handler.start(10, 1000)
document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    handler.reload(clientX, clientY);
}

