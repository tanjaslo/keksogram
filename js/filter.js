import { getAllThumbnails } from './api.js';
import { getRandomThumbnails } from './util.js';
import { updatePictures } from './thumbnail.js';

const filterContainer = document.querySelector('.img-filters');
const allFilters = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const onImageFilterClick = (evt) => {
  const pics = getAllThumbnails();
  const randomPics = getRandomThumbnails(pics);
  const discussedPics = pics.slice().sort((a, b) => b.comments.length - a.comments.length);
  const currentFilter = evt.target.closest('.img-filters__button');

  if (!currentFilter) return;

  allFilters.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });

  currentFilter.classList.add('img-filters__button--active');

  if (currentFilter === filterDefault) {
    updatePictures(pics);
  } else if (currentFilter === filterRandom) {
    updatePictures(randomPics);
  } else if (currentFilter === filterDiscussed) {
    updatePictures(discussedPics);
  }
};

const initFilter = () => {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', onImageFilterClick);
};

export { initFilter };
