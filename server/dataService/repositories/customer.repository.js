'use strict';

const BaseRepository = require('./base');
const Customer = require('../models/customer');

class CustomerRepository extends BaseRepository {
  constructor({customer}) {
    super(customer);
  }
}

module.exports = new CustomerRepository(Customer);

