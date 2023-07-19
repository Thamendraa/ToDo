const { name } = require("ejs");
const db = require("../Model/index");
const Task = db.task;
const Complete = db.completed;
const path = require("path");
const moment = require("moment");
const flash = require("connect-flash");

exports.renderAddTask = async (req, res) => {
  res.render("addTask");
};
exports.rendernav = async (req, res) => {
  try {
    const view = await Task.findAll({
      order: [["date", "ASC"]], // Sort by "date" column in descending order
    });
    const message = req.flash();

    res.render("nav", { task: view, moment: moment, msg: message, blogs });
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
};

exports.addTask = async (req, res) => {
  console.log(req.day);

  const { date, task } = req.body;
  if (new Date(date) < new Date()) {
    res.redirect("/nav");
    console.log("date passed");
    return;
  }
  Task.create({
    task,
    date,
    completed: false,
  });
  req.flash("failure", "Past is past focus on future ");
  res.redirect("nav");
};

exports.taskCompleted = async (req, res) => {
  const id = req.params.id;

  await Task.update(
    { completed: 1 },
    {
      where: {
        id: id,
      },
    }
  );
  console.log("Task is Completed successfully");
  res.redirect("/nav/completed");
};
exports.renderStatusTasks = async (req, res) => {
  const { status } = req.params;

  let tasks;
  if (status === "completed") {
    tasks = await Task.findAll({
      where: {
        completed: true,
      },
    });
    res.render("completed", { task: tasks, moment: moment });
  } else if (status === "pending") {
    tasks = await Task.findAll({
      where: {
        completed: false,
      },
    });
  } else {
    tasks = await Task.findAll();
  }

  res.render("nav", {
    task: tasks,
    moment: moment,
    selectedFilter: status,
  });
};
exports.deleteTask = async (req, res) => {
  try {
    const list = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("List Deleted Successfully");
  } catch (error) {
    console.error(error);
  }

  res.redirect("/nav");
};
