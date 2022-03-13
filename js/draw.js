import {getPhotos} from './data.js';

const PHOTOS_COUNT = 25;

const photosElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const drawPhotos = () => {
  const photos = getPhotos(PHOTOS_COUNT);
  photos.forEach(({url, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosElement.appendChild(photoElement);
  });
};

export{drawPhotos};
