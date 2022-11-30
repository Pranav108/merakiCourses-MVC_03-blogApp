const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "post";
  }

  static get totalLikesColumn() {
    return "like_count";
  }

  static get totalDislikesColumn() {
    return "dislike_count";
  }

  static get userIdColumn() {
    return "created_by";
  }

  static get contentColumn() {
    return "content";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["created_by", "content"],
      properties: {
        id: { type: "integer" },
        content: { type: "string" },
        created_by: { type: "string" },
        like_count: { type: "number", default: 10 },
        dislike_count: { type: "number", default: 0 },
      },
    };
  }
}

module.exports = Post;
