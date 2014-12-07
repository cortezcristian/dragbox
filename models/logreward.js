// LogReward Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Reward = require('./reward.js'),
    User   = require('./user.js'),
    Schema = mongoose.Schema;

var logrewardSchema = new Schema({
    name          : String, 
    idReward      : { type  : Schema.Types.ObjectId, ref : 'Reward' },
    idUser        : { type  : Schema.Types.ObjectId, ref : 'User' },
    amount        : { type  : Number, default: 0 }, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
logrewardSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
logrewardSchema.method("instanceMethod", function(param, cb) {
    var logreward = this;
    this.save(cb);
});

// ### Static:
logrewardSchema.statics.customMethod = function (paramid, cb) {
  var LogReward = this;
  LogReward.findOne({ _id: paramid}, function(err, logreward){
      cb(err, logreward);
  });
}

// Export module
module.exports = mongoose.model('LogReward', logrewardSchema);
