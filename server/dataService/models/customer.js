'use strict';

const schema = require('./../schemas/customer.schema');

module.exports = function (sequelize, DataTypes) {
  const fields = schema.get(sequelize, DataTypes);

  const Customer = sequelize.define(schema.modelName, fields, {
    tableName: schema.tableName
  });

  return Customer;
};
