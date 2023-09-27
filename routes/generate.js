const app = require("express").Router();

app.get("/", (req, res) => {
  // if (!req.session.user) {
  //   res.redirect("/login");
  //   return;
  // }

  return res.sendFile("Generate.html", { root: "views" });
});

app.post("/", async (req, res) => {
  try {
    // if (!req.session.user) {
    //   res.redirect("/login");
    //   return;
    // }

    const body = req.body;

    const { title } = body;

    if (!title) return res.status(400).send("Title is required");

    console.log("Title:", title);

    req.session.ppt_title = title;

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
