const
  mongoose = require('mongoose'),
  postSchema = new mongoose.Schema({
      user: User.name,
      address: {type: String, required: true},
      incident: {type: String, required: true},
      {timestamps: true},
      comment: Text
    }),
  Post = mongoose.model('Post', postSchema)

module.exports = Post
