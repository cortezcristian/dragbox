// Action Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Action, action;

// Unit Tests
describe('Model Test Action', function(){
    before(function(){
        // Before all tests
        Action = require("../../../models/action.js");
    });

    describe('Action', function(){
        // It show create a new document in the database
        it('add a action', function(done){
            action = new Action({ name: 'action'+Math.floor((Math.random() * 10) + 1)});
            action.save(done);
        });

    });
});
