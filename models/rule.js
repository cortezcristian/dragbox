// Rule Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Action = require('./action.js'),
    Schema = mongoose.Schema,
    enumConditions = ['>=','=','<='];

var ruleSchema = new Schema({
    name        : String,
    desc        : String,
    challengeId : { type : Schema.Types.ObjectId, ref : 'Challenge' },
    actionId    : { type : Schema.Types.ObjectId, ref : 'Action' },
    times       : { type : Number, default: 1 },
    condition   : { type : String, enum : enumConditions, default: '=' },
    tag         : String,
	created     : Date
});

// ### Hooks 
// #### Pre-Save
ruleSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
ruleSchema.method("instanceMethod", function(param, cb) {
    var rule = this;
    this.save(cb);
});

// ### Static:
ruleSchema.statics.customMethod = function (paramid, cb) {
  var Rule = this;
  Rule.findOne({ _id: paramid}, function(err, rule){
      cb(err, rule);
  });
}

// Export module
module.exports = mongoose.model('Rule', ruleSchema);
