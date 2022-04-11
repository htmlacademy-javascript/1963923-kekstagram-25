const formElement = document.querySelector('.img-upload__form');
const hashtagElement = formElement.querySelector('.text__hashtags');
const maxCountHashtags = 5;
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text_error',
});
const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value.split(' ');
  return hashtags.length <= maxCountHashtags;
}, `Нельзя указывать больше ${maxCountHashtags} ХэшТегов`);

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value.split(' ');
  for(let i = 0; i < hashtags.length; i++){
    if(!re.test(hashtags[i])){
      return false;
    }
  }
  return true;
}, 'Не валидный ХэшТег');

pristine.addValidator(hashtagElement, (value) => {
  const hashtags = value.split(' ');
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
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }
});
