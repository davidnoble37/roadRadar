const
  mongoose = require('mongoose'),
  postSchema = new mongoose.Schema({
      user: {type: String, required: true},
      // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      address: {type: String, required: true},
      incident: {type: String, required: true},
      comment: Text,
      {timestamps: true}
    }),
  Post = mongoose.model('Post', postSchema)

module.exports = Post
