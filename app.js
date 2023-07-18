const express = require("express");
const port = 4001;
const path = require("path");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv").config();
const session = require("express-session");
require("./Services/passport");
const db = require("./Model/index");

db.sequelize.sync({ force: false }); //datbabase link
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "GOOGLE_Clent_SECRECT", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("singUp");
});

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

// Success
app.get("/auth/callback/success", (req, res) => {
  if (!req.user) res.redirect("/auth/callback/failure");
  res.send("Welcome " + req.user.email);
});

// Failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});

app.listen(port, () => {
  console.log("TO-DO List started at port 4001");
});
