import { createUserActivityDetector } from "./createUserActivityDetector"

export const waitForUserInactivityImpl = (oninactivity, ms) => {
  const TIMEOUT_K = 0.9;
  const TIMEOUT_PRECISION_MS = 1 * 10;

  let activityDetector = createUserActivityDetector();
  let timeout = setTimeout(checkInactivityTime, getNextCheckInMs());

  document.addEventListener("visibilitychange", onVisibilityChange);
  
  function getNextCheckInMs() {
    const nextInMs = (activityDetector.lastActivityTime() + ms - Date.now()) * TIMEOUT_K;
    return Math.max(nextInMs, TIMEOUT_PRECISION_MS);
  }

  function checkInactivityTime() {
    clearTimeout(timeout);

    if (!activityDetector) {
      return
    }

    const inactivityTimeMs = Date.now() - activityDetector.lastActivityTime()
    if (inactivityTimeMs > ms) {
      oninactivity(inactivityTimeMs);
    } else {
      timeout = setTimeout(checkInactivityTime, getNextCheckInMs());
    }
  }

  function onVisibilityChange() {
    if (document.visibilityState === "visible") {
      checkInactivityTime();
    }
  }

  function pause() {
    clearTimeout(timeout);
    activityDetector?.destroy();
    activityDetector = undefined;
  }

  function resume() {
    activityDetector = createUserActivityDetector()
    timeout = setTimeout(checkInactivityTime, getNextCheckInMs())
  }

  function destroy() {
    pause();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  }

  return { pause, resume, cancel: destroy };
}