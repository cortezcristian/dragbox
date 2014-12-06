// Challenge Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Challenge, challenge;

// Unit Tests
describe('Model Test Challenge', function(){
    before(function(){
        // Before all tests
        Challenge = require("../../../models/challenge.js");
    });

    describe('Challenge', function(){
        // It show create a new document in the database
        it('add a challenge', function(done){
            challenge = new Challenge({ name: 'challenge'+Math.floor((Math.random() * 10) + 1)});
            challenge.save(done);
        });

    });
});
