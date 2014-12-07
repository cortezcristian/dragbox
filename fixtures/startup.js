/**
 *
 ____                  _               
|  _ \ _ __ __ _  __ _| |__   _____  __
| | | | '__/ _` |/ _` | '_ \ / _ \ \/ /
| |_| | | | (_| | (_| | |_) | (_) >  < 
|____/|_|  \__,_|\__, |_.__/ \___/_/\_\
                 |___/                 
 */

var async = require("async"),
    Action = require('../models/action.js'),
    Challenge = require('../models/challenge.js'),
    LogAction = require('../models/logaction.js'),
    LogChallenge = require('../models/logchallenge.js'),
    LogReward = require('../models/logreward.js'),
    Notification = require('../models/notification.js'),
    NotificationTemplate = require('../models/notificationtemplate.js'),
    Reward = require('../models/reward.js'),
    Rule = require('../models/rule.js'),
    dbConex = module.parent.exports.dbConex;

// Clean Collections
var clearCollections = function(cb) {
    var clearToCollections = 'actions,challenges,logactions,logchallenges,logrewards,notifications,notificationtemplates,rewards,rules';

    async.map(clearToCollections.split(","), function(op, callback){
        console.log("removing...", op);
        dbConex.connection.collections[op].drop( function(err) {
            callback(err, op);
        });
    }, function(err, res) {
        console.log(">>>", err, res);    
        cb(null, 'Collections Cleared')
    });
}

/**
 *

## Actions

| Name       | Desc                  |
| :---       | :---                  |
| visit      | Visit page            |
| scroll     | Scroll down the page  |
| watchvideo | View terms with video |
| answer     | Answer Quiz           |
| answerok   | Answer Quiz correctly |
| answerfail | Answer Quiz wrongly   |

 */
var loadActions = function(cb) {
    var actions = [ 
        { name: "visit", desc: "Visit page" } 
        , { name: "scroll", desc: "Scroll down the page" } 
        , { name: "watchvideo", desc: "View terms with video" } 
        , { name: "answer", desc: "Answer Quiz" } 
        , { name: "answerok", desc: "Answer Quiz correctly" } 
        , { name: "answerfail", desc: "Answer Quiz wrongly" } 
        ];

    async.mapSeries(actions, function(op, callback){
        var a1 = new Action(op);
        a1.save(function(err, doc){
            console.log("Action added...", doc.name, err);
            callback(err, op);
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'Actions Loaded')
    });
        
};

/**
 *

## Challenges

| Name | Desc                       |
| :--- | :---                       |
| ch1  | Visit terms and conditions |
| ch2  | Scroll down the page       |
| ch3  | View terms with video      |
| ch4  | Answer Quiz                |

 */

var loadChallenges = function(cb) {
    var chs = [ 
        { name: "ch1", desc: "Visit terms and conditions" } 
        , { name: "ch2", desc: "Scroll down the page" } 
        , { name: "ch3", desc: "View terms with video" } 
        , { name: "ch4", desc: "Answer Quiz" } 
        ];

    async.mapSeries(chs, function(op, callback){
        var ch1 = new Challenge(op);
        ch1.save(function(err, doc){
            console.log("Challenge added...", doc.name, err);
            callback(err, op);
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'Challenges Loaded')
    });
        
};

async.series([clearCollections, loadActions, loadChallenges]);
