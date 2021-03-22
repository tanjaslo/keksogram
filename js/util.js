const ALERT_MESSAGE = 'Не удалось загрузить данные';
const ALERT_SHOW_TIME = 5000;

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

// так не удаляются слушатели :(
/* const onEscKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent) {
      evt.preventDefault();
      closeModal(modal);
    }
  }
}; */

const openModal = (element) => {
  document.body.classList.add('.modal-open');
  element.classList.remove('hidden');
};

const closeModal = (element) => {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
};

export {showAlert, isEscEvent, openModal, closeModal}
