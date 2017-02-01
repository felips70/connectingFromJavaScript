const pg = require("pg");
const settings = require("./settings"); // settings.json

function printThatWeAreSearching() {
  console.log("Searching ...");
}

function printResults(queryName, result) {
  let length = result.rows.length;
  console.log(`Found ${length} person(s) by the name ${queryName}:`);

  var printPerson = (row) => {
    let id = row.id;
    let first_name = row.first_name;
    let last_name = row.last_name;
    let birthdate = row.birthdate;
    console.log(`- ${id}: ${first_name} ${last_name}, born ${birthdate}`);
  }
  result.rows.forEach(printPerson);
}

function queryForFamousPeople(client, queryArgument, preQueryAction, postQueryAction) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    preQueryAction();
    const query = "SELECT * FROM famous_people WHERE last_name = $1::text";
    client.query(query, [queryArgument], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      postQueryAction(result)
      client.end();
    });

  });
}

const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

queryForFamousPeople(client, input, printThatWeAreSearching, printResults.bind(null, input));