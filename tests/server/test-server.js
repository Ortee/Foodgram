var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/index');
var should = chai.should();
var uuid = require('node-uuid');
chai.use(chaiHttp);

describe('REQUESTS TO SERVER', function() {
  var _uuid = uuid.v1();
  var FoodSeeder = [
    {
      uuid:_uuid,
      username:_uuid,
      description:"Very tasty",
      hashtags:"#nice #burger #tasty #love #secondburger",
      photo:"http://dfep0xlbws1ys.cloudfront.net/thumbs2d/dd/2ddd2a4753463c2f396777f0c85502e2.jpg"
    }
  ];

  it('GET /api/foods', function(done) {
    chai.request(server)
      .get('/api/foods')
      .set('accept', 'application/json')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('Array');
        done();
      });
  });
  it('POST /api/foods', function(done) {
    chai.request(server)
      .post('/api/foods')
      .set('Content-Type', 'application/json')
      .send(FoodSeeder)
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods', function(done) {
    chai.request(server)
      .put('/api/foods')
      .set('Content-Type', 'application/json')
      .send([{
        id: 999,
        uuid:_uuid,
        description: 'Test description',
        hashtags: 'Test hashtags',
        photo:'photo.jpg',
        likes:999,
        dislikes:999
      }])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/description', function(done) {
    chai.request(server)
      .put('/api/foods/description')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid, description: 'Test description'}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/hashtags', function(done) {
    chai.request(server)
      .put('/api/foods/hashtags')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid, hashtags: 'Test hashtags'}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/photo', function(done) {
    chai.request(server)
      .put('/api/foods/photo')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid, photo: 'test.jpg'}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/likes', function(done) {
    chai.request(server)
      .put('/api/foods/likes')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/likes/decrement', function(done) {
    chai.request(server)
      .put('/api/foods/likes/decrement')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/dislikes', function(done) {
    chai.request(server)
      .put('/api/foods/dislikes')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('PUT /api/foods/dislikes/decrement', function(done) {
    chai.request(server)
      .put('/api/foods/dislikes/decrement')
      .set('Content-Type', 'application/json')
      .send([{uuid:_uuid}])
      .end(function(err, res){
        res.should.have.status(201);
        done();
      });
  });
  it('DELETE /api/foods', function(done) {
    chai.request(server)
      .delete('/api/foods')
      .send([{uuid:_uuid}])
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        res.should.have.status(204);
        done();
      });
  });
});
