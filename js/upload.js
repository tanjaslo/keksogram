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
const scaleControlContainer = pictureEditForm.querySelector('.img-upload__scale');
const scaleSmallerButton = scaleControlContainer.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleControlContainer.querySelector('.scale__control--bigger');
const scaleControlValue = scaleControlContainer.querySelector('.scale__control--value');
const effectLevelContainer = pictureEditForm.querySelector('.img-upload__effect-level');

const onPictureUploaderClick = () => {
  const file = pictureUploader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  pictureUploader.value = '';

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPreviewElement.src = reader.result;
      uploadPreviewElement.className = '';
    });
    reader.readAsDataURL(file);
  }
  openModal(pictureEditForm);
  addFormListeners();

  uploadPreviewElement.style.filter = 'none';
  effectLevelContainer.style.display = 'none';
  // effectLevelContainer.classList.add('hidden');
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
  uploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE/100})`;
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

pictureUploader.addEventListener('change', onPictureUploaderClick);

export {uploadPreviewElement, pictureEditForm, effectLevelContainer};
