const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index');
const should = chai.should();
const uuid = require('node-uuid');
chai.use(chaiHttp);
const images = require('./assets/images');

describe('RESTAURANT Requests', function() {

  let restaurantSeeder =
    {
      username: 'Test 1',
      login: 'test1',
      passwordOne: 'test1',
      passwordTwo: 'test1'
    }
  ;
  let restaurantToken;

  it('POST /api/restaurants', function(done) {
    chai.request(server)
      .post('/api/restaurants')
      .set('Content-Type', 'application/json')
      .send(restaurantSeeder)
      .end(function(err, res) {
        res.should.have.status(201);
        done();
      });
  });

  it('POST /api/restaurants/token', function(done) {
    chai.request(server)
      .post('/api/restaurants/token')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .type('form')
      .send('username=test1')
      .send('password=test1')
      .end(function(err, res) {
        res.should.have.status(200);
        restaurantToken = res.body.token;
        done();
      });
  });

  it('DELETE /api/restaurants', function(done) {
    chai.request(server)
      .delete('/api/restaurants')
      .set('Authorization', 'Bearer ' + restaurantToken)
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });

});
