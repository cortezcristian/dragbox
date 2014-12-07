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

## Rules

| Name | Desc                                   |
| :--- | :---                                   |
| r1   | Visit terms and conditions (taco) >= 1 |
| r2   | Scroll down the page (taco) >= 1       |
| r3   | View terms with video (VideoID) >= 1   |
| r4   | Answer Quiz (QuizId) >= 1              |

 */

var loadRules = function(cb) {
    var rules = [ 
        { actionname: "visit", obj: { name: "r1", desc: "Visit terms and conditions (taco) >= 1", condition: ">=", tag: "taco" } } 
        , { actionname: "scroll", obj: { name: "r2", desc: "Visit terms and conditions (taco) >= 1", condition: ">=", tag:"taco" } }
        , { actionname: "watchvideo", obj: { name: "r3", desc: "View terms with video (VideoID) >= 1", condition: ">=", tag:"VideoId" } }
        , { actionname: "answer", obj: { name: "r4", desc: "Answer Quiz (QuizId) >= 1", condition: ">=", tag:"quiz" } }
        ];

    async.mapSeries(rules, function(op, callback){
        var r1 = new Rule(op.obj);
        r1.save(function(err, doc){
            Action.findOne({name: op.actionname}, function(err, action1){
                doc.actionId = action1._id;
                doc.save(function(err, doc){
                    console.log("Rule added...", doc.name, err);
                    callback(err, op);
                });
            });
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'Rules Loaded')
    });
        
};

/**
 *

## Rewards

| Name    | Desc             |
| :---    | :---             |
| reward1 | Earn +10 points  |
| reward2 | Earn +50 points  |
| reward3 | Earn +100 points |
| reward4 | Earn +150 points |

 */
var loadRewards = function(cb) {
    var rewards = [ 
        { name: "reward1", desc: "Earn +10 points", amount: 10 } 
        , { name: "reward2", desc: "Earn +50 points", amount: 50 } 
        , { name: "reward3", desc: "Earn +100 points", amount: 100 } 
        , { name: "reward4", desc: "Earn +150 points", amount: 150 } 
        ];

    async.mapSeries(rewards, function(op, callback){
        var r1 = new Reward(op);
        r1.save(function(err, doc){
            console.log("Reward added...", doc.name, err);
            callback(err, op);
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'Rewards Loaded')
    });
        
};

/**
 *

## NotificationTemplates

| Name | Desc             |
| :--- | :---             |
| nt1  | Earn +10 points  |
| nt2  | Earn +50 points  |
| nt3  | Earn +100 points |
| nt4  | Earn +150 points |

 */
var loadNotificationTemplates = function(cb) {
    var nts = [ 
        { name: "nt1", desc: "Earn +10 points", title: 'Congrats!!', message: 'You\'ve earned +10 points', icon: 'fa fa-star fa-3' } 
        , { name: "nt2", desc: "Earn +50 points", title: 'Congrats!!', message: 'You\'ve earned +50 points', icon: 'fa fa-star fa-3' } 
        , { name: "nt3", desc: "Earn +100 points", title: 'Congrats!!', message: 'You\'ve earned +100 points', icon: 'fa fa-star fa-3' } 
        , { name: "nt4", desc: "Earn +150 points", title: 'Congrats!!', message: 'You\'ve earned +150 points', icon: 'fa fa-star fa-3' } 
        ];

    async.mapSeries(nts, function(op, callback){
        var nt1 = new NotificationTemplate(op);
        nt1.save(function(err, doc){
            console.log("NotificationTemplate added...", doc.name, err);
            callback(err, op);
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'NotificationTemplates Loaded')
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
        { rewardname: "reward1", nt: "nt1", obj: { name: "ch1", desc: "Visit terms and conditions" } }
        , { rewardname: "reward2", nt: "nt2", obj: { name: "ch2", desc: "Scroll down the page" } } 
        , { rewardname: "reward3", nt: "nt3", obj: { name: "ch3", desc: "View terms with video" } }
        , { rewardname: "reward4", nt: "nt4", obj: { name: "ch4", desc: "Answer Quiz" } }
        ];

    async.mapSeries(chs, function(op, callback){
        var ch1 = new Challenge(op.obj);
        ch1.save(function(err, doc){
          Reward.findOne({name: op.rewardname}, function(err, reward1){
            NotificationTemplate.findOne({name: op.nt }, function(err, nt1){
              doc.idReward = reward1._id;
              doc.idNotificationTemplate = nt1._id;
              doc.save(function(err, doc){
                console.log("Challenge added...", doc.name, err);
                callback(err, op);
              });
            });
          });
        });
    }, function(err, res){
        //console.log(">>>", err, res);    
        cb(null, 'Challenges Loaded')
    });
        
};

async.series([clearCollections, loadActions, loadRules, loadRewards, loadNotificationTemplates, loadChallenges]);
