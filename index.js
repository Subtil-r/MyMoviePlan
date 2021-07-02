// lib and imports
const express = require("express");
const app = express();
const myFirstController = require("./controllers/controller");


// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('home.ejs');
});


// Create here your api setup

//adding movie to db
app.post('/api/add/movie', (req, res) => {
  myFirstController.saveMovie(req.body);
});

//show movies from db
app.post('/api/show/movie', myFirstController.showMovies);

app.post('/api/dl/movie', myFirstController.dlMovies);


app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));

