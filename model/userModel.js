const { Model } = require("objection");
const Post = require("./postModel");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get nameColumn() {
    return "name";
  }

  static get emailColumn() {
    return "email";
  }

  static get passwordColumn() {
    return "password";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 4, maxLength: 20 },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  static relationMappings = {
    children: {
      relation: Model.HasManyRelation,
      modelClass: Post,
      join: {
        from: "users.id",
        to: "posts.created_by",
      },
    },
  };
}

module.exports = User;
