import debounce from 'lodash.debounce';

export function setupTimer(element) {
  element.innerHTML = '';

  const setCounter = () => {
    element.innerHTML = 'AAA';
  };

  //element.addEventListener('click', () => setCounter(counter + 1));
  setTimeout(setCounter, 20 * 1000);

  // const a = debounce(setCounter, 20 * 1000);
  a('111');
}
