export const createUserActivityDetector = () => {
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
  