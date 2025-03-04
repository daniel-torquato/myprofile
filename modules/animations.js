
export function animatorLinear(timeStep, maxTime, animationRender) {
    let timePos = 0;
    const localAnimator = function () {
        if (timePos === maxTime) {
            timePos = 0;
        }
        animationRender(timePos / maxTime)
        timePos += timeStep;
    };
    return setInterval(localAnimator, timeStep)
}