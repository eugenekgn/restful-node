'use strict';

import mapper from 'automapper-ts';
import mappings from '../services/mappings';

(() => {
  mappings.register();
})();

const map = (sourceType, destinationType, source) => {
  return mapper.map(sourceType, destinationType, source);
};

const mapArray = (sourceType, destinationType, sources) => {
  return sources.map((source) => {
    return mapper.map(sourceType, destinationType, source);
  });
};

export {
  map,
  mapArray
};
