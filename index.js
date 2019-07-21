const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();

// let Movies = [
//   {
//     title: "Moonstruck",
//     director: "Norman Jewison",
//     description:
//       "Loretta Castorini, a bookkeeper from Brooklyn, New York, finds \
//       herself in a difficult situation when she falls for the brother \
//       of the man she has agreed to marry.",
//     genre: "Comedy",
//     imgURL: "https://www.imdb.com/title/tt0093565/mediaviewer/rm1785117184"
//   },
//   {
//     title: "North by Northwest",
//     director: "Alfred Hitchcock"
//   },
//   {
//     title: "Rear Window",
//     director: "Alfred Hitchcock"
//   },
//   {
//     title: "Searching for Bobby Fischer",
//     director: "Steve Zaillian"
//   },
//   {
//     title: "Sneakers",
//     director: "Phil Alden Robinson"
//   },
//   {
//     title: "The Dark Knight",
//     director: "Christopher Nolan"
//   },
//   {
//     title: "The Bridge on the River Kwai",
//     director: "David Lean"
//   },
//   {
//     title: "Casablanca",
//     director: "Michael Curtiz"
//   },
//   {
//     title: "The Matrix",
//     director: "Lana & Lilly Wachowski"
//   },
//   {
//     title: "Open Range",
//     director: "Kevin Costner"
//   }
// ];

// app.use initializations
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});

// Gets list of all movies
app.get("/movies", function(req, res) {
  res.send("Successful GET request returning data about all movies.");
});

// Gets the data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data about a single movie.");
});

// Gets the data about a movie genre by name
app.get("/genre/:name", (req, res) => {
  res.send("Successful GET request returning data about a movie genre.");
});

// Gets the data about a director by name
app.get("/director/:name", (req, res) => {
  res.send("Successful GET request returning data about a director.");
});

// Adds data for a new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message);
  } else {
    res.send("User successfully added.");
  }
});

// Update the a user's information
app.put("/users/:username/:password/:email/:dateofbirth", (req, res) => {
  res.send("User information updated.");
});

// Adds movie to favorites for a user
app.post("/favorites/:username/:title", (req, res) => {
  res.send("add favorite movie by user.");
});

// Deletes a movie from a user's favorites list by username
app.delete("/favorites/:username/:title", (req, res) => {
  res.send("Movie successfully deleted from favorites.");
});

// Deletes a user from the user registry
app.delete("/users/:username", (req, res) => {
  res.send("User successfully deleted from registry.");
});

// listen for requests
app.listen(8080, () => console.log("My movie app is listening on port 8080."));
