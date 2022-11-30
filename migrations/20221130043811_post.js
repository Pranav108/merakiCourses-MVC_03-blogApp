/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("post", (tbl) => {
    tbl.increments("id");
    tbl.text("content").notNullable();
    tbl.integer("like_count").defaultTo("0");
    tbl.integer("dislike_count").defaultTo("0");
    tbl.string("created_by").index().references("email").inTable("user");
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists("post");
