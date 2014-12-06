// Action Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var actionSchema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
actionSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
actionSchema.method("instanceMethod", function(param, cb) {
    var action = this;
    this.save(cb);
});

// ### Static:
actionSchema.statics.customMethod = function (paramid, cb) {
  var Action = this;
  Action.findOne({ _id: paramid}, function(err, action){
      cb(err, action);
  });
}

// Export module
module.exports = mongoose.model('Action', actionSchema);
