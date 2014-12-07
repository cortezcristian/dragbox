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
                                            cb(err, available);
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
