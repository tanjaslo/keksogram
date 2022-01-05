import { openBigPicture, openBigPictureModal } from './big-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
//const imageFilter = document.querySelector('.img-filters');

const renderThumbnails = (pictures) => {
  const thumbnailsFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = picture.url;
    thumbnailElement.querySelector('a').id = `${picture.id}`;
    thumbnailElement.querySelector('.picture__likes').textContent =
      picture.likes;
    thumbnailElement.querySelector('.picture__comments').textContent =
      picture.comments.length;

    thumbnailsFragment.appendChild(thumbnailElement);
  });

  thumbnailsContainer.appendChild(thumbnailsFragment);

  thumbnailsContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('picture__img')) {
      return;
    }
    const pictureElement = evt.target.closest('.picture');
    const picture = pictures.find(
      (element) => `${element.id}` === pictureElement.id,
    );
    openBigPictureModal();
    openBigPicture(picture);
  });
  // imageFilter.classList.remove('img-filters--inactive');
};

const removePictures = () => {
  const pictures = document
    .querySelector('.pictures')
    .querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const updatePictures = (pictures) => {
  removePictures();
  renderThumbnails(pictures);
  //setPicturesListeners(pictures);
};

export { renderThumbnails, removePictures, updatePictures };
