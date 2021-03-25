import { getData } from './api.js';
import { setFormValidity } from './form.js';
import { renderThumbnails } from './thumbnail.js';
import { showAlert } from './util.js';
import './big-picture.js';
import './effect.js';
import './upload.js';

getData((data) => {
  renderThumbnails(data);
},
(error) => {
  showAlert(error);
});

setFormValidity();

/* getData((data) => renderThumbnails(data)); */

/* fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => renderPictures(data))
  .catch(error); */

