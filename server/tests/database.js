'use strict';

import forIn from 'lodash/forIn';
import mongoose from 'mongoose';

const clearAllCollections = () => {
  const promises = [];

  forIn(mongoose.models, (model) => {
    promises.push(model.remove({}));
  });

  return Promise.all(promises);
};

export default {clearAllCollections};
