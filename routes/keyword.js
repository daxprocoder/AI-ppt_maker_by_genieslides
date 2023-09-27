const app = require("express").Router();

app.get("/", (req, res) => {
  // if (!req.session.user) {
  //   res.redirect("/login");
  //   return;
  // }

  return res.sendFile("Keyword.html", { root: "views" });
});

app.post("/", async (req, res) => {
  try {
    // if (!req.session.user) {
    //   res.redirect("/login");
    //   return;
    // }

    const body = req.body;

    const { slides, keywords } = body;

    if (!slides || !keywords) return res.status(400).send("Slides are required");

    console.log("Slides:", slides);
    console.log("Keywords:", keywords);

    req.session.ppt_slides = slides;
    req.session.ppt_keywords = keywords;

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
