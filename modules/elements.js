export function createCanvas(width, height) {
    const canvas = document.createElement("canvas")

    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export function addRectangle(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.arc(135, 50, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}