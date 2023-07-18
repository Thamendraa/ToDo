const { name } = require("ejs");
const db = require("../Model/index");
const User = db.user;
const path = require("path");
const { profile } = require("console");

exports.renderSingup = async (req, res) => {
  res.render("singUp");
};

// (exports.google = async),
//   ("google", { scope: ["email", "profile"] }),
//   (req, res) => {
//     if (!req.user) {
//       res.render("singup");
//     } else {
//       res.render("main");
//     }
//   };
