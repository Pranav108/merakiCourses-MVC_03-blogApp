const knex = require("../config/db.config");

exports.all = async () => knex("user");

exports.create = async (data) => await knex("user").insert(data);

exports.get = async (id) => await knex("user").where({ id });

exports.getByEmail = async (email) => await knex("user").where({ email });

exports.removeByEmail = async (email) =>
  await knex("user").where({ email }).del();
