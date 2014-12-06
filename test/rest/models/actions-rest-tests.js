// Actions REST API
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
var Action, action, agent, actionId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Action '+d+"/api/v1/actions", function(){
    before(function(done){
        // Before all tests
        Action = require("../../../models/action.js");
        // It show create a new document in the database
        action = new Action({ name: 'action'+Math.floor((Math.random() * 10) + 1)});
        action.save(function(err, doc){
            actionId = doc._id;    
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

    describe('Actions REST', function(){
        it('GET /api/v1/actions', function(done){
            agent
              .get(d+'/api/v1/actions')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/actions/count', function(done){
            agent
              .get(d+'/api/v1/actions/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/actions', function(done){
            agent
              .post(d+'/api/v1/actions')
              .send({ name: 'Test Creation Action' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Action');
                  done();
              });
        });
        it('PUT /api/v1/actions/:actionId', function(done){
            agent
              .put(d+'/api/v1/actions/'+actionId)
              .send({ name: 'Test Change Action' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Action');
                  done();
              });
        });
        it('DELETE /api/v1/actions/:actionId', function(done){
            agent
              .del(d+'/api/v1/actions/'+actionId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/actions', function(done){
            agent
              .del(d+'/api/v1/actions/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
