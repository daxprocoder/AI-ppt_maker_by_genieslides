const app = require("express").Router();

//spawn child
const { spawn } = require("child_process");

app.get("/", (req, res) => {
  // if (!req.session.user) {
  //   res.redirect("/login");
  //   return;
  // }

  return res.sendFile("Create.html", { root: "views" });
});

app.post("/", async (req, res) => {
  try {
    // if (!req.session.user) {
    //   res.redirect("/login");
    //   return;
    // }

    const body = req.body;

    const { selected } = body;

    if (!selected) return res.status(400).send("Slides are required");

    console.log("Selected:", selected);

    req.session.ppt_type = selected;
    console.log("Args:");
    const all = {
      Title: req.session.ppt_title,
      Language: req.session.ppt_language,
      WordCount: req.session.ppt_wordCount,
      Slides: req.session.ppt_slides,
      Keywords: req.session.ppt_keywords,
      Tone: req.session.ppt_type,
    };
    console.log("Args:", all);
    let args = [
      "main.py",
      "a",
      all.Title.toString(),
      all.WordCount.toString(),
      all.Tone.toString(),
      all.Language.toString(),
      all.Keywords.toString(),
    ];

    console.log("Args:", args);

    const python = spawn("python", args);
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      res.download("testing.pptx");
    });

    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = app;
