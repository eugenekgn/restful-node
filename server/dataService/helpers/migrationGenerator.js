'use strict';

const {toPairs, filter, isString, groupBy} = require('lodash');

function getUniques(schemaStructure) {
  // [{fieldName, fieldDescription}]
  let fieldsWithUniqueConstraint = filter(toPairs(schemaStructure), ([, fieldDescription]) => {
    return isString(fieldDescription.unique);
  });

  // {uniqueName: [{fieldName, fieldDescription}]}
  fieldsWithUniqueConstraint = groupBy(fieldsWithUniqueConstraint, ([, filedDescription]) => filedDescription.unique);

  return {
    uniqueKeys: Object.keys(fieldsWithUniqueConstraint).map((uniqueName) => {
      return {
        name: uniqueName,
        singleField: false,
        fields: fieldsWithUniqueConstraint[uniqueName].map(([fieldName]) => fieldName)
      };
    })
  };
}

function getOptions(schemaStructure) {
  return Object.assign({}, getUniques(schemaStructure));
}

module.exports = (schema) => {
  const tableName = schema.tableName;

  return {
    up: (queryInterface, Sequelize) => {
      const schemaStructure = schema.get(queryInterface.sequelize, Sequelize);

      return queryInterface.createTable({
        tableName
      }, schemaStructure, getOptions(schemaStructure));
    },

    down: queryInterface => queryInterface.dropTable(tableName)
  };
};
