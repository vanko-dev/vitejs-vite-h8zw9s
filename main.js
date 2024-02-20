import './style.css';
import viteLogo from '/vite.svg';
import { startTimer } from './startTimers.js';

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <button id="new" type="button"></button>
      <button id="old" type="button"></button>
      <button id="timer" type="button"></button>
    </div>
  </div>
`;

startTimer();
