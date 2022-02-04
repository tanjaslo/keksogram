import { openBigPicture, openBigPictureModal } from './big-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;

const renderThumbnails = (pictures) => {
  const thumbnailsFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = picture.url;
    thumbnailElement.querySelector('a').id = `${picture.id}`;
    thumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = picture.comments.length;

    thumbnailsFragment.appendChild(thumbnailElement);
  });

  thumbnailsContainer.appendChild(thumbnailsFragment);

  thumbnailsContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (!pictureElement) return;

    const picture = pictures.find(
      (item) => `${item.id}` === pictureElement.id,
    );
    openBigPictureModal();
    openBigPicture(picture);
  });
};

const removePictures = () => {
  const pictureElements = document
    .querySelector('.pictures')
    .querySelectorAll('.picture');
  pictureElements.forEach((element) => {
    element.remove();
  });
};

const updatePictures = (pictures) => {
  removePictures();
  renderThumbnails(pictures);
};

export { renderThumbnails, removePictures, updatePictures };
