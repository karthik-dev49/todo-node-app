const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const FILE = "tasks.json";

function readTasks() {
  return JSON.parse(fs.readFileSync(FILE));
}

function writeTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

app.post("/tasks", (req, res) => {
  const tasks = readTasks();
const newTask = {
  topic: req.body.topic.toUpperCase(),
  strength: req.body.strength
};

tasks.push(newTask);

  writeTasks(tasks);
  res.send("Task added");
});

app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  tasks.splice(req.params.id, 1);
  writeTasks(tasks);
  res.send("Task deleted");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
