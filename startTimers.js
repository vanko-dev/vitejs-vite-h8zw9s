import { waitForUserInactivityImpl as waitForUserInactivityImplNew } from "./waitForUserInactivityImplNew"
import { waitForUserInactivityImpl as waitForUserInactivityImplOld } from "./waitForUserInactivityImplOld"

const sec = (ms) => Math.round(ms / 100) / 10

const showtTime = (date) =>
  date.toLocaleTimeString("en-us", { minute: "2-digit", hour12: false, second: "2-digit" });


export function startTimer() {
  const INACTIVITY_TIMEOUT_MS = 15 * 1000

  const oninactivityNew = (inactivityTimeMs) => {
    waiterNew.cancel()
    document.querySelector("#new").innerHTML += `${showtTime(new Date())}-${sec(inactivityTimeMs)}<br/>`
    waiterNew = waitForUserInactivityImplNew(oninactivityNew, INACTIVITY_TIMEOUT_MS)
  };
  let waiterNew = waitForUserInactivityImplNew(oninactivityNew, INACTIVITY_TIMEOUT_MS)


  const oninactivityOld = (inactivityTimeMs) => {
    waiterOld?.cancel()
    document.querySelector("#old").innerHTML += `${showtTime(new Date())}-${sec(inactivityTimeMs)}<br/>`
    waiterOld = waitForUserInactivityImplOld(oninactivityOld, INACTIVITY_TIMEOUT_MS)
  };
  let waiterOld = waitForUserInactivityImplOld(oninactivityOld, INACTIVITY_TIMEOUT_MS)


}


// export function startTimer(element) {
//   element.innerHTML = '';
//   const INACTIVITY_TIMEOUT_MS = 20 * 1000

//   const oldCallback = () => {
//     waiterOld?.cancel()
//     waiterOld = waitForUserInactivityImpl(oldCallback, INACTIVITY_TIMEOUT_MS, document.querySelector('#vis'))
//   };
//   let waiterOld = waitForUserInactivityImpl(oldCallback, INACTIVITY_TIMEOUT_MS, document.querySelector('#vis'))


//   const newCallback = () => {
//     waiterNew.cancel()
//     waiterNew = waitForUserInactivityImplNew(newCallback, INACTIVITY_TIMEOUT_MS, element)
//   };
//   let waiterNew = waitForUserInactivityImplNew(newCallback, INACTIVITY_TIMEOUT_MS, element)

//   let prevTimer = new Date()
//   const timerCallback = () => {
//     const log = `tmr inactivity ${new Date().toLocaleTimeString()} ${round((new Date() - prevTimer) / 1000)}<br>`;
//     document.querySelector('#timer').innerHTML += `${log}<br>`;
//     clearTimeout(timer)
//     timer = setTimeout(timerCallback, INACTIVITY_TIMEOUT_MS)
//     prevTimer = new Date()
//   };
//   let timer = setTimeout(timerCallback, INACTIVITY_TIMEOUT_MS)
// }


// const makeTracer = (element, prefix = "") => {
//   let lastActivity = new Date()

//   const withTraceActivity = (reportActivity) => {
//     const result = (...args) => {
//       // console.log("activity", new Date().toTimeString(), ...args)
//       lastActivity = new Date()
//       reportActivity(...args)
//     }

//     result.cancel = reportActivity.cancel
//     return result
//   }



//   const withTraceInactivity = (inactivity) => {
//     const result = (...args) => {
//       //const log = `${prefix} inactivity ${lastActivity.toLocaleTimeString()} ${new Date().toLocaleTimeString()} ${round((new Date() - lastActivity) / 1000)}<br>`;
//       const log = `${prefix} inactivity ${new Date().toLocaleTimeString()} ${round((new Date() - lastActivity) / 1000)}<br>`;
//       console.log(log)
//       element.innerHTML += `${log}<br>`;
//       inactivity(...args)
//     }

//     result.cancel = inactivity.cancel
//     return result
//   }

//   return { withTraceActivity, withTraceInactivity }
// }






// document.addEventListener("visibilitychange", () => {
//   const vis = document.querySelector('#vis')

//   if (document.visibilityState === "visible") {
//     vis.innerHTML += `${new Date().toLocaleTimeString()} - visible<br>`;
//   } else {
//     vis.innerHTML += `${new Date().toLocaleTimeString()} - hidden<br>`;
//   }
// });