// NotificationTemplate Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var NotificationTemplate, notificationtemplate;

// Unit Tests
describe('Model Test NotificationTemplate', function(){
    before(function(){
        // Before all tests
        NotificationTemplate = require("../../../models/notificationtemplate.js");
    });

    describe('NotificationTemplate', function(){
        // It show create a new document in the database
        it('add a notificationtemplate', function(done){
            notificationtemplate = new NotificationTemplate({ name: 'notificationtemplate'+Math.floor((Math.random() * 10) + 1)});
            notificationtemplate.save(done);
        });

    });
});
