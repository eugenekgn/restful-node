'use strict';

/* eslint-disable new-cap, no-magic-numbers */

const schemaFactory = require('./base');

const getCustomer = (sequelize, DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    mobile_number: {
      type: DataTypes.STRING(100)
    },
    age: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  };
};

module.exports = schemaFactory.createSchema('customer', getCustomer);
