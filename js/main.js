import {drawPhotos} from './draw.js';
import './form.js';
import './form-validation.js';
import './edit-big-photo.js';
import {loadPhotos} from './load-photos.js';
import {onRequestFinish} from './util.js';
import {initFilters} from './filters.js';
import './preview.js';

const errorTemplate = document.querySelector('#error-photos').content.querySelector('.error');

loadPhotos(
  (photos) => {
    drawPhotos(photos);
    initFilters(photos);
  },
  () => {
    onRequestFinish(errorTemplate, '.error__button');
  }
);
