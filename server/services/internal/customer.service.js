'use strict';

const isNull = require('lodash/isNull');
const customerRepository = require('../../dataService/models/customer');
const {map, mapArray} = require('../../shared/mapper');
const CustomerDTO = require('../models/customerDTO');

class CustomerService {

  constructor() {
    this.customerSource = 'DALCustomerModel';
  }

  getCustomerById(customerId) {
    const self = this;

    return customerRepository.findById(customerId).then((customer) => {

      if (isNull(customer)) {
        return null;
      }
      return map(self.customerSource, CustomerDTO, customer);
    });
  }

  find(query) {
    const self = this;

    return customerRepository.find(query).then((customer) => {
      return map(self.customerSource, CustomerDTO, customer);
    });
  }

  create(customer) {
    const self = this;

    const customerModel = map(CustomerDTO, self.customerSource, customer);
    return customerRepository.create(customerModel).then((newCustomer) => {
      return map(self.customerSource, CustomerDTO, newCustomer);
    });
  }

  createCollection(customers) {
    const self = this;

    const customerCollectionModel = mapArray(CustomerDTO, self.customerSource, customers);
    return customerRepository.bulkCreate(customerCollectionModel).then((newCustomers) => {
      return mapArray(self.customerSource, CustomerDTO, newCustomers);
    });

  }

  update(customerId, customerToUpdate) {
    const self = this;

    const customerModel = map(CustomerDTO, self.customerSource, customerToUpdate);

    return customerRepository.update(customerId, customerModel).then((updateCustomer) => {
      return map(self.customerSource, CustomerDTO, updateCustomer);
    });
  }

  removeCustomer(customerId) {
    return customerRepository.remove(customerId);
  }
}

module.exports = new CustomerService();
