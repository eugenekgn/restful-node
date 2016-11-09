'use strict';

import isNull from 'lodash/isNull';
import customerRepository from '../../dataService/repositories/customer.repository';
import {map} from '../../shared/mapper';
import CustomerDTO from '../models/customerDTO';

class CustomerService {

  constructor() {
    this.customerSource = 'DALCustomerModel'
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
  };

  create(customer) {
    const self = this;

    const customerModel = map(CustomerDTO, self.customerSource, customer);

    return customerRepository.create(customerModel).then((newCustomer) => {
      return map(self.customerSource, CustomerDTO, newCustomer);
    });

  }

  update(customerId, customerToUpdate) {
    const self = this;

    let customerModel = map(CustomerDTO, self.customerSource, customerToUpdate);

    return customerRepository.update(customerId, customerModel).then((updateCustomer) => {
      return map(self.customerSource, CustomerDTO, updateCustomer);
    });
  }

  removeCustomer(customerId) {
    return customerRepository.remove(customerId);
  }
}

export default new CustomerService();
