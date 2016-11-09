'use strict';

import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  mobile_number: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'Invalid Number']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Customer', CustomerSchema);
