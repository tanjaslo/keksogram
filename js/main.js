import { getData } from './api.js';
import './big-picture.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import './upload.js';

getData((data) => {
  renderThumbnails(data);
},
(error) => {
  showAlert(error);
});

/* getData((data) => renderThumbnails(data)); */

/* fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => renderPictures(data))
  .catch(error); */

