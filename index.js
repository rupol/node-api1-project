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

  db.insert(newUser)
    .then(id => {
      res.status(201).json({ user: newUser, id: id });
    })
    .catch(err => {
      return res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database."
      });
    });
});

// GET api/users
app.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      return res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

// GET api/users/:id
app.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      return res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      });
    });
});

// DELETE api/users/:id
app.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(num => {
      if (num) {
        res.json(`${num} user has been deleted.`);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});

// PUT api/users/:id

//////// SERVER INIT ////////
const port = 8080;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
