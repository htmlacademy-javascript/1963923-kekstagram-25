const imgUploadPrewiew = document.querySelector('.img-upload__preview');
const smallerControlElement = document.querySelector('.scale__control--smaller');
const biggerControlElement = document.querySelector('.scale__control--bigger');
const valueControlElement = document.querySelector('.scale__control--value');
const effectElements = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const sliderForm = document.querySelector('.img-upload__effect-level');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
let scaleValue = parseInt(valueControlElement.value, 10);

function onSmallerControlClick() {
  if (scaleValue === MAX_SCALE){
    biggerControlElement.addEventListener('click', onBiggerControlClick);
  }

  scaleValue -= STEP_SCALE;
  valueControlElement.value = `${scaleValue}%`;
  imgUploadPrewiew.style.transform = `scale(${scaleValue/100})`;

  if (scaleValue === MIN_SCALE){
    smallerControlElement.removeEventListener('click', onSmallerControlClick);
  }
}

function onBiggerControlClick() {
  if (scaleValue === MIN_SCALE){
    smallerControlElement.addEventListener('click', onSmallerControlClick);
  }

  scaleValue += STEP_SCALE;
  valueControlElement.value = `${scaleValue}%`;
  imgUploadPrewiew.style.transform = `scale(${scaleValue/100})`;

  if (scaleValue === MAX_SCALE){
    biggerControlElement.removeEventListener('click', onBiggerControlClick);
  }
}

smallerControlElement.addEventListener('click', onSmallerControlClick);

let currentEffect = 'effect-none';

const effectStyleMap = {
  'effect-none': () => '',
  'effect-chrome': (effectValue) => `grayscale(${effectValue})`,
  'effect-sepia': (effectValue) => `sepia(${effectValue})`,
  'effect-marvin': (effectValue) => `invert(${effectValue}%)`,
  'effect-phobos': (effectValue) => `blur(${effectValue}px)`,
  'effect-heat': (effectValue) => `brightness(${effectValue})`,
};

const effectSliderOptionsMap = {
  'effect-none': {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1
  },
  'effect-chrome': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'effect-sepia': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'effect-marvin': {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  'effect-phobos': {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  'effect-heat': {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  }
};

const defaultSliderOptions = {
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const defaultOptions = Object.assign({}, effectSliderOptionsMap[currentEffect], defaultSliderOptions);
noUiSlider.create(sliderElement, defaultOptions);
sliderForm.style.opacity = '0';
sliderElement.setAttribute('disabled', 'disabled');
sliderElement.noUiSlider.on('update', () => {
  const effectValue = sliderElement.noUiSlider.get();
  effectValueElement.value = effectValue;
  imgUploadPrewiew.style.filter = effectStyleMap[currentEffect](effectValue);
});
sliderForm.style.opacity = '0';
sliderElement.setAttribute('disabled', 'disabled');
effectElements.forEach((effectElement)=>{
  effectElement.addEventListener('change', (evt) => {
    if (evt.target.id === 'effect-none'){
      sliderForm.style.opacity = '0';
      sliderElement.setAttribute('disabled', 'disabled');
    }
    if (currentEffect === 'effect-none'){
      sliderForm.style.opacity = 1;
      sliderElement.removeAttribute('disabled');
    }
    currentEffect = evt.target.id;
    const options = Object.assign({}, effectSliderOptionsMap[currentEffect], defaultSliderOptions);
    sliderElement.noUiSlider.updateOptions(options);
  });
});

const resetFilter = () => {currentEffect = 'effect-none';
  const options = Object.assign({}, effectSliderOptionsMap[currentEffect], defaultSliderOptions);
  sliderElement.noUiSlider.updateOptions(options);
  sliderForm.style.opacity = '0';
  sliderElement.setAttribute('disabled', 'disabled');
};

export {resetFilter};
