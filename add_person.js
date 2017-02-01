const settings = require("./settings"); // settings.json
const input = process.argv.slice(2);
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

function end() {
  knex.destroy();
}

function insertData(userInput) {

  let fname = userInput[0];
  let lname = userInput[1];
  let bdate = userInput[2];

  knex.insert({
    first_name: fname,
    last_name: lname,
    birthdate: bdate
  }).into(table).finally(end);
}

insertData(input);