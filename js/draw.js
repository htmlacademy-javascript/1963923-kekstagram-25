import {drawBigPicture} from './draw-big-picture.js';

const photosElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const drawPhotos = (photos) => {
  const pictureElements = photosElement.querySelectorAll('.picture');
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const{url, likes, comments} = photo;
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    const onPhotoElementClick = () => {
      drawBigPicture(photo);
    };
    photoElement.addEventListener('click', onPhotoElementClick);
    photosFragment.appendChild(photoElement);
  });
  pictureElements.forEach((pictureElement) => {
    pictureElement.remove();
  });
  photosElement.appendChild(photosFragment);
};

export{drawPhotos};
