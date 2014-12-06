// Notification Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Notification, notification;

// Unit Tests
describe('Model Test Notification', function(){
    before(function(){
        // Before all tests
        Notification = require("../../../models/notification.js");
    });

    describe('Notification', function(){
        // It show create a new document in the database
        it('add a notification', function(done){
            notification = new Notification({ name: 'notification'+Math.floor((Math.random() * 10) + 1)});
            notification.save(done);
        });

    });
});
