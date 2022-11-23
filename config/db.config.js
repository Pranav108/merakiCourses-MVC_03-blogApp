const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "pranav",
    password: "pranav",
    database: "mvc_03_database",
  },
});

module.exports = db;
