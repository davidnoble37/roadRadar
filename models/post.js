const
  mongoose = require('mongoose'),
  postSchema = new mongoose.Schema({
      user: {String},
      address: {String, required: true},
      incident: {String, required: true},
      {timestamps: true},
      comment: Text
    }),
  Post = mongoose.model('Post', postSchema)

module.exports = Post
