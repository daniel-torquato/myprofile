export function createGrdAnimator(
    ctx,
    centerX,
    centerY,
    innerColor,
    outerColor,
    outerRadius,
    animationRadius
) {
    return function (fraction) {
       addBubble(
           ctx,
           centerX,
           centerY,
           fraction,
           animationRadius,
           outerRadius,
           innerColor,
           outerColor
       )
    }
}

export function addBubble(
    ctx,
    centerX,
    centerY,
    fraction,
    rotateRadius,
    outerRadius,
    innerColor,
    outerColor
) {
    let maxRadius = outerRadius + rotateRadius;
    let externalRadius = 2 * maxRadius;
    ctx.clearRect(
        centerX - externalRadius,
        centerY - externalRadius,
        2 * externalRadius,
        2 * externalRadius
    );
    ctx.globalCompositeOperation = "source-over"
    addRotatingCircle(ctx, centerX, centerY, Math.PI * 2 * fraction, rotateRadius, outerRadius, externalRadius, [
        [0, innerColor],
        [0.7 + .2 * (1 - Math.abs(fraction - 0.5)), outerColor],
        [1, "#00000000"]
    ]);

    const auraFraction = (fraction <= 1 / 2) * (2 * fraction) + (fraction > 1 / 2) * (2 * fraction - 1)

    addAura(ctx, centerX, centerY, auraFraction * 2 * maxRadius, externalRadius, [
        [0, "#00000000"],
        [0.5, "#00000000"],
        [0.9, "rgba(255, 255, 0, " + 0.3 * (1 - auraFraction) * auraFraction + " )"],
        [1, "#00000000"],
    ]);
}

export function addRotatingCircle(ctx, centerX, centerY, angle, rotateRadius, outerRadius, externalRadius, colorMap) {
    let [factorX, factorY] = [Math.cos(angle), Math.sin(angle)]
    let animatedCenterX = rotateRadius * factorX;
    let animatedCenterY = rotateRadius * factorY;
    const grd = ctx.createRadialGradient(
        centerX - animatedCenterX,
        centerY - animatedCenterY,
        0,
        centerX + animatedCenterX,
        centerY + animatedCenterY,
        outerRadius
    );
    for (let i = 0; i < colorMap.length; i++) {
        let [distance, color] = colorMap[i];
        grd.addColorStop(distance, color);
    }
    ctx.fillStyle = grd;
    ctx.fillRect(
        centerX - externalRadius,
        centerY - externalRadius,
        2 * externalRadius,
        2 * externalRadius
    );
}


/**
 * Add simple circular aura to canvas.
 * @param canvasCtx
 * @param centerX
 * @param centerY
 * @param radius
 * @param externalRadius
 * @param colorMap
 */
export function addAura(canvasCtx, centerX, centerY, radius, externalRadius, colorMap) {
    const bGrd = canvasCtx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
    );
    for (let i = 0; i < colorMap.length; i++) {
        let [distance, color] = colorMap[i];
        bGrd.addColorStop(distance, color);
    }
    canvasCtx.fillStyle = bGrd;
    canvasCtx.fillRect(
        centerX - externalRadius,
        centerY - externalRadius,
        2 * externalRadius,
        2 * externalRadius
    );
}


