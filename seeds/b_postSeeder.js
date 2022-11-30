/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("post").del();
  await knex("post").insert([
    {
      id: 1,
      content: "some content 1",
      like_count: 6,
      dislike_count: 7,
      created_by: "pranav4@email.com",
    },
    {
      id: 2,
      content: "some content 2",
      like_count: 6,
      dislike_count: 7,
      created_by: "pranav2@email.com",
    },
    {
      id: 3,
      content: "some content 3",
      like_count: 6,
      dislike_count: 7,
      created_by: "pranav4@email.com",
    },
    {
      id: 4,
      content: "some content 4",
      like_count: 6,
      dislike_count: 7,
      created_by: "pranav1@email.com",
    },
  ]);
};
