'use strict';

import isNumber from 'lodash/isNumber';

export default class BaseRepository {

  constructor(model) {
    this.Model = model;
  }

  getMongooseModel(id) {
    const self = this;
    return self.Model.findById(id);
  };

  findById(id) {
    const self = this;
    return self.Model.findById(id).lean();
  };

  find(query) {
    const self = this;
    let findOption = {};
    let sortOptions = {};
    let skip;
    let limit;

    /* istanbul ignore else */
    if (isNumber(query.limit)) {
      limit = query.limit;
    }

    /* istanbul ignore else */
    if (isNumber(query.skip)) {
      skip = query.skip;
    }

    /* istanbul ignore else */
    if (query.sortOptions) {
      sortOptions[query.sortOptions.sortField] = (query.sortOptions.sortType && query.sortOptions.sortType.toLowerCase() === 'desc') ? -1 : 1;
    }

    /* istanbul ignore else */
    if (query.findOption) {
      findOption = query.findOption;
    }

    return self.Model.find(findOption)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();
  };

  findOne(query, projection) {
    const self = this;
    return self.Model.findOne(query, projection).lean();
  }

  update(id, info) {
    const self = this;
    return self.Model.findByIdAndUpdate(id, {
      $set: info
    }, {
      runValidators: true,
      new: true
    }).then((updatedModel) => {
      return updatedModel.toObject();
    });
  };

  remove(id) {
    const self = this;
    return self.Model.findByIdAndRemove(id);
  };

  create(info) {
    const self = this;
    let entity = new self.Model(info);

    return entity.save().then((entity) => {
      return entity.toObject();
    });
  };

  bulkCreate(models) {
    const self = this;
    return self.Model.create(models).then((models) => {
      return models.map((model) => {
        return model.toObject();
      });
    });
  };

  count(query) {
    const self = this;
    return self.Model.count(query);
  };
}

