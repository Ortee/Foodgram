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
  let updateRestaurantSeeder =
    {
      login: 'test1',
      rest_name: 'Test One',
      address: 'Test address',
      description: 'Test description',
      avatar: images.avatarImage
    }
  ;
  let changePasswordSeeder =
    {
      login: 'test1',
      oldPassword: 'test1',
      newPassword: 'test2',
      newPassword2: 'test2'
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

  it('GET /api/restaurants/:login', function(done) {
    chai.request(server)
      .get('/api/restaurants/' + restaurantSeeder.login)
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
      .put('/api/restaurants/' + restaurantSeeder.login)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + restaurantToken)
      .send(updateRestaurantSeeder)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('PUT /api/restaurants/change-password', function(done) {
    chai.request(server)
      .put('/api/restaurants/change-password')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + restaurantToken)
      .send(changePasswordSeeder)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
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
