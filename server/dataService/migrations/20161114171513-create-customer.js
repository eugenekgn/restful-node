'use strict';

const migrationGenerator = require('../helpers/migrationGenerator');
const schema = require('../schemas/customer.schema');

module.exports = migrationGenerator(schema);
