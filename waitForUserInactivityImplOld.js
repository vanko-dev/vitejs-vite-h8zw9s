import debounce from 'lodash.debounce';

export const waitForUserInactivityImpl = (callback, ms) => {
    let reportActivity;
    //const tracer = makeTracer(element, "old")
  
    const activate = () => {
      //const callbackWithTrace = tracer.withTraceInactivity(callback)
      reportActivity = debounce(callback, ms);
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
  


//   export const waitForUserInactivityImpl(callback, ms, element) => {
//     let reportActivity;
//     const tracer = makeTracer(element, "old")
  
//     const activate = () => {
//       const callbackWithTrace = tracer.withTraceInactivity(callback)
//       reportActivity = tracer.withTraceActivity(debounce(callbackWithTrace, ms));
//       reportActivity("start");
  
//       document.addEventListener("mousemove", reportActivity, true);
//       document.addEventListener("touchstart", reportActivity, true);
//       document.addEventListener("keydown", reportActivity, true);
//       // This custom event listener has been added in to monitor when a user does a spin on a casino game
//       document.addEventListener("spinevent", reportActivity, true);
//     };
  
//     const deactivate = () => {
//       reportActivity.cancel();
//       document.removeEventListener("mousemove", reportActivity, true);
//       document.removeEventListener("touchstart", reportActivity, true);
//       document.removeEventListener("keydown", reportActivity, true);
//       document.removeEventListener("spinevent", reportActivity, true);
//     };
  
//     activate();
  
//     return {
//       cancel: deactivate,
//       pause: deactivate,
//       resume: activate,
//     };
//   }
  