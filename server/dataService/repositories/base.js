'use strict';

const isArray = require('lodash/isArray');

export default class BaseRepository {
  constructor(model) {
    this.Model = model;
  }

  findById(id) {
    return this.Model.findById(id).then((model) => {
      return model ? model.toJSON() : null;
    });
  }

  find(options) {
    return this.Model.findAll(Object.assign({}, {
      raw: true
    }, options));
  }

  update(info, where) {
    return this.Model.update(info, Object.assign({}, {
      returning: true
    }, {
      where
    })).then((result) => {
      const models = result[1];

      return models.map(model => model.toJSON());
    });
  }

  remove(where, options) {
    return this.Model.destroy(Object.assign({
      where
    }, options));
  }

  create(info, options) {
    return this.Model.create(info, options).then(newModel => newModel.toJSON());
  }

  count(info) {
    return this.Model.count(info);
  }

  upsert(model, opts) {
    return this.Model.upsert(model, Object.assign({}, {
      validate: true
    }, opts));
  }

  bulkCreate(records, options) {
    return this.Model.bulkCreate(records, Object.assign({}, {
      returning: true,
      validate: true
    }, options)).then(models => {
      return models.map(model => model.toJSON());
    });
  }

  bulkUpsert(records, options) {
    const self = this;
    const upsertPromises = records.map((record) => {
      return self.upsert(record, options);
    });

    return Promise.all(upsertPromises);
  }

  toJSON(info) {
    const _toJSON = (res) => {
      return res.toJSON();
    };

    if (isArray(info)) {
      return info.map(_toJSON);
    } else if (!info) {
      return null;
    } else {
      return _toJSON(info);
    }
  }
}
