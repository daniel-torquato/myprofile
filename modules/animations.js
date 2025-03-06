
export function animatorLinear(timeStep, maxTime, animationRender) {
    let timePos = 0;
    const localAnimator = function () {
        if (timePos > maxTime) {
            timePos = 0;
        } else {
            timePos += timeStep;
        }
        animationRender(timePos / maxTime)
    };
    return setInterval(localAnimator, timeStep)
}