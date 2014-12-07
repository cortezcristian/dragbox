// Reward Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
    enumRewardTypes = ['points', 'medal'];

var rewardSchema = new Schema({
    name          : String, 
    desc          : String, 
    rType         : { type: String, enum: enumRewardTypes, default: 'points' },
    amount        : { type: Number, default: 0}, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
rewardSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
rewardSchema.method("instanceMethod", function(param, cb) {
    var reward = this;
    this.save(cb);
});

// ### Static:
rewardSchema.statics.customMethod = function (paramid, cb) {
  var Reward = this;
  Reward.findOne({ _id: paramid}, function(err, reward){
      cb(err, reward);
  });
}

// Export module
module.exports = mongoose.model('Reward', rewardSchema);
