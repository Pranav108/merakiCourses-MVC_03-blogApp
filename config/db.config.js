const knex = require("knex");
const { Model } = require("objection");

const knexFile = require("../knexfile");

const env = process.env.NODE_ENV || "development";

const db = knex(knexFile[env]);
Model.knex(db);

module.exports = db;
