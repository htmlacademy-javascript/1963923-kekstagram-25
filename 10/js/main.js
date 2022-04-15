import {drawPhotos} from './draw.js';
import './form.js';
import './user-form.js';
import './editBigPhoto.js';
import {createLoader} from './load.js';
import {onRequestFinish} from './util.js';

const errorTemplate = document.querySelector('#error-photos').content.querySelector('.error');

createLoader(
  (photos) => {drawPhotos(photos);},
  () => {onRequestFinish(errorTemplate, '.error__button');}
);
