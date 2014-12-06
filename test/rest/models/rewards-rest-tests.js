// Rewards REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Reward, reward, agent, rewardId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Reward '+d+"/api/v1/rewards", function(){
    before(function(done){
        // Before all tests
        Reward = require("../../../models/reward.js");
        // It show create a new document in the database
        reward = new Reward({ name: 'reward'+Math.floor((Math.random() * 10) + 1)});
        reward.save(function(err, doc){
            rewardId = doc._id;    
        });
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
        agent
          .post(d+'/admin')
          .send({ email: "admin@anyandgo.com", password: "123456" })
          .end(function(res) {
              assert.ok(res.ok);
              done();
          });
    });

    describe('Rewards REST', function(){
        it('GET /api/v1/rewards', function(done){
            agent
              .get(d+'/api/v1/rewards')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/rewards/count', function(done){
            agent
              .get(d+'/api/v1/rewards/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/rewards', function(done){
            agent
              .post(d+'/api/v1/rewards')
              .send({ name: 'Test Creation Reward' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Reward');
                  done();
              });
        });
        it('PUT /api/v1/rewards/:rewardId', function(done){
            agent
              .put(d+'/api/v1/rewards/'+rewardId)
              .send({ name: 'Test Change Reward' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Reward');
                  done();
              });
        });
        it('DELETE /api/v1/rewards/:rewardId', function(done){
            agent
              .del(d+'/api/v1/rewards/'+rewardId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/rewards', function(done){
            agent
              .del(d+'/api/v1/rewards/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
