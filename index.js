var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var localStrategy = require('passport-local');
var broncosPlayers = require('./routes/broncosPlayers');
var app = express();
var hbs = require('handlebars');
var exphbs = require('express-handlebars');
var api = require('./api');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', broncosPlayers);

passport.use(new localStrategy(function(username, password, done){
  api.login.read(username, password)
  .then(function(results){
    done(null, results.rows[0])
  })
  .catch(function(error){
    done(error)
  })
}));

passport.serializeUser(function(user, done){
  done(null, JSON.stringify(user))
})

passport.deserializeUser(function(id, done){
  done(null, JSON.parse(id))
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(request, response){
  if (request.isAuthenticated()) {
    response.redirect('/roster');
    return
  }
  response.render('login');
 // response.end('Please Login');
});

app.post('/login', 
      passport.authenticate('local',
      {successRedirect: '/roster',
      failureRedirect: '/login'}
    )
);

app.get('/register', function(request, response){
  response.render('register');
});

app.post('/register', function (req, res) {
  api.login.create(req.body.username, req.body.password)
  .then(function (results) {
    res.end('Register successful: ' + req.body.username)
  })
  .catch(function (error) {
    res.statusCode = 409
    res.send(error)
  })
})

app.post('/logout', function (req, res) {
  req.logout()
  res.end('logged out')
})

app.listen(3000, function(){
  console.log('listening');
});
