import { getData } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { setFormValidity } from './validation.js';
import { showAlert } from './util.js';
import './form.js';
import './big-picture.js';
import './effect.js';
import './upload.js';

getData((data) => {
  renderThumbnails(data);
},
(error) => showAlert(error));

setFormValidity();
/* getData((data) => renderThumbnails(data)); */

/* fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => renderPictures(data))
  .catch(error); */

