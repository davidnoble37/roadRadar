const
  express = require('express'),
  password = require('passport'),
  userRouter = express.Router()

userRouter.route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(/*create session using Passport*/)

userRouter.route('/signup')
  .get((req,res) => {
    res.render('signup')
  })
  .post(/*create account using passport */)

userRouter.get('/profile', isLoggedIn, (req,res) => {
  //render the user's profile (only if they are currently logged in)
})

userRouter.get('/logout', (req, res) => {
  //destroy the session, and redirect the user back to the home page
})

//a method used to authorize a user BEFORE allowing them to proceed to the profile page:
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
