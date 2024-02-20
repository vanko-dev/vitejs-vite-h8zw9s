import { waitForUserInactivityImpl as waitForUserInactivityImplNew } from "./waitForUserInactivityImplNew"
import { waitForUserInactivityImpl as waitForUserInactivityImplOld } from "./waitForUserInactivityImplOld"

const sec = (ms) => Math.round(ms / 100) / 10

const showtTime = (date) =>
  date.toLocaleTimeString("en-us", { minute: "2-digit", hour12: false, second: "2-digit" });

export function startTimer() {
  const INACTIVITY_TIMEOUT_MS = 15 * 1000

  fuss()

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

function fuss() {
  Array.from({ length: 1000 }, () => setTimeout(pieceOfWork, Math.random() * 1000 * 10))
}

function pieceOfWork() {
  const start = new Date()
  while ((new Date() - start) < Math.random() * 100);
  setTimeout(pieceOfWork, Math.random() * 1000 * 10)
}