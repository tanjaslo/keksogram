import { sendData } from './api.js';
import { isCharLimit } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const LENGTH_ERROR_MESSAGE = `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} симв.`;
const HASHTAG_ERROR_MESSAGE = 'Некорректный хэш-тег. Используйте только буквы и числа';
const HASHTAG_UNIQUE_MESSAGE = 'Хэш-теги не должны повторяться';
const HASHTAG_START_MESSAGE = 'Хэш-тег должен начинаться с символа # (решётка)';
const HASHTAG_LENGTH_MESSAGE = `Длина хэш-тега не может быть менее ${MIN_HASHTAG_LENGTH} или превышать ${MAX_HASHTAG_LENGTH} симв.`;
const HASHTAG_COUNT_MESSAGE = `Количество хэш-тегов не должно превышать ${MAX_HASHTAG_COUNT}.`;

const pictureUploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = pictureUploadForm.querySelector('#upload-submit');
const hashtagsInput = pictureUploadForm.querySelector('.text__hashtags');
const commentInput = pictureUploadForm.querySelector('.text__description');
const charCounter = pictureUploadForm.querySelector('.char-counter');

const checkTagsLength = (tags) => {
  return tags.length <= MAX_HASHTAG_COUNT;
};

const checkTagStart = (tag) => {
  // return !/^#/.test(tag);
  return tag.startsWith('#');
};

const checkTagLength = (tag) => {
  return tag.length >= MIN_HASHTAG_LENGTH && tag.length <= MAX_HASHTAG_LENGTH;
};

const isTagUnique = (tag, index, arr) => {
  return arr.indexOf(tag) === index;
};

const isTagMatches = (tag) => {
  //const regexp = /^#[a-zA-Zа-яА-Я\d]{1,19}$/;
  const regexp = /^#\w{1,19}$/;
  return tag.match(regexp);
};

const reportValidationError = (field, message) => {
  field.classList.add('error-input-field');
  field.setCustomValidity(message);
};

const reportNoValidationError = (field) => {
  field.setCustomValidity('');
  field.classList.remove('error-input-field');
};

const onHashtagsInput = () => {
  const str = hashtagsInput.value;
  const tags = str.toLowerCase().split(' ');
  reportNoValidationError(hashtagsInput);

  tags.forEach((tag, index, arr) => {
    if (!checkTagStart(tag)) {
      reportValidationError(hashtagsInput, HASHTAG_START_MESSAGE);
    } else if (!checkTagLength(tag)) {
      reportValidationError(hashtagsInput, HASHTAG_LENGTH_MESSAGE);
    } else if (!isTagMatches(tag)) {
      reportValidationError(hashtagsInput, HASHTAG_ERROR_MESSAGE);
    } else if (!isTagUnique(tag, index, arr)) {
      reportValidationError(hashtagsInput, HASHTAG_UNIQUE_MESSAGE);
    } else if (!checkTagsLength(arr)) {
      reportValidationError(hashtagsInput, HASHTAG_COUNT_MESSAGE);
    }
  });
};

const onCommentInput = () => {
  const comment = commentInput.value;
  charCounter.textContent = comment.length;

  if (isCharLimit(comment, MAX_COMMENT_LENGTH)) {
    reportValidationError(commentInput, LENGTH_ERROR_MESSAGE);
  } else {
    reportNoValidationError(commentInput);
  }
};

const setFormValidity = () => {
  hashtagsInput.addEventListener('input', onHashtagsInput);
  commentInput.addEventListener('input', onCommentInput);
};

const onUploadFormSubmit = () => {
  uploadSubmitButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showSuccess('Изображение успешно загружено'),
      () => showError('Ошибка загрузки файла'),
      new FormData(evt.target),
    );
  });
};

/* pictureUploadForm.addEventListener('focusin', (evt) => {
  evt.target.style.background = '#ffe753';
});

pictureUploadForm.addEventListener('focusout', (evt) => {
  evt.target.style.background = '';
}); */

export { commentInput, hashtagsInput, onUploadFormSubmit, setFormValidity };
