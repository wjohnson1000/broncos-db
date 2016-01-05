var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/broncos'
});
var bodyParser = require('body-parser');
//router.get('/roster', function(request, response){
//  knex('roster').select().then(function(roster){
//    response.status(200).send(roster); 
//  })
//});

router.get('', function(request, response){
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

