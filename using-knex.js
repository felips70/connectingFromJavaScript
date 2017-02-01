const settings = require("./settings"); // settings.json
const input = process.argv[2];
const table = 'famous_people';

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl,
    port: settings.port
  }
});

function formatResult (result) {
  console.log('Searching ...')
  let length = result.length;
  result.forEach(row => {
    const {
      id,
      first_name:fname,
      last_name:lname,
      birthdate,
    } = row;
    console.log(`Found ${length} person(s) by the name ${fname}:`);
    console.log(`- ${id}: ${fname} ${lname}, born ${birthdate}`);
    process.exit;
   })
 }
function end() {
  knex.destroy();
}

knex
  .select('*')
  .from(table)
  .where({
    last_name: input
    })
  .then(formatResult).finally(end)
  .catch(e => { console.error(e); });