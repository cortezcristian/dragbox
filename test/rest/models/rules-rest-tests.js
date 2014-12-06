// Rules REST API
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
var Rule, rule, agent, ruleId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Rule '+d+"/api/v1/rules", function(){
    before(function(done){
        // Before all tests
        Rule = require("../../../models/rule.js");
        // It show create a new document in the database
        rule = new Rule({ name: 'rule'+Math.floor((Math.random() * 10) + 1)});
        rule.save(function(err, doc){
            ruleId = doc._id;    
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

    describe('Rules REST', function(){
        it('GET /api/v1/rules', function(done){
            agent
              .get(d+'/api/v1/rules')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/rules/count', function(done){
            agent
              .get(d+'/api/v1/rules/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/rules', function(done){
            agent
              .post(d+'/api/v1/rules')
              .send({ name: 'Test Creation Rule' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Rule');
                  done();
              });
        });
        it('PUT /api/v1/rules/:ruleId', function(done){
            agent
              .put(d+'/api/v1/rules/'+ruleId)
              .send({ name: 'Test Change Rule' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Rule');
                  done();
              });
        });
        it('DELETE /api/v1/rules/:ruleId', function(done){
            agent
              .del(d+'/api/v1/rules/'+ruleId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/rules', function(done){
            agent
              .del(d+'/api/v1/rules/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
