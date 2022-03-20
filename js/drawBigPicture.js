const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCommentCount = bigPictureElement.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureElement.querySelector('.comments-loader');
const modalOpenElement = document.querySelector('body');
const closeBigPictureElement = bigPictureElement.querySelector('#picture-cancel');
const WIDTH = 35;
const HEIGTH = 35;
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  modalOpenElement.classList.remove('modal-open');
};
const bigPictureEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', bigPictureEscKeydown);
  }
};

const drawBigPicture = (photo) => {
  bigPictureImgElement.src = photo.url;
  bigPictureLikesElement.textContent = photo.likes;
  bigPictureCommentsElement.textContent = photo.comments.length;
  bigPictureDescriptionElement.textContent = photo.description;
  socialCommentsElement.innerHTML = '';
  if(photo.comments.length > 0){
    const socialCommentsFragment = document.createDocumentFragment();
    photo.comments.forEach(({avatar, name, message,}) => {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      const newCommentImg = document.createElement('img');
      newCommentImg.classList.add('social__picture');
      newCommentImg.src = avatar;
      newCommentImg.alt = name;
      newCommentImg.width = WIDTH;
      newCommentImg.height = HEIGTH;
      newComment.appendChild(newCommentImg);
      const newCommentList = document.createElement('p');
      newCommentList.classList.add('social__text');
      newCommentList.textContent = message;
      newComment.appendChild(newCommentList);
      socialCommentsFragment.appendChild(newComment);
    });
    socialCommentsElement.appendChild(socialCommentsFragment);
  }
  bigPictureElement.classList.remove('hidden');
  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  modalOpenElement.classList.add('.modal-open');
  document.addEventListener('keydown', bigPictureEscKeydown);
};
const closeBigPictureElementClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', bigPictureEscKeydown);
};
closeBigPictureElement.addEventListener('click',  closeBigPictureElementClick);
export {drawBigPicture};
