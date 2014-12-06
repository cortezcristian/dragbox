// Rule Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Rule, rule;

// Unit Tests
describe('Model Test Rule', function(){
    before(function(){
        // Before all tests
        Rule = require("../../../models/rule.js");
    });

    describe('Rule', function(){
        // It show create a new document in the database
        it('add a rule', function(done){
            rule = new Rule({ name: 'rule'+Math.floor((Math.random() * 10) + 1)});
            rule.save(done);
        });

    });
});
