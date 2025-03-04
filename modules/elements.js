export function createCanvas(width, height, level = 0) {
    const canvas = document.createElement("canvas")
    canvas.style = "z-index:" + level + "; cursor: none; width: 100%; height: 100%; position: absolute; background-color: #00000000"
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export function addContext(canvas, type = "2d") {
    return canvas.getContext(type)
}

export function addRectangle(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.arc(135, 50, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    return ctx
}

export function addCircle(canvas, centerX, centerY, radius, color, lineWidth) {
    const ctx = canvas.getContext("2d");
    addCircleWithContext(ctx, centerX, centerY, radius, color, lineWidth)
    return ctx
}

export function addCircleWithContext(ctx, centerX, centerY, radius, color, lineWidth) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}