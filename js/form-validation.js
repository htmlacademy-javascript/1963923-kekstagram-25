import {savePhoto} from './save-photo.js';
import {closeForm} from './form.js';
import {resetFilter} from './edit-big-photo.js';
import {onRequestFinish} from './util.js';
import {resetFile} from './preview.js';

const formElement = document.querySelector('.img-upload__form');
const hashtagElement = formElement.querySelector('.text__hashtags');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const uploadButtonElement = document.querySelector('#upload-submit');
const maxCountHashtags = 5;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text_error',
});

const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value ? value.split(' ') : [];
  return hashtags.length <= maxCountHashtags;
}, `Нельзя указывать больше ${maxCountHashtags} ХэшТегов`);

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value ? value.split(' ') : [];
  for(let i = 0; i < hashtags.length; i++){
    if(!re.test(hashtags[i])){
      return false;
    }
  }
  return true;
}, 'Не валидный ХэшТег');

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value ? value.split(' ') : [];
  const newHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  if (newHashtags.length > 1) {
    for (let i = 0; i < newHashtags.length; i++) {
      for (let j = i + 1; j < newHashtags.length; j++){
        if (newHashtags[i] === newHashtags[j]) {
          return false;
        }
      }
    }
  }

  return true;
}, 'Один и тот же хэш-тег не может быть использован дважды');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    uploadButtonElement.setAttribute('disabled', 'disabled');
    savePhoto(
      formElement,
      () => {
        formElement.reset();
        resetFilter();
        resetFile();
        onRequestFinish(successTemplate, '.success__button');
        closeForm();
        uploadButtonElement.removeAttribute('disabled');
      },
      () => {
        onRequestFinish(errorTemplate, '.error__button');
        closeForm();
        uploadButtonElement.removeAttribute('disabled');
      }
    );
  }
});
