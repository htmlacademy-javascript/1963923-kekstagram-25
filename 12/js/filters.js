import {drawPhotos} from './draw.js';
import {shuffle, debounce} from './util.js';

const RERENDER_DELAY = 500;
const imgFiltersElement = document.querySelector('.img-filters');
const filtersElements = imgFiltersElement.querySelectorAll('.img-filters__button');
const filtersMap = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => {
    const nextPhotos = Array.from(photos);
    shuffle(nextPhotos);
    return nextPhotos.slice(0, 10);
  },
  'filter-discussed': (photos) => {
    const nextPhotos = Array.from(photos);
    nextPhotos.sort((a, b) => b.comments.length - a.comments.length);
    return nextPhotos;
  }
};

const initFilters = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  const onFiltersClick = (event) => {
    if(event.target.tagName === 'BUTTON' && filtersMap[event.target.id]){
      filtersElements.forEach((filtersElement) => {
        filtersElement.classList.remove('img-filters__button--active');
      });
      event.target.classList.add('img-filters__button--active');
      const filterFunction = filtersMap[event.target.id];
      drawPhotos(filterFunction(photos));
    }
  };
  imgFiltersElement.addEventListener('click', debounce(onFiltersClick, RERENDER_DELAY));
};

export{initFilters};
