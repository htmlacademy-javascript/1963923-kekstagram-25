import {getPhotos} from './data.js';
import {drawPhotos} from './draw.js';
import {getLengthOfString} from './util.js';
import './form.js';
import './user-form.js';
const PHOTOS_COUNT = 25;
const photos = getPhotos(PHOTOS_COUNT);
drawPhotos(photos);
getLengthOfString('qwerty', 10);
