// Reward Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Reward, reward;

// Unit Tests
describe('Model Test Reward', function(){
    before(function(){
        // Before all tests
        Reward = require("../../../models/reward.js");
    });

    describe('Reward', function(){
        // It show create a new document in the database
        it('add a reward', function(done){
            reward = new Reward({ name: 'reward'+Math.floor((Math.random() * 10) + 1)});
            reward.save(done);
        });

    });
});
