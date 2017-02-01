
exports.up = function(knex, Promise) {
  return knex.schema.table('milestones', (table) => {
    table.integer('famous_people_id').unsigned();
    table.foreign('famous_people_id').references('famous_people.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('milestones', function (table) {
    table.dropForeign('famous_people_id');
    table.dropColumn('famous_people_id');
  })
};
