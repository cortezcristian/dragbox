// LogAction Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var logactionSchema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
logactionSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
logactionSchema.method("instanceMethod", function(param, cb) {
    var logaction = this;
    this.save(cb);
});

// ### Static:
logactionSchema.statics.customMethod = function (paramid, cb) {
  var LogAction = this;
  LogAction.findOne({ _id: paramid}, function(err, logaction){
      cb(err, logaction);
  });
}

// Export module
module.exports = mongoose.model('LogAction', logactionSchema);
