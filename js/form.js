import { sendData } from './api.js';
import { isCharLimit } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const LENGTH_ERROR_MESSAGE = `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} симв.`;
const HASHTAG_ERROR_MESSAGE = 'Некорректное написание хэш-тега. Используйте только буквы и числа';
const HASHTAG_UNIQUE_MESSAGE = 'Хэш-теги не должны повторяться';
const HASHTAG_START_MESSAGE = 'Хэш-тег должен начинаться с символа # (решётка)';
const HASHTAG_LENGTH_MESSAGE = `Длина хэш-тега не может быть менее ${MIN_HASHTAG_LENGTH} или превышать ${MAX_HASHTAG_LENGTH} симв.`;
const HASHTAG_COUNT_MESSAGE = `Количество хэш-тегов не должно превышать ${MAX_HASHTAG_COUNT}`;
const ERROR_BORDER = '5px red solid';

const pictureUploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = pictureUploadForm.querySelector('#upload-submit');
const hashtagsInput = pictureUploadForm.querySelector('.text__hashtags');
const commentInput = pictureUploadForm.querySelector('.text__description');
const charCounter = pictureUploadForm.querySelector('.char-counter');

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
  const regexp = /^#[a-zA-Zа-яА-Я\d]{1,19}$/;
  return tag.match(regexp);
};

const reportValidationError = (field, string, borderStyle) => {
  field.style.border = borderStyle;
  field.setCustomValidity(string);
  field.reportValidity();
}

/* const setErrorMessage = function (message) {
  hashtagsElement.classList.toggle('error-input-field', true);
  hashtagsElement.setCustomValidity(message);
  hashtagsElement.reportValidity();
}; */

const reportNoValidationError = (field) => reportValidationError(field, '', null);

const onHashtagsInput = () => {
  const str = hashtagsInput.value;
  const tags = str.toLowerCase().split(' ');
  hashtagsInput.setCustomValidity('');

  tags.forEach((tag, index, arr) => {
    if (!checkTagStart(tag)) {
      hashtagsInput.setCustomValidity(HASHTAG_START_MESSAGE);
      // reportValidationError(hashtagsInput, HASHTAG_START_MESSAGE, ERROR_BORDER);
    } else if (!checkTagLength(tag)) {
      hashtagsInput.setCustomValidity(HASHTAG_LENGTH_MESSAGE);
    } else if (!isTagMatches(tag)) {
      hashtagsInput.setCustomValidity(HASHTAG_ERROR_MESSAGE);
    } else if (!isTagUnique(tag, index, arr)) {
      hashtagsInput.setCustomValidity(HASHTAG_UNIQUE_MESSAGE);
    }
  });
hashtagsInput.reportValidity();
};

const onCommentInput = () => {
  const comment = commentInput.value;
  charCounter.textContent = comment.length;

  if (isCharLimit(comment, MAX_COMMENT_LENGTH)) {
    reportValidationError(commentInput, LENGTH_ERROR_MESSAGE, ERROR_BORDER);
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

/*
const arrr = ["dfd#hdh", "#!", "#", "#friend", "# ove", "#love", "#peace"];
const MAX_HASHTAG_LENGTH = 5;

arrr.forEach((ar) => {
  if (ar.match(/^#\S\w/g) && ar.length > 1 && ar.length <= MAX_HASHTAG_LENGTH) {
    alert(ar); // love
  }
})

// хэш-теги разделяются пробелами;
const checkEndMatch = (tag) => {
  const regexp = /\w\s$/;
  return regexp.test(tag);
};

hashtagsInput.addEventListener('input', () => {
const str = hashtagsInput.value;
const arr = str.toLowerCase().split(' ');
// console.log(arr);

arr.forEach((ar) => {
  if (ar.match(/^#\S\w/g) && ar.length > 1 && ar.length <= MAX_HASHTAG_LENGTH) {
    hashtagsInput.setCustomValidity('Не катит');
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
});
})
*/
