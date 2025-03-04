import {addCircleWithContext, addContext} from "/modules/elements.js";
import {rgba} from "/modules/color.js";

export class MouseHandler {
    constructor(canvas, x, y, radius, lineWidth = 10) {
        this.canvas = canvas;
        this.x = x;
        this.oldX = x;
        this.oldY = y;
        this.y = y;
        this.maxRadius = radius;
        this.radius = 0;
        this.lineWidth = lineWidth;
        this.ctx = canvas.getContext("2d");
        this.canvas.addEventListener('pointerleave', (_) => {
            //this.stop()
            this.clean()
           // this.animId = -1;
        })
    }

    clean() {
        this.ctx.clearRect(
            this.oldX - this.maxRadius - this.lineWidth,
            this.oldY - this.maxRadius - this.lineWidth,
            2 * (this.maxRadius + this.lineWidth),
            2 * (this.maxRadius + this.lineWidth)
        )
    }

    stop() {
        clearInterval(this.animId);
    }

    start(stepMS, periodMS) {
        this.animTime = 0;
        this.animId = setInterval(() => {
            if (this.animTime === periodMS) {
                this.animTime = 0;
            }
            this.radius = this.maxRadius * (this.animTime / periodMS);
            this.draw()
            this.animTime += stepMS;
        }, stepMS)
    }

    draw() {
        this.clean()
        addCircleWithContext(
            this.ctx,
            this.x, this.y,
            this.radius,
            rgba(1, 0, 0, 1),
            this.lineWidth
        )
        this.oldX = this.x;
        this.oldY = this.y;
    }


    reload(newX, newY) {
        if (this.animTime === -1) {
           // this.start(10, 1000)
        }
        this.x = newX
        this.y = newY
    }

}