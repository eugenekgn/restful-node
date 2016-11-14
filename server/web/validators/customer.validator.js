'use strict';

const Joi = require('joi');

const bodyRules = {
  username: Joi.string().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required()
};

module.exports = {
  createCustomer: {
    body: bodyRules
  },
  updateCustomer: {
    body: bodyRules,
    params: {
      customerId: Joi.string().hex().required()
    }
  }
};
