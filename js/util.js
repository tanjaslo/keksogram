const ALERT_MESSAGE = 'Не удалось загрузить данные';
const ALERT_SHOW_TIME = 5000;

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

// имя_функции(проверяемая_строка, максимальная длина);
// Результат: true, если строка проходит по длине, и false — если не проходит
// const MAX_LENGTH = 15;

const isCharLimit = (string, length) => {
  return (string.length > length) ? true : false;
};
// console.log(getStringLength('good morning', MAX_LENGTH));


// Результат: целое число из диапазона "от...до"
const getRandomIntegerInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (min >= max || min < 0 || max < 0) ? null : Math.floor(Math.random() * (max - min +1) + min)
};

/* const getRandomArrayElement = (elements) => {
  const randomArrayIndex = getRandomIntInclusive(0, elements.length - 1);
  return elements[randomArrayIndex];
}; */

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

export {isEscEvent, isCharLimit, showAlert, openModal, closeModal, effects}
