// LogActions REST API
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
var LogAction, logaction, agent, logactionId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API LogAction '+d+"/api/v1/logactions", function(){
    before(function(done){
        // Before all tests
        LogAction = require("../../../models/logaction.js");
        // It show create a new document in the database
        logaction = new LogAction({ name: 'logaction'+Math.floor((Math.random() * 10) + 1)});
        logaction.save(function(err, doc){
            logactionId = doc._id;    
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

    describe('LogActions REST', function(){
        it('GET /api/v1/logactions', function(done){
            agent
              .get(d+'/api/v1/logactions')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/logactions/count', function(done){
            agent
              .get(d+'/api/v1/logactions/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/logactions', function(done){
            agent
              .post(d+'/api/v1/logactions')
              .send({ name: 'Test Creation LogAction' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation LogAction');
                  done();
              });
        });
        it('PUT /api/v1/logactions/:logactionId', function(done){
            agent
              .put(d+'/api/v1/logactions/'+logactionId)
              .send({ name: 'Test Change LogAction' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change LogAction');
                  done();
              });
        });
        it('DELETE /api/v1/logactions/:logactionId', function(done){
            agent
              .del(d+'/api/v1/logactions/'+logactionId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/logactions', function(done){
            agent
              .del(d+'/api/v1/logactions/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
