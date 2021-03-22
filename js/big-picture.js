import { isEscEvent, openModal, closeModal } from './util.js';

const COMMENT_AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const closeModalButton = bigPicture.querySelector('#picture-cancel');
const commentsList = document.querySelector('.social__comments');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const openBigPictureModal = () => {
  openModal(bigPicture);
  document.addEventListener('keydown', onPictureEscKeydown);
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
};

const onCloseModalButtonClick = () => {
  closeModal(bigPicture);
  closeModalButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onPictureEscKeydown);
};

const onPictureEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closeModal(bigPicture);
    document.removeEventListener('keydown', onPictureEscKeydown);
  }
};

const loadComments = (comments) => {
commentsList.innerHTML = '';

if (comments) {
  comments.forEach(({ avatar, message, name }) => {
    const newLi = document.createElement('li');
    newLi.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    newLi.appendChild(commentAvatar);

    const commentMessage = document.createElement('p');
    commentMessage.classList.add('social__text');
    newLi.appendChild(commentMessage);

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentAvatar.width = COMMENT_AVATAR_SIZE;
    commentAvatar.height = COMMENT_AVATAR_SIZE;
    commentMessage.textContent = message;

    commentsList.appendChild(newLi);
    });
  };
};

/* const loadComments = (comments) => {
  commentsList.innerHTML = '';

  if (comments) {
    comments.forEach(comment => {
    const newLi = document.createElement('li');
    newLi.classList.add('social__comment');
    newLi.innerHTML = `<img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="${COMMENT_AVATAR_SIZE}" height="${COMMENT_AVATAR_SIZE}">
      <p class="social__text">${comment.message}</p>`;

      commentsList.appendChild(newLi);
    });
  }
} */

const openBigPicture = ({url, likes, description, comments}) => {
/* commentsLoaderElement.dataset.id = evt.target.dataset.imgId; */
bigPictureImage.src = url;
bigPictureLikes.textContent = likes;
bigPictureCaption.textContent = description;
bigPictureComments.textContent = comments.length;
loadComments(comments);

commentsCounter.classList.add('hidden');
commentsLoader.classList.add('hidden');
};

// ДЕСТРУКТУРИЗАЦИЯ
/* const renderBigPicture = (picture) => {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  bigPictureImage.src = picture.url;

  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = picture.likes;

  const bigPictureCaption = bigPicture.querySelector('.social__caption');
  bigPictureCaption.textContent = picture.description;

  const bigPictureComments = bigPicture.querySelector('.comments-count');
  bigPictureComments.textContent = picture.comments.length;

  loadComments(picture.comments);
  };

можно, для начала в каждую картинку  записать дата атрибут с id, потом проверить```if (evt.target.matches('.picture__img'))``` и по айдишнику картинки  найти нужный элемент массива и из него взять всё что нужно. я так сделал.

а дата-атрибут это получается технический параметр, по которому можно вытащить картику из массива фоток?

ты  же работаешь с одним и тем же массивом объектов. На главной ты по нему отрисовываешь миниатюры. Просто у каждой картинки должен быть задан этот атрибут, по которому ты сможешь найти нужный объект со всеми данными

вот у меня как раз и не складывается этот момент - как клик соединить с объектом фотки, где все данные. Если все не вытащить через event, то и вариантов нет... а дата атрибут, это что айдишник для каждой фотки?

ты когда отрисовываешь миниатюры сразу задавай датаатрибут с айдишником
найти нужный элемент массива по  айди картинки

*/
export { openBigPictureModal, openBigPicture };
