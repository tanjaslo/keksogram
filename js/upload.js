import { isEscEvent, openModal, closeModal } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_SCALE = 100;
const RESIZE_STEP = 25;
const MIN_IMG_SIZE = 25;
const MAX_IMG_SIZE = 100;

const pictureUploader = document.querySelector('#upload-file');
const pictureEditForm = document.querySelector('.img-upload__overlay');
const closeEditFormButton = pictureEditForm.querySelector('#upload-cancel');
const uploadPreviewElement = pictureEditForm.querySelector('.img-upload__preview img');
const scaleControlContainer = document.querySelector('.img-upload__scale');
const scaleSmallerButton = scaleControlContainer.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleControlContainer.querySelector('.scale__control--bigger');
const scaleControlValue = scaleControlContainer.querySelector('.scale__control--value');

const onpictureUploaderClick = () => {
  const file = pictureUploader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  pictureUploader.value = '';

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
  openModal(pictureEditForm);
  addFormListeners();
};

const applyScale = (currentScale) => {
  scaleControlValue.value = `${currentScale}%`;
  uploadPreviewElement.style.transform = `scale(${currentScale/100})`;
};

const onScaleSmallerButtonClick = () => {
  const currentImgSize = parseInt(scaleControlValue.value);

  if (currentImgSize > MIN_IMG_SIZE) {
  const newImgSize = (currentImgSize - RESIZE_STEP);
  applyScale(newImgSize);
  }
};

const onScaleBiggerButtonClick = () => {
  const currentImgSize = parseInt(scaleControlValue.value);

  if (currentImgSize < MAX_IMG_SIZE) {
  const newImgSize = (currentImgSize + RESIZE_STEP);
  applyScale(newImgSize);
  }
};

const onFormEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closeModal(pictureEditForm);
    removeFormListeners();
  }
};

const onCloseFormButtonClick = () => {
  closeModal(pictureEditForm);
  uploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE/100})`;
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
  removeFormListeners();
};

const addFormListeners = () => {
  document.addEventListener('keydown', onFormEscKeydown);
  closeEditFormButton.addEventListener('click', onCloseFormButtonClick);
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
};

const removeFormListeners = () => {
  document.removeEventListener('keydown', onFormEscKeydown);
  closeEditFormButton.removeEventListener('click', onCloseFormButtonClick);
  scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
};

pictureUploader.addEventListener('change', onpictureUploaderClick);
/*


Загрузка нового изображения на сайт и заполнение информации о нём:

1.1. Загрузка нового изображения:
применение одного из заранее заготовленных эффектов;
выбор глубины эффекта с помощью ползунка;
добавление текстового комментария;
добавление хэш-тегов.

// --------------------

С помощью полученных обновлений (стили и скрипты необходимые для noUiSlider) от Кексобота реализуйте применение эффекта для изображения. Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер.

2.2. Наложение эффекта на изображение:
По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.
При выборе эффекта «Оригинал» слайдер скрывается.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.

 */
