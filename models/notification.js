// Notification Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var notificationSchema = new Schema({
    name     : String,
    title    : String,
    message  : String,
    icon     : String,
    idUserTo : { type  : Schema.Types.ObjectId, ref : 'User' },
	created  : Date
});

// ### Hooks 
// #### Pre-Save
notificationSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
notificationSchema.method("instanceMethod", function(param, cb) {
    var notification = this;
    this.save(cb);
});

// ### Static:
notificationSchema.statics.customMethod = function (paramid, cb) {
  var Notification = this;
  Notification.findOne({ _id: paramid}, function(err, notification){
      cb(err, notification);
  });
}

// Export module
module.exports = mongoose.model('Notification', notificationSchema);
