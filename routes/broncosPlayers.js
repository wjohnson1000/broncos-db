var express = require('express');
//var passport = require('passport');
//var session = require('express-session');
//var cookieParser = require('cookie-parser');
//var localStrategy = require('passport-local');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/broncos'
});
var bodyParser = require('body-parser');
//var api = require('../api');

//passport.use(new localStrategy(function(username, password, done){
//  api.login.read(username, password)
//  .then(function(results){
//    done(null, results.rows[0])
//  })
//  .catch(function(error){
//    done(error)
//  })
//}));
//
//passport.serializeUser(function(user, done){
//  done(null, JSON.stringify(user))
//})
//
//passport.deserializeUser(function(id, done){
//  done(null, JSON.parse(id))
//})
//
//app.use(cookieParser())
//app.use(bodyParser.urlencoded({extended: false}))
//app.use(session({
//  secret: 'secret',
//  resave: true,
//  saveUninitialized: true
//}))

router.get('/roster', function(request, response){
  knex('roster').select().then(function(roster){
    response.render('index', {players: roster});
  })
})

router.post('/new', function(request, response){
  knex('roster').insert({player_name: request.body.name, jersey_number: request.body.number}).then(function(roster){
    response.status(201).send(roster);
  })
});
module.exports = router;

