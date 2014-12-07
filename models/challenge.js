// Challenge Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose             = require('mongoose'),
    async                = require('async'),
    Rule                 = require('./rule.js'),
    Reward               = require('./reward.js'),
    NotificationTemplate = require('./notificationtemplate.js'),
    Schema               = mongoose.Schema;

var challengeSchema = new Schema({
    name                   : String,
    desc                   : String,
    rules                  : [ { type : Schema.Types.ObjectId, ref : 'Rule' } ],
    idReward               : { type : Schema.Types.ObjectId, ref : 'Reward' },
    idNotificationTemplate : { type : Schema.Types.ObjectId, ref : 'NotificationTemplate' },
    limitWins              : { type : Number, default : 0 },
    repeat                 : { type : Boolean, default : false },
    live                   : { type : Boolean, default : true },
	created                : Date
});

// ### Hooks 
// #### Pre-Save
challengeSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method: addRule
//
// Usage:
//
//     var challenge = new Challenge({name:"ch1"});
//     challenge.addRule(rule, function(err, ch1){});
//
// | Param | Type     | Description                                                 |
// | :---- | :----    | :----                                                       |
// | rule  | Rule     | Rule Object                                                 |
// | cb    | function | Callback function that'll return error and Challenge object |
//
//
challengeSchema.method("addRule", function(obj, cb) {
    var challenge = this;
    var r1 = false;
    var position = (challenge.rules) ? challenge.rules.length : 0;
    if ( obj instanceof Rule ) {
        r1 = obj;
    }
    
    if ( typeof r1 != "object" ) {
       cb(new Error("Rule object was expected"), null); 
    } else {
        // Check if challenge already exists, in that case remove it
        var existsPosition = challenge.rules.indexOf(r1); 
        if( existsPosition !== -1 ) {
            // if position get out of lenght it'll readjust to the last item
            // in that case move it to a different position
            challenge.rules.splice(existsPosition, 1);
        }
        
        challenge.rules.splice(position, 0, r1);
        challenge.save(function(errch1, ch1){
            r1.challengeId = ch1.id;
            r1.save(function(err, r2){
                cb(errch1, ch1);
            });
        });
    }
});

// ### Method: checkCompleted
//
// Usage:
//
//     var challenge = new Challenge({name:"ch1"});
//     challenge.checkComplted(userId, function(err, completed){});
//
// | Param  | Type     | Description                                                         |
// | :----  | :----    | :----                                                               |
// | userId | ObjectId | UserId necessary to filter LogAction                                |
// | cb     | function | Callback function that'll return error and completed boolean object |
//
//
challengeSchema.method("checkCompleted", function(userId, cb) {
    var ch1 = this;
    var completed = true;

    if (ch1.rules && ch1.rules.lenght >0 ) {
        async.mapSeries(ch1.rules, function(ruleId, callback) {
            Rules.findOne({id: ruleId}, function(err, r1){
               LogAction.find({ idUser: userId, idActionFired: r1.actionId, tag: r1.tag }, function(err, logsA){
                   if(logsA) {
                       switch(rule.condition){
                         case '>=':
                            completed = (logsA.length >= rules.times)? true : false;
                         break;
                         case '<=':
                            completed = (logsA.length >= rules.times)? true : false;
                         break;
                         case '=':
                            completed = (logsA.length == rules.times)? true : false;
                         break;
                         default:
                         break;
                       }
                       cb(null, completed);
                   } else {
                    completed = false;
                    cb(new Error('Action not found for this user in the ActionLog'), completed);    
                   }
               });
            });
        }, function(err, result){
        });
    } else {
        completed = false;
        cb(new Error('Challenge provided has no rules'), completed);    
    }
});

// ### Method: checkAvailability
//
// Usage:
//
//     var challenge = new Challenge({name:"ch1"});
//     challenge.checkComplted(userId, function(err, available){});
//
// | Param  | Type     | Description                                                         |
// | :----  | :----    | :----                                                               |
// | userId | ObjectId | UserId necessary to filter LogAction                                |
// | cb     | function | Callback function that'll return error and available boolean object |
//
//
challengeSchema.method("checkAvailability", function(userId, cb) {
    var ch1 = this;
    var available = false;
    var completedTimes = 0;

    LogChallenge.find({ idUser: userId, idChallenge: ch1.id}, function(err, logC){
       completedTimes = (logC) ? logC.length : 0;
       if (completedTimes == 0) {
          available = true;
       } else if (completedTimes > 0) {
         if(ch1.repeat) {
           available = true;
         }
       } 
       // check if it is live
       if (!ch.live) {
          available = false;
       } 
       cb(err, available);
    });
    
});

// ### Method:
challengeSchema.method("instanceMethod", function(param, cb) {
    var challenge = this;
    this.save(cb);
});

// ### Static:
challengeSchema.statics.customMethod = function (paramid, cb) {
  var Challenge = this;
  Challenge.findOne({ _id: paramid}, function(err, challenge){
      cb(err, challenge);
  });
}

// Export module
module.exports = mongoose.model('Challenge', challengeSchema);
