
export function createGrdAnimator(
    canvas,
    centerX,
    centerY,
    innerColor,
    outerColor,
    outerRadius,
    animationRadius
) {
    var maxRadius = outerRadius + animationRadius;
    const ctx = canvas.getContext("2d");
    const externalRadius = 2 * maxRadius
    return function(fraction) {
        ctx.clearRect(
             centerX - externalRadius,
             centerY - externalRadius,
             centerX + externalRadius,
             centerY + externalRadius
        );
        ctx.globalCompositeOperation = "source-over"
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
       grd.addColorStop(0, innerColor);
       grd.addColorStop(0.7 + .2 * (1 - Math.abs(fraction - 0.5)), outerColor);
       grd.addColorStop(1, "#00000000");
       ctx.fillStyle = grd;
       ctx.fillRect(
           centerX - externalRadius,
           centerY - externalRadius,
           2 * externalRadius,
           2 * externalRadius
       );

       const bFraction = (fraction <= 1/2)*(2*fraction) + (fraction > 1/2)*(2*fraction - 1)
       const bGrd = ctx.createRadialGradient(
           centerX,
           centerY,
           0,
           centerX,
           centerY,
           bFraction * 2 * maxRadius
       );
       bGrd.addColorStop(0, "#00000000");
       bGrd.addColorStop(0.5, "#00000000");
       bGrd.addColorStop(0.9, "rgba(255, 255, 0, " + 0.3 * (1 - bFraction) * bFraction + " )");
       bGrd.addColorStop(1, "#00000000");
       ctx.fillStyle = bGrd;
       ctx.fillRect(
           centerX - externalRadius,
           centerY - externalRadius,
           2 * externalRadius,
           2 * externalRadius
       );
    }
}


