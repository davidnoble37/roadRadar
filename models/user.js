
const
  Post = require('./Post'),
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    local: {
        name: String,
        email: String,
        password: String
     },
      posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
<<<<<<< HEAD
    })
=======
    });
>>>>>>> b66cdc6e008ab9447072f58eac15a019b002175b

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
<<<<<<< HEAD
}

module.exports  = mongoose.model('User', userSchema)
=======
};

module.exports = mongoose.model('User', userSchema);
>>>>>>> b66cdc6e008ab9447072f58eac15a019b002175b
