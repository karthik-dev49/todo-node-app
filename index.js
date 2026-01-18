const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "karthik",
  port: 5432,
});

// TEST API
app.get("/", (req, res) => {
  res.send("Server is running");
});
// ADD A TODO
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM todos WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
