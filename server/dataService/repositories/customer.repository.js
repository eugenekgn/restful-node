'use strict';

const BaseRepository = require('./base');
const dbContext = require('../models');

class CustomerRepository extends BaseRepository {
  constructor(context) {
    super(context.customer);
  }

  updateCustomer(customerId, model) {
    const self = this;
    return self.update(model, {id: customerId});
  }

  removeCustomer(customerId) {
    const self = this;

    return self.remove({
      id: customerId
    });
  }
}

module.exports = new CustomerRepository(dbContext);

