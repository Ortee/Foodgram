var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../nodestore/index');
var should = chai.should();
var uuid = require('node-uuid');
chai.use(chaiHttp);
var images = require('./assets/images');

describe('NODESTORE Requests', function() {
  var _uuid = uuid.v1();

  var FoodImageSeeder = {
    type: 'food',
    name: _uuid,
    photo: images.foodImage
  }

  var AvatarSeeder = {
    type: 'avatar',
    name: 'avatar-test',
    photo: images.avatarImage
  }

  describe('POST /api/images OPERATIONS', function() {
    it('FoodImage', function(done) {
      chai.request(server)
        .post('/api/images')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF1dGhvcml6ZWQi.-IPadrulXhXlGQd3eSkTdZRg0NCAN2yDfIBaCvAXrf8')
        .send(FoodImageSeeder)
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
        .send(AvatarSeeder)
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /api/images/:uuid  OPERATIONS', function() {
    it('Fullsize', function(done) {
      chai.request(server)
        .get('/api/images/' + _uuid + '?type=fullsize')
        .set('Accept', 'image/png')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it('Thumbnail', function(done) {
      chai.request(server)
        .get('/api/images/' + _uuid + '?type=thumbnail')
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

  it('DELETE /api/images/:uuid', function(done) {
    chai.request(server)
      .delete('/api/images/'+_uuid)
      .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImF1dGhvcml6ZWQi.-IPadrulXhXlGQd3eSkTdZRg0NCAN2yDfIBaCvAXrf8')
      .end(function(err, res) {
        res.should.have.status(204);
      });
  });
});
