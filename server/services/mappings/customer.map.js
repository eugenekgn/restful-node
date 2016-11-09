'use strict';

import mapper from 'automapper-ts';
import isUndefined from 'lodash/isUndefined';
import CustomerDTOModel from '../models/customerDTO';

const DALCustomerModel = 'DALCustomerModel';

class CustomerMaps {

  registerMaps() {

    /**
     * Map from dto to model
     */
    mapper.createMap(CustomerDTOModel, DALCustomerModel)
      .forMember('_id', (opts) => {
        opts.mapFrom('customerId');
      })
      .forMember('first_name', (opts) => {
        opts.mapFrom('firstName');
      })
      .forMember('last_name', (opts) => {
        opts.mapFrom('lastName');
      })
      .forMember('mobile_number', (opts) => {
        opts.mapFrom('mobileNumber');
      })
      .forAllMembers((model, prop, value) => {
        /* istanbul ignore else */
        if (!isUndefined(value)) {
          model[prop] = value;
        }
      });

    /**
     * Map model to dto
     */
    mapper.createMap(DALCustomerModel, CustomerDTOModel)
      .forMember('customerId', (opts) => {
        opts.mapFrom('_id');
      })
      .forMember('firstName', (opts) => {
        opts.mapFrom('first_name');
      })
      .forMember('lastName', (opts) => {
        opts.mapFrom('last_name');
      })
      .forMember('mobileNumber', (opts) => {
        opts.mapFrom('mobile_number');
      })
      .forAllMembers((model, prop, value) => {
        if (model.hasOwnProperty(prop)) {
          model[prop] = value;
        }
      });
  }
}

export default new CustomerMaps();
