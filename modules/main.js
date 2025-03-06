import { createCanvas, addRectangle } from "/modules/elements.js"
import { getSize } from "/modules/utils.js"
import { createGrdAnimator } from "/modules/circle.js"
import { animatorLinear } from "/modules/animations.js"
import { rgba } from "/modules/color.js"
import { MouseHandler } from "/modules/mouseHandler.js"
import {BackgroundHandler} from "/modules/backgroundHandler.js";

document.body.style = 'width: 100%;'
    + 'height: 100%;'
    + 'color: black;'
    + 'background-color: black;'
    + 'margin-right: 0px;'
    + 'margin-top: 0px;'
    + 'overflow-x: hidden;'
    + 'overflow-y: hidden;'

const [width, height] = getSize()
const [centerX, centerY] = [width / 2, height / 2];
const maxRadius = Math.min(width, height) / 2;

const background = createCanvas(width, height)
const mouseCanvas = createCanvas(width, height, 2)

document.body.appendChild(mouseCanvas)
document.body.appendChild(background)

const bgHandler = new BackgroundHandler(background, centerX, centerY, maxRadius);
const handler = new MouseHandler(mouseCanvas, centerX, centerY, 20);

document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    handler.reload(clientX, clientY);
}

document.body.onresize = (ev) => {
    const [width, height] = getSize()
    background.width = width;
    background.height = height;
    mouseCanvas.width = width;
    mouseCanvas.height = height;
    bgHandler.resize(width / 2 , height / 2, Math.min(width, height) / 2);
}

