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

const drawBigPicture = (photo) => {
  bigPictureImgElement.src = photo.url;
  bigPictureLikesElement.textContent = photo.likes;
  bigPictureCommentsElement.textContent = photo.comments.length;
  bigPictureDescriptionElement.textContent = photo.description;
  socialCommentsElement.innerHTML = '';
  if(photo.comments.length > 0){
    const socialCommentsFragment = document.createDocumentFragment();
    photo.comments.forEach((comment) => {
      const{avatar, name, message,} = comment;
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      const newCommentImg = document.createElement('img');
      newCommentImg.classList.add('social__picture');
      newCommentImg.src = avatar;
      newCommentImg.alt = name;
      newCommentImg.width = 35;
      newCommentImg.height = 35;
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
};

const closeElementClick = () => {
  bigPictureElement.classList.add('hidden');
  modalOpenElement.classList.remove('modal-open');
};
closeBigPictureElement.addEventListener('click', closeElementClick);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    modalOpenElement.classList.remove('modal-open');
  }
});
export {drawBigPicture};
