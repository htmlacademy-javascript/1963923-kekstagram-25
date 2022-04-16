const formElement = document.querySelector('.img-upload__form');
const imgUploadElement = document.querySelector('.img-upload');
const uploadFileElement = imgUploadElement.querySelector('#upload-file');
const overlayElement = imgUploadElement.querySelector('.img-upload__overlay');
const cancelElement = imgUploadElement.querySelector('#upload-cancel');

const closeForm = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileElement.value = '';
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onEscKeydown);
  }
}

const openForm = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);

};

uploadFileElement.addEventListener('change', openForm);

formElement.addEventListener('focusin',() => {
  document.removeEventListener('keydown', onEscKeydown);
});

formElement.addEventListener('focusout',() => {
  document.addEventListener('keydown', onEscKeydown);
});

cancelElement.addEventListener('click',  closeForm);

export {closeForm};
