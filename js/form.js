import { isEscEvent } from './util.js';
import { sendData } from './api.js';
import { closeUploadForm } from './upload.js';

const main = document.querySelector('main');
const pictureUploadForm = document.querySelector('#upload-select-image');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const onPopupClick = (evt) => {
  evt.preventDefault();
  removeMessage();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const showMessage = (message) => {
  main.appendChild(message);
  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const removeMessage = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('click', onPopupClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        closeUploadForm();
        showMessage(successMessage);
      },
      () => {
        closeUploadForm();
        showMessage(errorMessage);
      },
      new FormData(evt.target),
      );
    };

  pictureUploadForm.addEventListener('submit', onSubmitButtonClick);
