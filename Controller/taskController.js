const db = require("../Model/index");
const Task = db.task;
const flash = require("connect-flash");
const path = require("path");
const moment = require("moment");

exports.renderAddTask = async (req, res) => {
  res.render("addTask", { user: req.user });
};

exports.rendernav = async (req, res) => {
  try {
    const view = await Task.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [["date", "ASC"]],
    });
    const message = req.flash();
    res.render("nav", {
      msg: message,
      task: view,
      moment: moment,
      user: req.user,
    });
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).send("Error fetching tasks");
  }
};

exports.addTask = async (req, res) => {
  console.log(req.day);

  const { date, task } = req.body;
  if (new Date(date) < new Date()) {
    req.flash("failure", "PAST IS PAST NOT ALLOWED ");
    res.redirect("/nav");
    console.log("date passed");
    return;
  }
  Task.create({
    task,
    date: date,
    completed: false,
    user_id: req.user.id,
  });
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
  const userId = req.user.id; // Assuming you have the user ID available in req.user

  let tasks;
  if (status === "completed") {
    tasks = await Task.findAll({
      where: {
        completed: true,
        user_id: userId,
      },
    });
  } else if (status === "pending") {
    tasks = await Task.findAll({
      where: {
        completed: false,
        user_id: userId,
      },
    });
  } else if (status === "missed") {
    tasks = await Task.findAll({
      where: {
        completed: false,
        date: {
          [db.Sequelize.Op.lt]: moment().startOf("day").toDate(),
        },
        user_id: userId,
      },
    });
  } else {
    tasks = await Task.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  res.render("nav", {
    task: tasks,
    moment: moment,
    selectedFilter: status,
    user: req.user,
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

exports.googleLogin = (req, res) => {
  res.render("singup");
};

exports.googleLogout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.error("Error while logging out:", err);
    }
    res.redirect("/");
  });
};
