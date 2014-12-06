// Challenge Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var challengeSchema = new Schema({
    name          : String, 
    desc          : String, 
    rules         : [], 
    limitWins     : Number, 
    idNotificationTemplate     : Number, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
challengeSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
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
