import './style.css';
import viteLogo from '/vite.svg';
import { startTimer } from './startTimers.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <div class="card">
      <button id="new" type="button"></button>
      <button id="old" type="button"></button>
      <button id="timer" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

startTimer();
