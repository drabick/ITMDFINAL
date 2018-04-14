var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
    user: String,
    subject: String,
    question: String,
    comments: String
  });
  
// Memory only virtual to remove prefix underscores
QuestionSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Set Vurtuals to remove prefix __
QuestionSchema.set('toObject', {
  virtuals: true
});

// DR. Leverage vertuals to remove underscore prefixes from ID this only haooens in memory not in the DB
QuestionSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
}


module.exports = mongoose.model('question', QuestionSchema);