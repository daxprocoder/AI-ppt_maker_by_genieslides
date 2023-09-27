const app = require("express").Router();

app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }

  return res.sendFile("Account.html", { root: "views" });
});

module.exports = app;
