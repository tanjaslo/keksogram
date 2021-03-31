import { getAllThumbnails } from './api.js';
import { getRandomThumbnails } from './util.js';
import { removePictures, updatePictures } from './thumbnail.js';

const imageFilter = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

/* const getDiscussedPictures = (pictures) => {
}; */

const onImageFilterClick = (evt) => {
  const pics = getAllThumbnails();

  if (evt.target === filterDefault) {
    updatePictures(pics);
  } else if (evt.target === filterRandom) {
    const randomPics = getRandomThumbnails(pics);
    updatePictures(randomPics);
  } else if (evt.target === filterDiscussed) {
    alert('filterDiscussed');
    removePictures();
  }
};

const initFilter = () => {
  imageFilter.classList.remove('img-filters--inactive');
  imageFilter.addEventListener('click', onImageFilterClick);
};

export { initFilter }

/* Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение дребезга).

При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.

Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в пол секунды.
*/

