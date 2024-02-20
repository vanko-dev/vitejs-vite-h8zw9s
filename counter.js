import debounce from 'lodash.debounce';

export function setupTimer(element) {
  element.innerHTML = '';
  const INACTIVITY_TIMEOUT_MS = 20 * 1000

  const setCounter = (start) => {

    return () => {
      // element.innerHTML += `${new Date() - start}<br>`;
      //element.innerHTML += `AAA<br>`;
      waiterOld.cancel()
      waiterOld = waitForUserInactivityImpl(setCounter(new Date()), INACTIVITY_TIMEOUT_MS,  document.querySelector('#vis'))

      // waiterNew.cancel()
      // waiterNew = waitForUserInactivityImplNew(setCounter(new Date()), INACTIVITY_TIMEOUT_MS, element)
    }
  };


  let waiterOld = waitForUserInactivityImpl(setCounter(new Date()), INACTIVITY_TIMEOUT_MS,  document.querySelector('#vis'))
  // let waiterNew = waitForUserInactivityImplNew(setCounter(new Date()), INACTIVITY_TIMEOUT_MS, element)
  // let timer = setTimeout(setCounter(new Date()), INACTIVITY_TIMEOUT_MS)

  //element.addEventListener('click', () => setCounter(counter + 1));
  // setTimeout(setCounter(new Date()), 20 * 1000);

  // const a = debounce(setCounter, 20 * 1000);
  //a('111');
}


const makeTracer = (element, prefix = "") => {
  let lastActivity = new Date()

  const withTraceActivity = (reportActivity) => {
    const result = (...args) => {
      // console.log("activity", new Date().toTimeString(), ...args)
      lastActivity = new Date()
      reportActivity(...args)
    }

    result.cancel = reportActivity.cancel
    return result
  }

  const round = (ms) => Math.round(ms * 10)/10

  const withTraceInactivity = (inactivity) => {
    const result = (...args) => {
      //const log = `${prefix} inactivity ${lastActivity.toLocaleTimeString()} ${new Date().toLocaleTimeString()} ${round((new Date() - lastActivity) / 1000)}<br>`;
      const log = `${prefix} inactivity ${new Date().toLocaleTimeString()} ${round((new Date() - lastActivity) / 1000)}<br>`;
      console.log(log)
      element.innerHTML += `${log}<br>`;
      inactivity(...args)
    }

    result.cancel = inactivity.cancel
    return result
  }

  return { withTraceActivity, withTraceInactivity }
}

function waitForUserInactivityImpl(callback, ms, element) {
  let reportActivity;
  const tracer = makeTracer(element, "old")

  const activate = () => {
    const callbackWithTrace = tracer.withTraceInactivity(callback)
    reportActivity = tracer.withTraceActivity(debounce(callbackWithTrace, ms));
    reportActivity("start");

    document.addEventListener("mousemove", reportActivity, true);
    document.addEventListener("touchstart", reportActivity, true);
    document.addEventListener("keydown", reportActivity, true);
    // This custom event listener has been added in to monitor when a user does a spin on a casino game
    document.addEventListener("spinevent", reportActivity, true);
  };

  const deactivate = () => {
    reportActivity.cancel();
    document.removeEventListener("mousemove", reportActivity, true);
    document.removeEventListener("touchstart", reportActivity, true);
    document.removeEventListener("keydown", reportActivity, true);
    document.removeEventListener("spinevent", reportActivity, true);
  };

  activate();

  return {
    cancel: deactivate,
    pause: deactivate,
    resume: activate,
  };
}


function waitForUserInactivityImplNew(callback, ms, element) {
  const TIMEOUT_K = 0.9;
  const TIMEOUT_PRECISION_MS = 1 * 1000;

  const trace = makeTracer(element, "new")
  callback = trace.withTraceInactivity(callback)

  const activityDetector = createUserActivityDetector();

  document.addEventListener("visibilitychange", onVisibilityChange);
  const getNextCheckInMs = () => Math.max((activityDetector.lastActivityTime() + ms - Date.now()) * TIMEOUT_K, TIMEOUT_PRECISION_MS);

  const timeout = setTimeout(checkInactivityTime, getNextCheckInMs());

  function resume() {
    // todo
  }

  function checkInactivityTime() {
    const lastActivityTime = activityDetector.lastActivityTime();
    clearTimeout(timeout);
    if (Date.now() - lastActivityTime > ms) {
      callback();
    } else {
      setTimeout(checkInactivityTime, getNextCheckInMs());
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

const createUserActivityDetector = () => {
  let lastActivityTime = Date.now();

  const reportActivity = () => {
    lastActivityTime = Date.now();
  };

  document.addEventListener("mousemove", reportActivity, true);
  document.addEventListener("touchstart", reportActivity, true);
  document.addEventListener("keydown", reportActivity, true);
  // This custom event listener has been added in to monitor when a user does a spin on a casino game
  document.addEventListener("spinevent", reportActivity, true);

  return {
    lastActivityTime: () => lastActivityTime,

    destroy: () => {
      document.removeEventListener("mousemove", reportActivity, true);
      document.removeEventListener("touchstart", reportActivity, true);
      document.removeEventListener("keydown", reportActivity, true);
      document.removeEventListener("spinevent", reportActivity, true);
    },
  };
};


// document.addEventListener("visibilitychange", () => {
//   const vis = document.querySelector('#vis')

//   if (document.visibilityState === "visible") {
//     vis.innerHTML += `${new Date().toLocaleTimeString()} - visible<br>`;
//   } else {
//     vis.innerHTML += `${new Date().toLocaleTimeString()} - hidden<br>`;
//   }
// });