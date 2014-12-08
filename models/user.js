// User Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');
var LogAction = require('./logaction.js');
var Action = require('./action.js');
var Rule = require('./rule.js');
var Challenge = require('./challenge.js');
var LogChallenge = require('./logchallenge.js');
var LogReward = require('./logreward.js');
var Reward = require('./reward.js');
var NotificationTemplate = require('./notificationtemplate.js');
var Notification = require('./notification.js');

var userSchema = new Schema({
    name          : String, 
    email         : String, 
    password      : String, 
    points        : { type: Number, default: 0 }, 
    unverified    : { type: Boolean, default: true }, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
userSchema.pre("save", function(next) {
    if(this.isModified('password'))
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    if(!this.created)
        this.created = new Date();
    next();
});

userSchema.method('authenticate', function(password) {
    return bcrypt.compareSync(password, this.password);
});

userSchema.method("logAction", function(param, cb) {
    var user = this;
    var challengesRelated = [];
    if(typeof param.name !== "undefined" && typeof param.tag !== "undefined") {
        Action.findOne({name: param.name}, function(err, action){
            if(err) {
                cb(err, null)
            } else {
                if (action) {
                    var log = new LogAction({
                        name          : param.name,
                        idUser        : user.id,
                        idActionFired : action.id,
                        tag           : param.tag
                    });
                    log.save(function(err, log1){
                        console.log(err, log1);
                        // Get all the rules
                        Rule.find({actionId: log1.idActionFired }, function(err, rules){
                            rules.forEach(function(v, i){
                                // Fill list of challenges related
                                if(challengesRelated.indexOf(v.challengeId) === -1){
                                    challengesRelated.push(v.challengeId);
                                }
                            });

                            console.log("-->", challengesRelated);
                            // Change it and do it for all challenges
                            Challenge.findOne({ _id: challengesRelated[0] }, function(err, ch){
                                console.log("-->", err, ch);
                                ch.checkCompleted(user.id, function(err, completed){
                                    console.log("c->", completed);
                                    if(completed) {
                                        ch.checkAvailability(user.id, function(err, available){
                                            console.log("availability->", available, err);
                                            if(available) {
                                                user.achievementLogRewardAndNotify(ch.id, cb);
                                            } else {
                                                cb("Challenge not available: "+ch.name, available);
                                            }
                                        });
                                    } else {
                                        cb(err, null);
                                    }
                                });
                                
                            });
                            // Iterate challengesRelated
                            //   check each one if it is complete
                            //     Iterate all rules from challenge (review LogActions)
                            //   check if completed challenge
                            //     amount of times completed
                            //   log, reward, notify

                            //cb(err, challengesRelated);    
                        });
                    });
                } else {
                    cb(new Error("Action not found"), null);
                }
            }
        });
    } else {
        cb(new Error("Wrong parameters supplied"), null)
    }
});

userSchema.method("achievementLogRewardAndNotify", function(challId, cb) {
    var user = this;
    
    Challenge.findOne({_id: challId}, function(err, ch1){
      if(ch1) {
        var logC = new LogChallenge({ idChallenge: challId, idUser: user.id});
        logC.save(function(err, logC1){
          Reward.findOne({_id: ch1.idReward}, function(err, reward1){
            //give points
            user.points += reward1.amount;
            user.save(function(err, user1){
              // Log reward
              var logR = new LogReward({idReward: reward1.id, idUser: user.id });
              logR.save(function(err, logR1){
                // Notify the user
                NotificationTemplate.findOne({_id: ch1.idNotificationTemplate},function(err, nt){
                    var notification = new Notification({
                        idUserTo: user.id,
                        title: nt.title,
                        message: nt.message+'. Because you achieved challenge: '+ch1.desc,
                        icon: nt.icon
                    });
                    notification.save(cb);
                });
              });
            });    
          });
        });
      } else {
        cb(new Error('Challenge unloked not found'), null); 
      }
    });
});

// ### Method:
userSchema.method("instanceMethod", function(param, cb) {
    var user = this;
    this.save(cb);
});

// ### Static:
userSchema.statics.customMethod = function (paramid, cb) {
  var User = this;
  User.findOne({ _id: paramid}, function(err, user){
      cb(err, user);
  });
}

// Export module
module.exports = mongoose.model('User', userSchema);
