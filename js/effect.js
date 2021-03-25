/* global noUiSlider:readonly */
import {uploadPreviewElement, pictureEditForm, effectLevelContainer} from './upload.js';
import {effects} from './util.js';

const effectsListForm = pictureEditForm.querySelector('.effects__list');
const effectLevelElement = pictureEditForm.querySelector('.effect-level');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectLevelValue = pictureEditForm.querySelector('.effect-level__value');

  window.noUiSlider.create(sliderElement, {
    range: {
        min: 0,
        max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
          if (Number.isInteger(value)) {
              return value.toFixed(0);
          }
          return value.toFixed(1);
      },
      from: function (value) {
          return parseFloat(value);
      },
  },
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  //  Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер.
  const value = values[handle];
  effectLevelValue.value = value;

switch (effect) {
  case 'chrome': return uploadPreviewElement.style.filter = `grayscale(${value})`;
  case 'sepia': return uploadPreviewElement.style.filter = `sepia(${value})`;
  case 'marvin': return uploadPreviewElement.style.filter = `invert(${value}%)`;
  case 'phobos': return uploadPreviewElement.style.filter = `blur(${value}px)`;
  case 'heat': return uploadPreviewElement.style.filter = `brightness(${value})`;
  default: return uploadPreviewElement.style.filter = 'none';
  }
});

const onEffectsListChange = (effect) => {
  const addEffectToPicture = (evt) => {
    if (!(evt.target instanceof HTMLInputElement)) {
      return;
    }
    const currentEffect = evt.target.value;
    uploadPreviewElement.classList.toggle(`effects__preview--${currentEffect}`);

    if (currentEffect === 'none') {
      effectLevelContainer.style.display = 'none';
      uploadPreviewElement.style.filter = 'none';
      effectLevelElement.classList.add('hidden');
      // effectLevelValue.value = null;
    } else {
      effectLevelContainer.style.display = 'block';
      effectLevelElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions(effects[currentEffect]);
      sliderElement.noUiSlider.set(100);
    }
  };
  //uploadPreviewElement.className = '';
  addEffectToPicture(effect);
};

effectsListForm.addEventListener('click', onEffectsListChange);

/*
effectsListForm.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  console.log(effect);
  sliderElement.noUiSlider.updateOptions(effects[effect]);
});
*/

/* const addEffectsToPicture = () => {
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  if (currentEffect === 'none') {
    uploadPreviewElement.classList.add('effects__preview--none');
  }
    uploadPreviewElement.classList.remove('effects__preview--none');
    uploadPreviewElement.classList.add(`effects__preview--${currentEffect}`);
}
};

const onEffectsListChange = () => {
  uploadPreviewElement.className = '';
  addEffectsToPicture();
} */
