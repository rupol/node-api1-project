// implement your API here
const express = require("express");
const db = require("./data/db");

const app = express();

app.use(express.json());
//////// ENDPOINTS ////////

// POST api/users
app.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
    created_at: Date(),
    updated_at: Date()
  };

  db.insert(newUser).catch(err => {
    return res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  });
  res.status(201).json(newUser);
});

// GET api/users

// GET api/users:id

// DELETE api/users/:id

// PUT api/users/:id

//////// SERVER INIT ////////
const port = 8080;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
