const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../nodestore/index');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const images = require('./assets/images');
const seeders = require('./assets/seeders');

describe('NODESTORE Requests', function() {

  describe('POST /api/images OPERATIONS', function() {
    it('FoodImage', function(done) {
      chai.request(server)
        .post('/api/images')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF1dGhvcml6ZWQi.-IPadrulXhXlGQd3eSkTdZRg0NCAN2yDfIBaCvAXrf8')
        .send(seeders.foodImageSeeder)
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it('AvatarImage', function(done) {
      chai.request(server)
        .post('/api/images')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF1dGhvcml6ZWQi.-IPadrulXhXlGQd3eSkTdZRg0NCAN2yDfIBaCvAXrf8')
        .send(seeders.avatarSeeder)
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /api/images/:uuid  OPERATIONS', function() {
    before(function(done) {
      setTimeout(function(){
        done();
      }, 1500);
    })
    it('Fullsize', function(done) {
      chai.request(server)
        .get('/api/images/' + seeders.foodImageSeeder.name + '?type=thumbnail')
        .set('Accept', 'image/png')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it('Thumbnail', function(done) {
      chai.request(server)
        .get('/api/images/' + seeders.foodImageSeeder.name + '?type=thumbnail')
        .set('Accept', 'image/png')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it('Avatar', function(done) {
      chai.request(server)
        .get('/api/images/avatar-test?type=avatar')
        .set('Accept', 'image/png')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('DELETE /api/images/:uuid OPERATIONS', function() {
    before(function(done) {
      setTimeout(function(){
        done();
      }, 1700);
    })
    it('DELETE /api/images/:uuid', function(done) {
      chai.request(server)
        .delete('/api/images/'+seeders.foodImageSeeder.name)
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF1dGhvcml6ZWQi.-IPadrulXhXlGQd3eSkTdZRg0NCAN2yDfIBaCvAXrf8')
        .end(function(err, res) {
          res.should.have.status(204);
          done();
        });
    });
  });
});
