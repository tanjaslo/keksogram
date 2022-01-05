const ALERT_MESSAGE = 'Не удалось загрузить данные';
const ALERT_SHOW_TIME = 5000;
const RANDOM_THUMBNAILS_COUNT = 10;

const effects = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const isCharLimit = (string, length) => {
  return (string.length > length) ? true : false;
};
// console.log(getStringLength('good morning', MAX_LENGTH));

const getRandomElements = (elements) => {
  return elements.slice().sort(() => Math.random() > 0.5 ? 1 : -1);
};

const getRandomThumbnails = (thumbnails) => {
  const randomThumbnails = getRandomElements(thumbnails);
  return randomThumbnails.slice(0, RANDOM_THUMBNAILS_COUNT);
};

const debounce = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
};

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');
  alertContainer.textContent = ALERT_MESSAGE;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const openModal = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};

const closeModal = (element) => {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
};

/*
При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение дребезга).
Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в пол секунды.
*/

/* const getRandomElements = (elements) => {
  const newel = elements.slice();
  const el = newel.sort(() => Math.random() > 0.5 ? 1 : -1);
  return el.slice(0, 4);
}; */

/* Поэтому не забывайте про Object.assign() и Array.prototype.slice() и им подобные методы, когда работаете с импортированной структурой.

// файл items.js
const items = ['one', 'two', 'three'];

export {items};

// файл filter.js
import {items} from './items.js';

items.slice().sort(); // отсортировали копию, исходный массив в items.js остался цел */



export {
  isEscEvent,
  isCharLimit,
  showAlert,
  openModal,
  closeModal,
  effects,
  getRandomThumbnails,
  debounce
}
