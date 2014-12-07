// LogChallenge Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var logchallengeSchema = new Schema({
    name          : String, 
    idChallenge   : { type  : Schema.Types.ObjectId, ref : 'Challenge' },
    idUser        : { type  : Schema.Types.ObjectId, ref : 'User' },
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
logchallengeSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
logchallengeSchema.method("instanceMethod", function(param, cb) {
    var logchallenge = this;
    this.save(cb);
});

// ### Static:
logchallengeSchema.statics.customMethod = function (paramid, cb) {
  var LogChallenge = this;
  LogChallenge.findOne({ _id: paramid}, function(err, logchallenge){
      cb(err, logchallenge);
  });
}

// Export module
module.exports = mongoose.model('LogChallenge', logchallengeSchema);
