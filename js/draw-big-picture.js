const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
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
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const pagination = {
  startNumber: 0,
  quantity: 5,
  comments: []
};
const renderComment = ({avatar, name, message}) => {
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
  return newComment;
};

const renderComments = () => {
  const from = pagination.startNumber * pagination.quantity;
  const to = from + pagination.quantity;
  const socialCommentsFragment = document.createDocumentFragment();
  socialCommentsFragment.innerHTML = '';
  pagination.comments.slice(from, to).forEach((comment) => {
    const newComment = renderComment(comment);
    socialCommentsFragment.appendChild(newComment);
  });
  socialCommentsElement.appendChild(socialCommentsFragment);
  if (pagination.comments.length <= to){
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentCount.innerHTML = `${pagination.comments.length} из <span class="comments-count">${pagination.comments.length}</span> комментариев`;
  } else {
    pagination.startNumber +=1;
    bigPictureCommentCount.innerHTML = `${to} из <span class="comments-count">${pagination.comments.length}</span> комментариев`;
  }
};

const drawBigPicture = (photo) => {
  bigPictureImgElement.src = photo.url;
  bigPictureLikesElement.textContent = photo.likes;
  bigPictureDescriptionElement.textContent = photo.description;
  socialCommentsElement.innerHTML = '';
  bigPictureCommentsLoader.classList.remove('hidden');
  pagination.startNumber = 0;
  pagination.comments = photo.comments;
  renderComments();
  bigPictureCommentsLoader.addEventListener('click', renderComments);
  bigPictureElement.classList.remove('hidden');
  modalOpenElement.classList.add('.modal-open');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

closeBigPictureElement.addEventListener('click', closeBigPicture);

export {drawBigPicture};
