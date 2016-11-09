'use strict';

import BaseRepository from './base'
import Customer from '../schemas/customer.schema'

class CustomerRepository extends BaseRepository {

}

export default new CustomerRepository(Customer);

