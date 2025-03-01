import { animatorLinear } from '/modules/animations.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var resizeFactor = 0.986;
var adjustedWidth = resizeFactor * width;
var adjustedHeight = resizeFactor * height;
var adjustedRadius = Math.min(adjustedWidth, adjustedHeight) / 2;


canvas.width = adjustedWidth;
canvas.height = adjustedHeight;

var centerX = adjustedWidth / 2;
var centerY = adjustedHeight / 2;

const thisWidth = canvas.width;
const thisHeight = canvas.height;

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.arc(135, 50, 40, 0, 2 * Math.PI);
ctx.strokeStyle = "blue";
ctx.stroke();

var createGrdAnimator = function(outerRadius) {
    var animationRadius = outerRadius * 0.1;
    var maxRadius = outerRadius + animationRadius;
    return function(fraction) {
        var angle = Math.PI * 2 * fraction;
        var [factorX, factorY] = [Math.cos(angle), Math.sin(angle)]
        var animatedCenterX =  animationRadius * factorX;
        var animatedCenterY =  animationRadius * factorY;
        const grd = ctx.createRadialGradient(
            centerX - animatedCenterX,
            centerY - animatedCenterY,
            0,
            centerX + animatedCenterX,
            centerY + animatedCenterY,
            outerRadius
        );
        grd.addColorStop(0, "#FF0000");

        grd.addColorStop(0.7 + .2 * (1 - Math.abs(fraction - 0.5)), "#0000FF");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect(
            centerX - maxRadius,
            centerY - maxRadius,
            centerX + maxRadius,
            centerY + maxRadius
        );
    }
}


var animId = animatorLinear(10, 1000, createGrdAnimator(0.2 * adjustedRadius))

window.addEventListener('resize', (e) => {
    console.log("Resizing " + window.innerWidth + " " + window.innerHeight)
    adjustedWidth = resizeFactor * window.innerWidth;
    adjustedHeight = resizeFactor * window.innerHeight;
    canvas.width = adjustedWidth;
    canvas.height = adjustedHeight;
    clearInterval(animId)
    animId = animatorLinear(10, 1000, createGrdAnimator(0.2 * adjustedRadius))
})





