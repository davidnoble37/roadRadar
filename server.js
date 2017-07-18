const
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  passport = require('passport'),

  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js')
  User = require('./models/User')

  // var User = mongoose.model('User')

//environment port
const
  port = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/roadRadar'

//mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || 'Connected to MongoDB (roadRadar)')
})

//will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
})

//middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

//ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//session + pasport
app.use(session({
  secret: 'boomchakalaka',
  cookie: {maxAge: 60000000},
  resave: true,
  saveUninitialized: false,
  store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.currentUser = req.user //current User is avail in ALL views
  app.locals.loggedIn = !!req.user //boolean loggedIn available in ALL views
  next()
})


//root route
app.get('/', (req,res) => {
  res.render('index')
})

app.use('/', userRoutes)

app.listen(port, (err) => {
  console.log(err || 'Server running on port' + port)
})

//The POST API

//GET ALL USERS
app.get('/users', (req, res) => {
  User.find({}, (err, user) => {
    if (err) return console.log(err)
    res.json(user)
  })
})

//GET ALL POSTS FROM USER
app.get('/users/:id/posts', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err)
    res.json(user.posts)
  })
})

//CREATE A NEW POST FOR SPECIFI USER
app.post('/users/:id/posts', (req, res) => {
  User.findById(req.params.id, (err,user) => {
    if (err) return console.log(err)
    user.posts.push(req.body)
    user.save((err) => {
      res.json(user)
    })
  })
})

//GET A SPECIFIC POST FROM A SPECIFI USER
app.get('/users/:id/posts/:post_id', (req, res) => {
  User.findById(req.params.id, (err,album) =>{
    if (err) return console.log(err)
    var post = album.posts.id(req.params.post_id)
    res.json(post)
  })
})

// DELETE A POST FROM A USER
app.delete('/users/:id/posts/:post_id', (req, res) => {
  User.findById(req.params.id, (err,user) => {
    var post = user.posts.id(req.params.post_id)
    if (post !== null) post.remove()
      user.save((err) => {
      if (err)  return console.log(err)
      res.send(user)
   })
  res.send(user)
  })
})
