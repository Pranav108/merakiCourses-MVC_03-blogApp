const knex = require("../config/db.config");

async function all() {
  return knex("user");
}

// will be removed later
async function create(data) {
  const results = await knex("user").insert(data).returning("*");
  return results[0];
}

async function get(id) {
  const results = await knex("users").where({ id });
  return results[0];
}

async function getByEmail(email) {
  const results = await knex("user").where({ email });
  return results[0];
}

async function removeByEmail(email) {
  const results = await knex("user").where({ email }).del().returning("*");
  return results[0];
}

module.exports = {
  get,
  all,
  create,
  getByEmail,
  removeByEmail,
};
