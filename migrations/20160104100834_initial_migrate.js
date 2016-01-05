
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('roster', function(table){
        table.increments();
        table.string('player_name');
        table.integer('jersey_number');
        table.date('date_added');
      })
    ]);
  };  

exports.down = function(knex, Promise) {
  
};
