import {createUserActivityDetector} from "./createUserActivityDetector"

export const waitForUserInactivityImpl = (oninactivity, ms) => {
    const TIMEOUT_K = 0.9;
    const TIMEOUT_PRECISION_MS = 1 * 10;
  
    const activityDetector = createUserActivityDetector();
  
    document.addEventListener("visibilitychange", onVisibilityChange);
    const getNextCheckInMs = () => Math.max((activityDetector.lastActivityTime() + ms - Date.now()) * TIMEOUT_K, TIMEOUT_PRECISION_MS);
  
    let timeout = setTimeout(checkInactivityTime, getNextCheckInMs());
  
    function resume() {
      // todo
    }
  
    function checkInactivityTime() {
      const lastActivityTime = activityDetector.lastActivityTime();
      clearTimeout(timeout);
      
      const inactivityTimeMs = Date.now() - lastActivityTime

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
      // todo
    }
  
    function destroy() {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      activityDetector?.destroy();
    }
  
    return { pause, resume, cancel: destroy };
  }