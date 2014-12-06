// LogChallenges REST API
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
var LogChallenge, logchallenge, agent, logchallengeId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API LogChallenge '+d+"/api/v1/logchallenges", function(){
    before(function(done){
        // Before all tests
        LogChallenge = require("../../../models/logchallenge.js");
        // It show create a new document in the database
        logchallenge = new LogChallenge({ name: 'logchallenge'+Math.floor((Math.random() * 10) + 1)});
        logchallenge.save(function(err, doc){
            logchallengeId = doc._id;    
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

    describe('LogChallenges REST', function(){
        it('GET /api/v1/logchallenges', function(done){
            agent
              .get(d+'/api/v1/logchallenges')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/logchallenges/count', function(done){
            agent
              .get(d+'/api/v1/logchallenges/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/logchallenges', function(done){
            agent
              .post(d+'/api/v1/logchallenges')
              .send({ name: 'Test Creation LogChallenge' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation LogChallenge');
                  done();
              });
        });
        it('PUT /api/v1/logchallenges/:logchallengeId', function(done){
            agent
              .put(d+'/api/v1/logchallenges/'+logchallengeId)
              .send({ name: 'Test Change LogChallenge' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change LogChallenge');
                  done();
              });
        });
        it('DELETE /api/v1/logchallenges/:logchallengeId', function(done){
            agent
              .del(d+'/api/v1/logchallenges/'+logchallengeId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/logchallenges', function(done){
            agent
              .del(d+'/api/v1/logchallenges/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
