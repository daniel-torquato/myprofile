import {addCircleWithContext, addContext} from "/modules/elements.js";
import {rgba} from "/modules/color.js";

export class MouseHandler {

    constructor(canvas, x, y, radius, lineWidth = 10) {
        this.canvas = canvas;
        this.animStep = 16;
        this.animPeriod = 400;
        this.x = x;
        this.oldX = x;
        this.oldY = y;
        this.y = y;
        this.radius = radius;
        this.animFactor = 0;
        this.lineWidth = lineWidth;
        this.ctx = canvas.getContext("2d");
        this.canvas.addEventListener('pointerleave', (_) => {
            this.stop()
            this.clean()
            this.animId = -1;
        })
        this.canvas.addEventListener('pointerenter', (_) => {
            if (this.animId < 0)
                this.start()
        })
        this.start()
    }

    clean() {
        this.ctx.clearRect(
            this.oldX - this.radius - this.lineWidth,
            this.oldY - this.radius - this.lineWidth,
            2 * (this.radius + this.lineWidth),
            2 * (this.radius + this.lineWidth)
        )
    }

    stop() {
        clearInterval(this.animId);
    }

    start() {
        this.animTime = 0;
        this.animId = setInterval(() => {
            if (this.animTime > this.animPeriod) {
                this.animTime = 0;
            } else {
                this.animTime += this.animStep;
            }
            this.animFactor = this.animTime / this.animPeriod;
            this.#draw()
        }, this.animStep);
    }

    #draw() {
        this.clean()
        this.#drawPointer(
            this.x,
            this.y,
            this.radius * this.animFactor,
            rgba(1 - this.animFactor, 0, 1 - this.animFactor, 0.8),
            this.lineWidth * (1 - this.animFactor),
        )
        this.oldX = this.x;
        this.oldY = this.y;
    }

    #drawPointer(
        x, y, radius, color, lineWidth,
    ) {
        addCircleWithContext(
            this.ctx,
            x, y,
            radius,
            color,
            lineWidth,
        )
    }


    reload(newX, newY) {
        this.x = newX
        this.y = newY
    }

}