'use strict';

import customerMap from './customer.map'
//import creditCardMap from './creditCard.map'

class Mapper {

  register() {
    customerMap.registerMaps();
    //creditCardMap.registerMaps()
  }
}

export default new Mapper();
