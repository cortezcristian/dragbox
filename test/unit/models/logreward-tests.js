// LogReward Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var LogReward, logreward;

// Unit Tests
describe('Model Test LogReward', function(){
    before(function(){
        // Before all tests
        LogReward = require("../../../models/logreward.js");
    });

    describe('LogReward', function(){
        // It show create a new document in the database
        it('add a logreward', function(done){
            logreward = new LogReward({ name: 'logreward'+Math.floor((Math.random() * 10) + 1)});
            logreward.save(done);
        });

    });
});
