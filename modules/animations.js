
export function animatorLinear(timeStep, maxTime, animationRender) {
  var timePos = 0;
  var localAnimator = function() {
      if (timePos == maxTime) {
          timePos = 0;
      }
      animationRender(timePos / maxTime)
      timePos += timeStep;
  }
  return setInterval(localAnimator, timeStep)
}