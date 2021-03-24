/* global noUiSlider:readonly */
import {uploadPreviewElement, pictureEditForm, effectLevelContainer} from './upload.js';
import {effects} from './util.js';

const effectsListForm = pictureEditForm.querySelector('.effects__list');
const sliderElement = pictureEditForm.querySelector('.effect-level__slider');
const effectLevelValue = pictureEditForm.querySelector('.effect-level__value');

window.noUiSlider.create(sliderElement, {
  range: {
      min: 0,
      max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  //  Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер.
  const value = unencoded[handle];
  effectLevelValue.value = value;

switch (effect) {
  case 'chrome':
    uploadPreviewElement.style.filter = `grayscale(${value})`;
    break;
  case 'sepia':
    uploadPreviewElement.style.filter = `sepia(${value})`;
    break;
  case 'marvin':
    uploadPreviewElement.style.filter = `invert(${value}%)`;
    break;
  case 'phobos':
    uploadPreviewElement.style.filter = `blur(${value}px)`;
    break;
  case 'heat':
    uploadPreviewElement.style.filter = `brightness(${value})`;
    break;
  }
});

const onEffectsListChange = (effect) => {

  const addEffectToPicture = (evt) => {
    if (!(evt.target instanceof HTMLInputElement)) {
      return;
    }
    const currentEffect = evt.target.value;
    sliderElement.noUiSlider.set(100);
    uploadPreviewElement.classList.toggle(`effects__preview--${currentEffect}`);

    if (currentEffect === 'none') {
      effectLevelContainer.style.display = 'none';
      uploadPreviewElement.style.filter = 'none';
    } else {
      effectLevelContainer.style.display = 'block';
      sliderElement.noUiSlider.updateOptions(effects[currentEffect]);
    }
  };
  uploadPreviewElement.className = '';
  addEffectToPicture(effect);
};

effectsListForm.addEventListener('click', onEffectsListChange);

/*
При изменении уровня интенсивности эффекта, CSS-стили картинки uploadPreviewElement
обновляются следующим образом:
uploadPreviewElement.style.filter = `${currentEffect}(${value / 100})`;

Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.

При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.


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
