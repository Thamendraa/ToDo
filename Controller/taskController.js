const { name } = require("ejs");
const db = require("../Model/index");
const Task = db.task;
const path = require("path");

exports.main = async (req, res) => {
  const view = await Task.findAll();
  console.log(view);

  res.render("main", { view });
};

exports.renderAddTask = async (req, res) => {
  res.render("addTask");
};

exports.addTask = async (req, res) => {
  console.log(req.file);

  const { date, task } = req.body;

  Task.create({
    date,
    task,
  });

  res.redirect("/");
};
