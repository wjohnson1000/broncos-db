var express = require('express');
var passport = require('passport');
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/broncos'
});
var bodyParser = require('body-parser');
var broncosPlayers = require('./routes/broncosPlayers');
var app = express();
var hbs = require('handlebars');
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', broncosPlayers);


app.listen(3000, function(){
  console.log('listening');
});
