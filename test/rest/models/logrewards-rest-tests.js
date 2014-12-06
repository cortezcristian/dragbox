// LogRewards REST API
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
var LogReward, logreward, agent, logrewardId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API LogReward '+d+"/api/v1/logrewards", function(){
    before(function(done){
        // Before all tests
        LogReward = require("../../../models/logreward.js");
        // It show create a new document in the database
        logreward = new LogReward({ name: 'logreward'+Math.floor((Math.random() * 10) + 1)});
        logreward.save(function(err, doc){
            logrewardId = doc._id;    
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

    describe('LogRewards REST', function(){
        it('GET /api/v1/logrewards', function(done){
            agent
              .get(d+'/api/v1/logrewards')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/logrewards/count', function(done){
            agent
              .get(d+'/api/v1/logrewards/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/logrewards', function(done){
            agent
              .post(d+'/api/v1/logrewards')
              .send({ name: 'Test Creation LogReward' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation LogReward');
                  done();
              });
        });
        it('PUT /api/v1/logrewards/:logrewardId', function(done){
            agent
              .put(d+'/api/v1/logrewards/'+logrewardId)
              .send({ name: 'Test Change LogReward' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change LogReward');
                  done();
              });
        });
        it('DELETE /api/v1/logrewards/:logrewardId', function(done){
            agent
              .del(d+'/api/v1/logrewards/'+logrewardId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/logrewards', function(done){
            agent
              .del(d+'/api/v1/logrewards/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
