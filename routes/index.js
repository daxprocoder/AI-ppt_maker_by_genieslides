const app = require("express").Router();

app.get("/", (req, res) => {
  //send index.html which is outside of the routes folder in the views folder
  return res.sendFile("index.html", { root: "views" });
});

module.exports = app;
