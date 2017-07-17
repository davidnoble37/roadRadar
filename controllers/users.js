var passport = require('passport')

//get /signup
function getSignup(req, res) {
  response.render('authentication/signup.ejs', {message: request.flash('signupMessage')})
}

//post /signup
function postSignup(req, res){
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/'
    failureRedirect: '/signup',
    failureFlash : true
  })
  return signupStrategy(req, res)
}

//get /login
  function getLogin(req, res){
    response.render('authentication/login.ejs', {message: request.flash('loginMessage')})
  }

//post /login
function postLogin(req, res){
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/'
    failureRedirect: '/login'
    failureFlash: true
  })
  return loginProperty(req, res)
}

//get /logout
function getLogout(req, res){
  request.logout()
  response.redirect('/')
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout
}
