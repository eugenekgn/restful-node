'use strict';

const express = require('express');
const httpStatus = require('http-status');
const isNil = require('lodash/isNil');
const isEmpty = require('lodash/isEmpty');
const Error = require('../../services/models/error');
const get = require('lodash/get');

class BaseController {
  constructor(service) {
    this.service = service;
    this.router = express.Router();
  }

  getBody(req) {
    return req.body;
  }

  getQuery(req) {
    return req.query;
  }

  getParams(req) {
    return req.params;
  }

  registerRoutes() {
    throw new Error('not implemented');
  }

  wrap(fn) {
    const self = this;
    return (req, res, next) => {
      fn(req, res, next).then((data) => {
        if (req.method === 'GET' && isNil(data) && isEmpty(data)) {
          data = {
            statusCode: httpStatus.NOT_FOUND,
            message: httpStatus[404]
          };
        }
        self.send(res, null, data);
      }, (err) => {
        self.send(res, err);
      });
    };
  }

  send(res, err, data) {
    if (err) {
      //TODO: logger
      res.status(httpStatus[200]);
      if (err instanceof Error) {
        res.send(err);
      } else {
        res.send();
      }
    } else {
      res.statusCode = get(data, 'statusCode') || httpStatus.OK;
      res.json(data);
    }
  }
}

module.exports = BaseController;

