'use strict';

import express from 'express';
import httpStatus from 'http-status';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import Error from '../../services/models/error';

export default class BaseController {
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
      res.statusCode = data && data.statusCode || httpStatus.OK;
      res.json(data);
    }
  }
}
