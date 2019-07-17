const express = require("express");
const morgan = require("morgan");
const app = express();

let topTenMovies = [
  {
    title: "Moonstruck",
    director: "Norman Jewison"
  },
  {
    title: "North by Northwest",
    director: "Alfred Hitchcock"
  },
  {
    title: "Rear Window",
    director: "Alfred Hitchcock"
  },
  {
    title: "Searching for Bobby Fischer",
    director: "Steve Zaillian"
  },
  {
    title: "Sneakers",
    director: "Phil Alden Robinson"
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan"
  },
  {
    title: "The Bridge on the River Kwai",
    director: "David Lean"
  },
  {
    title: "Casablanca",
    director: "Michael Curtiz"
  },
  {
    title: "The Matrix",
    director: "Lana & Lilly Wachowski"
  },
  {
    title: "Open Range",
    director: "Kevin Costner"
  }
];

// GET requests
app.use(morgan("common"));
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});
app.get("/", function(req, res) {
  res.send("Welcome to my movie app!");
});
app.get("/movies", function(req, res) {
  res.json(topTenMovies);
});

// listen for requests
app.listen(8080, () => console.log("My movie app is listening on port 8080."));
