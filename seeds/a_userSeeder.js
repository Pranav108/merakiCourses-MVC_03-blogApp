/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    { id: 1, name: "name1", email: "pranav1@email.com", password: "pass1" },
    { id: 2, name: "name2", email: "pranav2@email.com", password: "pass2" },
    { id: 3, name: "name3", email: "pranav3@email.com", password: "pass3" },
    { id: 4, name: "name4", email: "pranav4@email.com", password: "pass4" },
    { id: 5, name: "name5", email: "pranav5@email.com", password: "pass5" },
  ]);
};
