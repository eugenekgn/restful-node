'use strict';

const validator = require('express-validation');
const {get} = require('lodash');
const BaseController = require('./base');
const customerService = require('../../services/internal/customer.service');
const customerValidation = require('../validators/customer.validator');

class CustomerController extends BaseController {

  registerRoutes() {
    const self = this;
    self.router.get('/', self.wrap(req => self._getAllCustomers(req)));
    self.router.get('/:customerId', self.wrap(req => self._getCustomerById(req)));
    self.router.post('/', validator(customerValidation.createCustomer), self.wrap(req => self._createCustomer(req)));
    self.router.post('/collection', self.wrap(req => self._createCustomers(req)));
    self.router.put('/:customerId', self.wrap(req => self._updateCustomer(req)));
    self.router.delete('/:customerId', self.wrap(req => self._delete(req)));

    return self.router;
  }

  _getCustomerById(req) {
    const self = this;

    const customerId = get(self.getParams(req), 'customerId');
    return self.service.getCustomerById(customerId);
  }

  _getAllCustomers(req) {
    const self = this;

    const query = get(self.getParams(req));
    return self.service.find({findOptions: query});
  }

  _createCustomer(req) {
    const self = this;
    const customer = self.getBody(req);
    return self.service.createCustomer(customer);
  }

  _createCustomers(req) {
    const self = this;
    const customers = self.getBody(req);
    return self.service.createCollection(customers);
  }

  _updateCustomer(req) {
    const self = this;
    const customerId = get(self.getParams(req), 'customerId');
    const customerToUpdate = self.getBody(req);

    return self.service.update(customerId, customerToUpdate);
  }

  _delete(req) {
    const self = this;

    const customerId = get(self.getParams(req), 'id');

    return self.service.removeCustomer(customerId);
  }
}

module.exports = new CustomerController(customerService);
