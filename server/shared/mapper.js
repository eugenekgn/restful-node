'use strict';

const mapper = require('automapper-ts');
const mappings = require('../services/mappings');

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

module.exports = {
  map: map,
  mapArray: mapArray
};
