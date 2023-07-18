const express = require("express");
const app = express();
const port = 4001;
const uc = require("./Controller/userController");
const controller = require("./Controller/taskController");
require("dotenv").config();
require("./Services/passport");
//link
const db = require("./Model/index");
db.sequelize.sync({ force: false });

app.set("view engine", "ejs"); //gobal ejs lai call garnu ko lagi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users
app.get("/", uc.renderSingup);

app.get("/main", controller.main);

app.get("/addTask", controller.renderAddTask);

app.post("/addTask", controller.addTask);

//setting the port
app.listen(port, () => {
  console.log(" Hello, Node server started at port 4001");
});
