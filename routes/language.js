const app = require("express").Router();

app.get("/", (req, res) => {
  // if (!req.session.user) {
  //   res.redirect("/login");
  //   return;
  // }

  return res.sendFile("Language.html", { root: "views" });
});

app.post("/", async (req, res) => {
  try {
    // if (!req.session.user) {
    //   res.redirect("/login");
    //   return;
    // }

    const body = req.body;
    const { language, wordCount } = body;

    if (!language || !wordCount)
      return res.status(400).send("Title is required");

    req.session.ppt_language = language;
    req.session.ppt_wordCount = wordCount;

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
