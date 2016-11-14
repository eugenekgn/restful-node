'use strict';

const customerMap = require('./customer.map');
//import creditCardMap from './creditCard.map'

class Mapper {

  register() {
    customerMap.registerMaps();
    //creditCardMap.registerMaps()
  }
}

module.exports = new Mapper();
