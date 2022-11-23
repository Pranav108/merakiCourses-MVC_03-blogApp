const knex = require("knex");

const knexFile = require("../knexfile");

const env = process.env.NODE_ENV || "development";

const db = knex(knexFile[env]);

module.exports = db;
