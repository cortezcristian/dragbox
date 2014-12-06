// NotificationTemplates REST API
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
var NotificationTemplate, notificationtemplate, agent, notificationtemplateId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API NotificationTemplate '+d+"/api/v1/notificationtemplates", function(){
    before(function(done){
        // Before all tests
        NotificationTemplate = require("../../../models/notificationtemplate.js");
        // It show create a new document in the database
        notificationtemplate = new NotificationTemplate({ name: 'notificationtemplate'+Math.floor((Math.random() * 10) + 1)});
        notificationtemplate.save(function(err, doc){
            notificationtemplateId = doc._id;    
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

    describe('NotificationTemplates REST', function(){
        it('GET /api/v1/notificationtemplates', function(done){
            agent
              .get(d+'/api/v1/notificationtemplates')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/notificationtemplates/count', function(done){
            agent
              .get(d+'/api/v1/notificationtemplates/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/notificationtemplates', function(done){
            agent
              .post(d+'/api/v1/notificationtemplates')
              .send({ name: 'Test Creation NotificationTemplate' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation NotificationTemplate');
                  done();
              });
        });
        it('PUT /api/v1/notificationtemplates/:notificationtemplateId', function(done){
            agent
              .put(d+'/api/v1/notificationtemplates/'+notificationtemplateId)
              .send({ name: 'Test Change NotificationTemplate' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change NotificationTemplate');
                  done();
              });
        });
        it('DELETE /api/v1/notificationtemplates/:notificationtemplateId', function(done){
            agent
              .del(d+'/api/v1/notificationtemplates/'+notificationtemplateId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/notificationtemplates', function(done){
            agent
              .del(d+'/api/v1/notificationtemplates/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
