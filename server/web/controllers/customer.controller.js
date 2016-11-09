'use strict';

import validator from 'express-validation';
import get from 'lodash/get';

import BaseController from './base';
import customerService from '../../services/internal/customer.service';
import customerValidation from '../validators/customer.validator';


class CustomerController extends BaseController {

  registerRoutes() {
    const self = this;
    self.router.get('/', self.wrap(self._getAllCustomers));
    self.router.get('/:customerId', self.wrap(self._getCustomerById));
    self.router.post('/', validator(customerValidation.createCustomer), self.wrap(self._createCustomer));
    self.router.put('/:customerId', validator(customerValidation.updateCustomer), self.wrap(self._updateCustomer));
    self.router.delete('/:customerId', self.wrap(self._delete));

    return self.router;
  }

  _getCustomerById = (req) => {
    const self = this;

    const customerId = get(self.getParams(req), 'customerId');
    return self.service.getCustomerById(customerId);
  };

  _getAllCustomers = (req) => {
    const self = this;

    const {
      limit = 50,
      skip = 0
    } = self.getQuery(req);

    return self.service.find({limit, skip});
  };

  _createCustomer = (req) => {
    const self = this;

    const customer = self.getBody(req);
    return self.service.create(customer);
  };

  _updateCustomer = (req) => {
    const self = this;

    const customerId = get(self.getParams(req), 'customerId');
    const customerToUpdate = self.getBody(req);

    return self.service.update(customerId, customerToUpdate);
  };

  _delete = (req) => {
    const self = this;

    const customerId = get(self.getParams(req), 'id');

    return self.service.removeCustomer(customerId);
  }
}

export default new CustomerController(customerService);
