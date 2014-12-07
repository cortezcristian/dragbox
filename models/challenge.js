// Challenge Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose             = require('mongoose'),
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
// | Param     | Type     | Description                                                 |
// | :----     | :----    | :----                                                       |
// | challenge | Rule     | Rule Object                                                 |
// | cb        | function | Callback function that'll return error and Challenge object |
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
        challenge.save(cb);
    }
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
