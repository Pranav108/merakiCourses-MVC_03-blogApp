const knex = require("../config/db.config");

exports.all = async () => knex("post");

exports.get = async (id) => await knex("post").where({ id });

exports.remove = async (id) => await knex("post").where({ id }).del();

exports.create = async (data) => await knex("post").insert(data);

exports.like = async (id) =>
  await knex("post").where({ id }).increment("like_count", 1);

exports.dislike = async (id) =>
  await knex("post").where({ id }).increment("dislike_count", 1);

exports.myPosts = async (created_by) =>
  await knex("post").where({ created_by });
