import debounce from 'lodash.debounce';

export function setupTimer(element) {
  element.innerHTML = '';

  const setCounter = (start) => {

    return () => {
    // element.innerHTML += `${new Date() - start}<br>`;
    element.innerHTML += `AAA<br>`;
   }

    
  };

  waitForUserInactivityImpl(setCounter, 3 * 1000)

  //element.addEventListener('click', () => setCounter(counter + 1));
  // setTimeout(setCounter(new Date()), 20 * 1000);

  // const a = debounce(setCounter, 20 * 1000);
  //a('111');
}


function waitForUserInactivityImpl(callback, ms) {
  let reportActivity;

  const activate = () => {
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
