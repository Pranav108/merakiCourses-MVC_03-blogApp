/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("user", (tbl) => {
    tbl.increments("id");
    tbl.string("email").unique().index();
    tbl.string("name").notNullable();
    tbl.string("password").notNullable();
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists("user");
