const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("json spaces", 2);

app.use(express.static("public"));

app.use(
  session({
    secret: "asdasdasd`1312341234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose
  .connect("mongodb://localhost:27017/dax", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


const index = require("./routes/index");
app.use("/", index);

const login = require("./routes/login");
app.use("/login", login);

const signup = require("./routes/signup");
app.use("/signup", signup);

const dashboard = require("./routes/dashboard");
app.use("/dashboard", dashboard);

const projects = require("./routes/projects");
app.use("/projects", projects);

const account = require("./routes/account");
app.use("/account", account);

const notificaton = require("./routes/notification");
app.use("/notification", notificaton);

const share = require("./routes/share");
app.use("/share", share);

const trash = require("./routes/trash");
app.use("/trash", trash);

const help = require("./routes/help");
app.use("/help", help);

const generate = require("./routes/generate");
app.use("/generate", generate);

const language = require("./routes/language");
app.use("/language", language);

const keyword = require("./routes/keyword");
app.use("/keyword", keyword);

const create = require("./routes/create");
app.use("/create", create);

const blog1 = require("./routes/blog1");
app.use("/blog1", blog1);