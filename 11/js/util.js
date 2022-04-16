//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomInt = (min, max) => {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const getLengthOfString = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArray = (callback, count) => {
  const data = [];
  for (let i = 0; i < count; i++){
    data.push(callback(i + 1));
  }
  return data;
};

const onRequestFinish = (template, closeButtonClassName) => {
  const element = template.cloneNode(true);
  const buttonElement = element.querySelector(closeButtonClassName);
  const onEscKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      element.remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  buttonElement.addEventListener('click', () => {
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
  });
  element.addEventListener('click', (event) => {
    if(event.target === element){
      element.remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  });
  document.addEventListener('keydown', onEscKeydown);
  document.body.appendChild(element);
};

const shuffle = (arr) => arr.sort(() => getRandomInt(0, 2)  ? -1 : 1);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export{
  getRandomInt,
  getLengthOfString,
  getRandomArrayElement,
  getRandomArray,
  onRequestFinish,
  shuffle,
  debounce
};
