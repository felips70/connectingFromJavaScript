const pg = require("pg");
const settings = require("./settings"); // settings.json


const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach((item) => {
      let id = item.id;
      let first_name = item.first_name;
      let last_name = item.last_name;
      let birthdate = item.birthdate;
      let length = result.rows.length;

      console.log("Searching ...");
      console.log(`Found ${length} person(s) by the name ${input}:`);
      console.log(`- ${id}: ${first_name} ${last_name}, born ${birthdate}`);
    });

    client.end();
  });
});

