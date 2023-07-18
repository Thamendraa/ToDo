const { name } = require("ejs");
const db = require("../Model/index");
const User = db.user;
const path = require("path");
const { profile } = require("console");
const passport = require("passport");

exports.getLoginPage = (req, res) => {
  res.render("singup");
};

// exports.authenticateWithGoogle = passport.authenticate("google", {
//   scope: ["email", "profile"],
// });

// exports.authCallback = passport.authenticate("google", {
//   successRedirect: "/auth/callback/success",
//   failureRedirect: "/auth/callback/failure",
// });

// exports.authSuccess = (req, res) => {
//   if (!req.user) {
//     res.redirect("/auth/callback/failure");
//   } else {
//     res.render("success", { user: req.user });
//   }
// };

// exports.authFailure = (req, res) => {
//   res.send("Error");
// };
