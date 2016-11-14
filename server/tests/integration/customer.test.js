import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, {expect} from 'chai';
import head from 'lodash/head';
import app from '../../../index';
import customers from '../data/customer.json';

chai.config.includeStack = true;


describe('## Customer APIs', () => {

  let customer;

  before((done)=> {
    customer = head(customers);
    done();
  });

  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
  });


  describe('# POST /api/customers', () => {
    it('should create a new customers', (done) => {

      request(app)
        .post('/api/customers')
        .send(customer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(customer.username);
          expect(res.body.mobileNumber).to.equal(customer.mobileNumber);
          customer = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/customers/:customerId', () => {
    it('should get customer details', (done) => {
      request(app)
        .get(`/api/customers/${customer.customerId}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(customer.username);
          expect(res.body.mobileNumber).to.equal(customer.mobileNumber);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when customer does not exists', (done) => {
      request(app)
        .get('/api/customers/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal(httpStatus[404]);
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/customers/:customerId', () => {
    it('should update customer details', (done) => {
      const newUserName = `${customer.username}_updated`;
      customer.username = newUserName;
      request(app)
        .put(`/api/customers/${customer.customerId}`)
        .send(customer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(newUserName);
          expect(res.body.mobileNumber).to.equal(customer.mobileNumber);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/customers/', () => {
    it('should get all customers', (done) => {
      request(app)
        .get('/api/customers')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/customers/', () => {
    it('should delete customer', (done) => {
      request(app)
        .delete(`/api/customers/${customer.customerId}`)
        .expect(httpStatus.OK)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });


});
