import { sendData } from './api.js';
import { isCharLimit } from './util.js';
// import {pictureEditForm} from './upload.js';

const MAX_COMMENT_LENGTH = 140;
// const MAX_HASHTAG_LENGTH = 20;
const LENGTH_ERROR_MESSAGE = `Длина комментария превышает ${MAX_COMMENT_LENGTH} симв.`;
const ERROR_BORDER = '3px red solid';

const pictureUploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = pictureUploadForm.querySelector('#upload-submit');
//const uploadFormText = pictureUploadForm.querySelector('.img-upload__text');
const userHashtags = pictureUploadForm.querySelector('.text__hashtags');
const userComment = pictureUploadForm.querySelector('.text__description');

const onUploadFormSubmit = () => {
  uploadSubmitButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showSuccess('Изображение успешно загружено'),
        // resetToDefaultState(adverts);
      () => showError('Ошибка загрузки файла'),
      new FormData(evt.target),
    );
  });
};

const reportValidationError = (field, string, borderStyle) => {
  field.style.border = borderStyle;
  field.setCustomValidity(string);
  field.reportValidity();
}

const reportNoValidationError = (field) => reportValidationError(field, '', null);

const setFormValidity = () => {
  userComment.addEventListener('input', () => {
    const comment = userComment.value;

    if (isCharLimit(comment, MAX_COMMENT_LENGTH)) {
      reportValidationError(userComment, LENGTH_ERROR_MESSAGE, ERROR_BORDER);
    } else {
      reportNoValidationError(userComment);
    }
  });
};

export { userComment, userHashtags, onUploadFormSubmit, setFormValidity };

/*
Хэш-теги:
хэш-тег начинается с символа # (решётка);
строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
хеш-тег не может состоять только из одной решётки;
максимальная длина одного хэш-тега 20 символов, включая решётку;
хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
хэш-теги разделяются пробелами;
один и тот же хэш-тег не может быть использован дважды;
нельзя указать больше пяти хэш-тегов;
Сообщения о неправильном формате хэштега задаются с помощью метода setCustomValidity у соответствующего поля.


Как отменить обработчик Esc при фокусе?
Задача не имеет одного верного решения, однако намекнём на самый простой — stopPropagation.

если фокус находится в поле ввода комментария, хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами. Набор хэш-тегов можно превратить в массив, воспользовавшись методом split. Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям. Если хотя бы один из тегов не проходит нужных проверок, можно воспользоваться методом setCustomValidity для того, чтобы задать полю правильное сообщение об ошибке.
 */
