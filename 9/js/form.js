const openNewForm = document.querySelector('.img-upload');
const openNewElement = openNewForm.querySelector('#upload-file');
const editFormPhoto = openNewForm.querySelector('.img-upload__overlay');
const modalOpenElement = document.querySelector('body');
const closeNewPhotoElement = openNewForm.querySelector('#upload-cancel');
const formElement = document.querySelector('.img-upload__form');
const closeNewPhoto = () => {
  editFormPhoto.classList.add('hidden');
  modalOpenElement.classList.remove('modal-open');
  openNewElement.value = '';
};
const newPhotoEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeNewPhoto();
    document.removeEventListener('keydown', newPhotoEscKeydown);
  }
};

const openNewPhoto = () => {
  editFormPhoto.classList.remove('hidden');
  modalOpenElement.classList.add('modal-open');
  document.addEventListener('keydown', newPhotoEscKeydown);

};
openNewElement.addEventListener('change', openNewPhoto);

formElement.addEventListener('focusin',() => {
  document.removeEventListener('keydown', newPhotoEscKeydown);
});

formElement.addEventListener('focusout',() => {
  document.addEventListener('keydown', newPhotoEscKeydown);
});

const closeNewPhotoClick = () => {
  closeNewPhoto();
  document.removeEventListener('keydown', newPhotoEscKeydown);
};

closeNewPhotoElement.addEventListener('click',  closeNewPhotoClick);
