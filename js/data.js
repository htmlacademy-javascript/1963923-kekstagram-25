import {
  DESCRIPTIONS,
  MESSAGES,
  NAMES,
  MIN_AVATAR,
  MAX_AVATAR,
  MIN_COMMENTS_COUNT,
  MAX_COMMENTS_COUNT,
  MIN_LIKES_COUNT,
  MAX_LIKES_COUNT
} from './const.js';

import {
  getRandomInt,
  getRandomArrayElement,
  getRandomArray
} from './util.js';

const getComment = (id) => {
  const comment = {
    id: id,
    avatar: `img/avatar/${  getRandomInt(MIN_AVATAR, MAX_AVATAR)  }.svg`,
    message: `${getRandomArrayElement(MESSAGES)  } ${  getRandomArrayElement(MESSAGES)}`,
    name: getRandomArrayElement(NAMES)
  };
  return comment;
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

export {getPhotos};
