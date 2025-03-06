import {addRectangle} from "/modules/elements.js";
import {addBubble, createGrdAnimator} from "/modules/circle.js";
import {rgba} from "/modules/color.js";
import {animatorLinear} from "/modules/animations.js";

export class BackgroundHandler {
    constructor(canvas, centerX, centerY, radius) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = centerX;
        this.y = centerY;
        this.radius = radius;
        this.#animate()
    }

    #animate() {
        addRectangle(this.canvas)
        let animator = createGrdAnimator(
            this.ctx,
            this.x,
            this.y,
            rgba(1, 0, 0, 1),
            rgba(0, 0, 1, 1),
            0.1 * this.radius,
            0.01 * this.radius,
        );
        this.animId = animatorLinear(10, 1000, animator);
    }

    #stop() {
        clearInterval(this.animId);
    }


    resize(newX, newY, newR) {
        [this.x, this.y, this.radius] = [newX, newY, newR];
        this.#stop()
        this.#animate();
    }
}