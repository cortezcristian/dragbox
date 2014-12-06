// LogChallenge Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var LogChallenge, logchallenge;

// Unit Tests
describe('Model Test LogChallenge', function(){
    before(function(){
        // Before all tests
        LogChallenge = require("../../../models/logchallenge.js");
    });

    describe('LogChallenge', function(){
        // It show create a new document in the database
        it('add a logchallenge', function(done){
            logchallenge = new LogChallenge({ name: 'logchallenge'+Math.floor((Math.random() * 10) + 1)});
            logchallenge.save(done);
        });

    });
});
