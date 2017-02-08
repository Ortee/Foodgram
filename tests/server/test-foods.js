var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/index');
var should = chai.should();
var uuid = require('node-uuid');
chai.use(chaiHttp);
var images = require('./assets/images');

describe('REQUESTS TO SERVER', function() {
  var _uuid = uuid.v1();

  var FoodSeeder =
    {
      login: 'fatbob',
      uuid: _uuid,
      description: 'Chai testing burger (tmp)',
      hashtags: '#chai #test #tmp',
      photo: images.foodImage
    }
  ;

  it('POST /api/foods', function(done) {
    chai.request(server)
      .post('/api/foods')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN0X25hbWUiOiJGYXQgQm9iIEJ1cmdlciIsImlkIjoyLCJhZGRyZXNzIjoiS3JhbWFyc2thIDIxLCBQb3puYW4iLCJsb2dpbiI6ImZhdGJvYiIsImF2YXRhciI6ZmFsc2UsImRlc2NyaXB0aW9uIjoic3VwZXIgb3BpcyBmYXQgYm9iYSJ9.0O_K_4wATtJ1E_em9HCLqtrSAgznfIlycOOc5CcSbPU')
      .send(FoodSeeder)
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });

  it('GET /api/foods', function(done) {
    chai.request(server)
      .get('/api/foods')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('Array');
        res.body[0].should.have.property('login');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('uuid');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('hashtags');
        res.body[0].should.have.property('likes');
        res.body[0].should.have.property('dislikes');
        res.body[0].should.have.property('created_at');
        res.body[0].should.have.property('updated_at');
        done();
      });
  });

  it('GET /api/foods/:uuid', function(done) {
    chai.request(server)
      .get('/api/foods/'+_uuid)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('login');
        res.body.should.have.property('id');
        res.body.should.have.property('uuid');
        res.body.should.have.property('username');
        res.body.should.have.property('description');
        res.body.should.have.property('hashtags');
        res.body.should.have.property('likes');
        res.body.should.have.property('dislikes');
        res.body.should.have.property('created_at');
        res.body.should.have.property('updated_at');
        done();
      });
  });

  it('GET /api/foods/likes', function(done) {
    chai.request(server)
      .get('/api/foods/likes')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('likes');
        res.body[0].should.have.property('dislikes');
        done();
      });
  });

  it('PUT /api/foods/:uuid/likes', function(done) {
    chai.request(server)
      .put('/api/foods/'+_uuid+'/likes')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('DELETE /api/foods/:uuid/likes', function(done) {
    chai.request(server)
      .delete('/api/foods/'+_uuid+'/likes')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });

  it('PUT /api/foods/:uuid/dislikes', function(done) {
    chai.request(server)
      .put('/api/foods/'+_uuid+'/dislikes')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('DELETE /api/foods/:uuid/dislikes', function(done) {
    chai.request(server)
      .delete('/api/foods/'+_uuid+'/dislikes')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });

  it('DELETE /api/foods/:uuid', function(done){
    chai.request(server)
      .delete('/api/foods/'+_uuid)
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN0X25hbWUiOiJGYXQgQm9iIEJ1cmdlciIsImlkIjoyLCJhZGRyZXNzIjoiS3JhbWFyc2thIDIxLCBQb3puYW4iLCJsb2dpbiI6ImZhdGJvYiIsImF2YXRhciI6ZmFsc2UsImRlc2NyaXB0aW9uIjoic3VwZXIgb3BpcyBmYXQgYm9iYSJ9.0O_K_4wATtJ1E_em9HCLqtrSAgznfIlycOOc5CcSbPU')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
