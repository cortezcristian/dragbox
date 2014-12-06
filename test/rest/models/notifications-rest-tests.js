// Notifications REST API
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
var Notification, notification, agent, notificationId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Notification '+d+"/api/v1/notifications", function(){
    before(function(done){
        // Before all tests
        Notification = require("../../../models/notification.js");
        // It show create a new document in the database
        notification = new Notification({ name: 'notification'+Math.floor((Math.random() * 10) + 1)});
        notification.save(function(err, doc){
            notificationId = doc._id;    
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

    describe('Notifications REST', function(){
        it('GET /api/v1/notifications', function(done){
            agent
              .get(d+'/api/v1/notifications')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/notifications/count', function(done){
            agent
              .get(d+'/api/v1/notifications/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/notifications', function(done){
            agent
              .post(d+'/api/v1/notifications')
              .send({ name: 'Test Creation Notification' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Notification');
                  done();
              });
        });
        it('PUT /api/v1/notifications/:notificationId', function(done){
            agent
              .put(d+'/api/v1/notifications/'+notificationId)
              .send({ name: 'Test Change Notification' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Notification');
                  done();
              });
        });
        it('DELETE /api/v1/notifications/:notificationId', function(done){
            agent
              .del(d+'/api/v1/notifications/'+notificationId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/notifications', function(done){
            agent
              .del(d+'/api/v1/notifications/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
