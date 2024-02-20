import debounce from 'lodash.debounce';

export function setupTimer(element) {
  element.innerHTML = '';

  const setCounter = (start) => {

    return () => {
      // element.innerHTML += `${new Date() - start}<br>`;
      //element.innerHTML += `AAA<br>`;
      waiter.cancel()
      waiter = waitForUserInactivityImpl(setCounter(new Date()), 20 * 1000, element)
    }
  };


  let waiter = waitForUserInactivityImpl(setCounter(new Date()), 20 * 1000, element)

  //element.addEventListener('click', () => setCounter(counter + 1));
  // setTimeout(setCounter(new Date()), 20 * 1000);

  // const a = debounce(setCounter, 20 * 1000);
  //a('111');
}


const makeTracer = (element) => {
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

  const withTraceInactivity = (inactivity) => {
    const result = (...args) => {
      //console.log("inactivity", lastActivity.toTimeString(), new Date().toTimeString(), (new Date() - lastActivity) / 1000 )
      const log = `inactivity ${lastActivity.toLocaleTimeString()} ${new Date().toLocaleTimeString()} ${(new Date() - lastActivity) / 1000}<br>`;
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
  const tracer = makeTracer(element)

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


document.addEventListener("visibilitychange", () => {
  const vis = document.querySelector('#vis')

  if (document.visibilityState === "visible") {
    vis.innerHTML += `${new Date().toLocaleTimeString()} - visible<br>`;
  } else {
    vis.innerHTML += `${new Date().toLocaleTimeString()} - hidden<br>`;
  }
});