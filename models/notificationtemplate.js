// NotificationTemplate Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var notificationtemplateSchema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
notificationtemplateSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
notificationtemplateSchema.method("instanceMethod", function(param, cb) {
    var notificationtemplate = this;
    this.save(cb);
});

// ### Static:
notificationtemplateSchema.statics.customMethod = function (paramid, cb) {
  var NotificationTemplate = this;
  NotificationTemplate.findOne({ _id: paramid}, function(err, notificationtemplate){
      cb(err, notificationtemplate);
  });
}

// Export module
module.exports = mongoose.model('NotificationTemplate', notificationtemplateSchema);
