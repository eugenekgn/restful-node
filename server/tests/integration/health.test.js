const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const app = require('../../../index');

const expect = chai.expect;
chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# GET /api/health-check', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('200');
          done();
        })
        .catch(done);
    });
  });
});
