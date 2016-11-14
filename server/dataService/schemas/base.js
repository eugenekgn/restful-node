'use strict';

const snakeCase = require('lodash/snakeCase');
const upperFirst = require('lodash/upperCase');
const camelCase = require('lodash/camelCase');

class Schema {
  constructor(name, getFunction) {
    this._name = name;
    this._get = getFunction;
  }

  get tableName() {
    return snakeCase(this._name);
  }

  get modelName() {
    return upperFirst(camelCase(this._name));
  }

  get(sequelize, DataTypes) {
    return this._get(sequelize, DataTypes);
  }
}

function createSchema(name, getFunction) {
  return new Schema(name, getFunction);
}

module.exports = {
  createSchema: createSchema
};

