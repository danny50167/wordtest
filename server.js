//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { raw } = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.clearCookie("userDB");
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});
app.post("/signin", (req, res) => {
  res.cookie("ID", req.body.id);
  res.redirect("/home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  let rawDB = JSON.parse(
    fs.readFileSync("public/db/users.json", {
      encoding: "utf-8",
    })
  );

  const userInfo = {
    name: req.body.name,
    id: req.body.id,
    age: req.body.age,
    level: req.body.level,
    pw: req.body.pw,
  };
  rawDB[req.body.id] = userInfo;

  fs.writeFileSync("public/db/users.json", JSON.stringify(rawDB), {
    encoding: "utf-8",
  });

  res.redirect("/signin");
});

app.get("/home", (req, res) => {
  const ID = req.cookies["ID"];

  // const userDB = JSON.stringify(
  //   JSON.parse(fs.readFileSync("public/db/users.json", { encoding: "utf-8" }))[
  //     ID
  //   ]
  // );

  const rawDB = JSON.parse(
    fs.readFileSync("public/db/users.json", { encoding: "utf-8" })
  );
  const userDB = rawDB[ID];

  res.cookie("userDB", JSON.stringify(userDB));
  console.log(req.cookies["userDB"]);

  res.render("home", { ID, userDB });
});

app.get("/study", (req, res) => {
  const mode = req.query.mode;

  if (mode == "insert") {
    res.render("study/insert");
  } else if (mode == "test") {
    res.render("study/test");
  } else if (mode == "result") {
    res.render("study/result");
  }
});
app.post("/study", (req, res) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  const date = `${year}-${month}-${day}`;

  const score = {
    date: date,
    score: req.body.score,
  };
  let data = JSON.parse(
    fs.readFileSync("public/db/users.json", { encoding: "utf-8" })
  );

  const ID = req.cookies["ID"];
  data[ID].history.push(score);
  data[ID]["recent"] = date;

  fs.writeFileSync("public/db/users.json", JSON.stringify(data), {
    encoding: "utf-8",
  });

  res.redirect("/home");
});

app.listen(3000, () => {
  console.log("Server started on port 3000\n-> http://localhost:3000 <-");
});
