const express = require("express");
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
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.send("Welcome to my movie app!");
});
// app.get("/documentation", function(req, res) {
//   res.sendFile("public/documentation.html", { root: __dirname });
// });
app.get("/movies", function(req, res) {
  res.json(topTenMovies);
});

// listen for requests
app.listen(8080, () => console.log("My movie app is listening on port 8080."));
