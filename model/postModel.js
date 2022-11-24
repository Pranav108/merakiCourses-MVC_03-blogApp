const knex = require("../config/db.config");

async function all() {
  return knex("post");
}

async function get(id) {
  const results = await knex("post").where({ id });
  return results[0];
}

async function remove(id) {
  const results = await knex("post").where({ id }).del().returning("*");
  return results[0];
}

async function create(data) {
  const results = await knex("post").insert(data).returning("*");
  return results[0];
}

module.exports = {
  all,
  get,
  create,
  remove,
};
