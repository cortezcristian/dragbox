// LogAction Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var LogAction, logaction;

// Unit Tests
describe('Model Test LogAction', function(){
    before(function(){
        // Before all tests
        LogAction = require("../../../models/logaction.js");
    });

    describe('LogAction', function(){
        // It show create a new document in the database
        it('add a logaction', function(done){
            logaction = new LogAction({ name: 'logaction'+Math.floor((Math.random() * 10) + 1)});
            logaction.save(done);
        });

    });
});
