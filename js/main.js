//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function getLengthOfString(string, maxLength) {
  return string.length <= maxLength;
}

const DESCRIPTIONS = [
  'Поездка по Санкт-Питербургу',
  'Золотая осень',
  'Моя любимая собака',
  'Рыбалка это моё хобби',
  'Поездка на Волгу',
  'Поездка на море',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Владимир',
  'Елена',
  'Ксения',
  'Владислав',
  'Егор',
  'Сергей',
  'Наталья',
  'Евгений',
  'Дарья'
];

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 5;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const PHOTOS_COUNT = 25;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const getComment = (id) => {
  const comment = {
    id: id,
    avatar: `img/avatar/${  getRandomInt(MIN_AVATAR, MAX_AVATAR)  }.svg`,
    message: `${getRandomArrayElement(MESSAGES)  } ${  getRandomArrayElement(MESSAGES)}`,
    name: getRandomArrayElement(NAMES)
  };
  return comment;
};

const getRandomArray = (callback, count) => {
  const data = [];
  for (let i = 0; i < count; i++){
    data.push(callback(i + 1));
  }
  return data;
};

const getPhoto = (id) =>{
  const commentsCount = getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  const photo = {
    id: id,
    url: `photos/${  id  }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getRandomArray(getComment, commentsCount)
  };
  return photo;
};


const getPhotos = (count) => getRandomArray(getPhoto, count);


getPhotos(PHOTOS_COUNT);
getLengthOfString('qwerty', 10);
