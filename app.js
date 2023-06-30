const express = require("express");
const app = express();
const port = 4001;
const controller = require("./Controller/taskController");
//link
const db = require("./Model/index");
db.sequelize.sync({ force: false });

app.set("view engine", "ejs"); //gobal ejs lai call garnu ko lagi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", controller.main);

app.get("/addTask", controller.renderAddTask);

app.post("/addTask", controller.addTask);

//setting the port
app.listen(port, () => {
  console.log(" Hello, Node server started at port 4001");
});
