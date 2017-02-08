const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index');
const should = chai.should();
chai.use(chaiHttp);
const images = require('./assets/images');
const seeders = require('./assets/seeders');

describe('RESTAURANT Requests', function() {
  it('POST /api/restaurants', function(done) {
    chai.request(server)
      .post('/api/restaurants')
      .set('Content-Type', 'application/json')
      .send(seeders.restaurantSeeder)
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
        seeders.restaurantToken = res.body.token;
        done();
      });
  });

  it('GET /api/restaurants/:login', function(done) {
    chai.request(server)
      .get('/api/restaurants/' + seeders.restaurantSeeder.login)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.have.property('rest_name');
        res.body.should.have.property('login');
        res.body.should.have.property('address');
        res.body.should.have.property('avatar');
        res.body.should.have.property('description');
        res.body.should.have.property('foods');
        res.body.should.have.property('likes');
        res.body.should.have.property('dislikes');
        res.body.foods.should.be.a('array');
        done();
      });
  });

  it('PUT /api/restaurants/:login', function(done) {
    chai.request(server)
      .put('/api/restaurants/' + seeders.restaurantSeeder.login)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + seeders.restaurantToken)
      .send(seeders.updateRestaurantSeeder)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('PUT /api/restaurants/change-password', function(done) {
    chai.request(server)
      .put('/api/restaurants/change-password')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + seeders.restaurantToken)
      .send(seeders.changePasswordSeeder)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });

  it('DELETE /api/restaurants', function(done) {
    chai.request(server)
      .delete('/api/restaurants')
      .set('Authorization', 'Bearer ' + seeders.restaurantToken)
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
