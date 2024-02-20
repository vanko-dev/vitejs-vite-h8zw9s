import debounce from 'lodash.debounce';

const track = () => {
  let lastActivity = new Date();

  function activity(act) {
    const res =  (...args) => {
      lastActivity = new Date();
      return  act(...args)
    }
    res.cancel = act.cancel
    return res
  }

  function inactivity(inact) {
    return () => {
      return inact(new Date() - lastActivity)
    }
  }

  return { activity, inactivity  }
}

export const waitForUserInactivityImpl = (callback, ms) => {
    let reportActivity;
    const tracker = track()
  
    const activate = () => {
      reportActivity = tracker.activity(debounce(tracker.inactivity(callback), ms));
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
  