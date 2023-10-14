/*
 * Create an animation frame with a specified callback with
 * a target frame rate.
 */
export const createAnimationFrame = (
  callback,
  targetFrameRate,
  timePrevious,
  timeCurrent
) => {
  if (typeof timePrevious === 'number' && typeof timeCurrent === 'number') {
    const timeDelta = timeCurrent - timePrevious;
    if (
      typeof targetFrameRate !== 'number' ||
      timeDelta >= 1000 / targetFrameRate
    ) {
      const success = callback(timeDelta);
      if (!success) {
        return null;
      }
      timePrevious = timeCurrent;
    }
  } else {
    timePrevious = timeCurrent;
  }

  return window.requestAnimationFrame((timeCurrent) =>
    createAnimationFrame(callback, targetFrameRate, timePrevious, timeCurrent)
  );
};
