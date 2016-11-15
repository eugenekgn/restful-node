const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const head = require('lodash/head');
const app = require('../../../index');
const customers = require('../data/customer.json');
const customerRepository = require('../../dataService/repositories/customer.repository');

const expect = chai.expect;
chai.config.includeStack = true;


describe('## Customer APIs', () => {

  let customer;

  //TODO: create hooks
  before((done) => {
    customer = head(customers);
    done();
  });

  after((done) => {
    customerRepository.remove({}).then(() => {
      done();
    });
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
        .get('/api/customers/-10')
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
      const newNumber = '0000000000';
      customer.username = newUserName;
      customer.mobileNumber = newNumber;
      request(app)
        .put(`/api/customers/${customer.customerId}`)
        .send(customer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(newUserName);
          expect(res.body.mobileNumber).to.equal(newNumber);
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

});
