var mongoose = require('mongoose');

var WebAppSchema = mongoose.Schema({
    user: String,
    subject: String,
    question: String,
    comments: String
  });
  
// Memory only virtual to remove prefix underscores
WebAppSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Set Vurtuals to remove prefix __
WebAppSchema.set('toObject', {
  virtuals: true
});

// DR. Leverage vertuals to remove underscore prefixes from ID this only haooens in memory not in the DB
WebAppSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
}


module.exports = mongoose.model('webapp', WebAppSchema);