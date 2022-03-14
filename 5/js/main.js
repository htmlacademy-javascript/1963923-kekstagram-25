import {getPhotos} from './data.js';
import {drawPhotos} from './draw.js';
import {getLengthOfString} from './util.js';

const PHOTOS_COUNT = 25;
const photos = getPhotos(PHOTOS_COUNT);

getPhotos();
drawPhotos();
getLengthOfString('qwerty', 10);
export{photos};
