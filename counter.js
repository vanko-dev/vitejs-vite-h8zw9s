import debounce from 'lodash.debounce';

export function setupTimer(element) {
  element.innerHTML = '';

  const setCounter = (start) => {

    return () => {
      element.innerHTML += `${new Date() - start}<br>`;
   }

    
  };

  //element.addEventListener('click', () => setCounter(counter + 1));
  setTimeout(setCounter(new Date()), 20 * 1000);

  // const a = debounce(setCounter, 20 * 1000);
  //a('111');
}
