const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index');
const should = chai.should();
chai.use(chaiHttp);
const images = require('./assets/images');
const seeders = require('./assets/seeders');

describe('FOOD Requests', function() {
  it('POST /api/foods', function(done) {
    chai.request(server)
      .post('/api/foods')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN0X25hbWUiOiJGYXQgQm9iIEJ1cmdlciIsImlkIjoyLCJhZGRyZXNzIjoiS3JhbWFyc2thIDIxLCBQb3puYW4iLCJsb2dpbiI6ImZhdGJvYiIsImF2YXRhciI6ZmFsc2UsImRlc2NyaXB0aW9uIjoic3VwZXIgb3BpcyBmYXQgYm9iYSJ9.0O_K_4wATtJ1E_em9HCLqtrSAgznfIlycOOc5CcSbPU')
      .send(seeders.foodSeeder)
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
      .get('/api/foods/'+seeders.foodSeeder.uuid)
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
      .put('/api/foods/'+seeders.foodSeeder.uuid+'/likes')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('DELETE /api/foods/:uuid/likes', function(done) {
    chai.request(server)
      .delete('/api/foods/'+seeders.foodSeeder.uuid+'/likes')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });

  it('PUT /api/foods/:uuid/dislikes', function(done) {
    chai.request(server)
      .put('/api/foods/'+seeders.foodSeeder.uuid+'/dislikes')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('DELETE /api/foods/:uuid/dislikes', function(done) {
    chai.request(server)
      .delete('/api/foods/'+seeders.foodSeeder.uuid+'/dislikes')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });

  it('DELETE /api/foods/:uuid', function(done){
    chai.request(server)
      .delete('/api/foods/'+seeders.foodSeeder.uuid)
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN0X25hbWUiOiJGYXQgQm9iIEJ1cmdlciIsImlkIjoyLCJhZGRyZXNzIjoiS3JhbWFyc2thIDIxLCBQb3puYW4iLCJsb2dpbiI6ImZhdGJvYiIsImF2YXRhciI6ZmFsc2UsImRlc2NyaXB0aW9uIjoic3VwZXIgb3BpcyBmYXQgYm9iYSJ9.0O_K_4wATtJ1E_em9HCLqtrSAgznfIlycOOc5CcSbPU')
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
