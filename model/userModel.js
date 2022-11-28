const knex = require("../config/db.config");

exports.all = async () => knex("user");

exports.create = async (data) => await knex("user").insert(data);

exports.get = async (id) => await knex("user").where({ id }).first();

exports.getByEmail = async (email) =>
  await knex("user").where({ email }).first();

exports.removeByEmail = async (email) =>
  await knex("user").where({ email }).del();
