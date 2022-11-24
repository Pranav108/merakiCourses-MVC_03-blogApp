require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db.config");
const routes = require("./routes/posts.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/v1/", routes);
// app.get("/api/v1/users", async (req, res) => {
//   const users = await db("user");
//   res.json({ users });
// });
// app.get("/api/v1/posts", async (req, res) => {
//   const posts = await db("post");
//   res.json({ posts });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
