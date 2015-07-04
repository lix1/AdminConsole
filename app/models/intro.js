var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path');

var IntroSchema = new Schema({
  title:          { type: String },
  description:    { type: String },
  index:          { type: Number, 'default': 0 }
});

module.exports = mongoose.model('Intro', IntroSchema);
