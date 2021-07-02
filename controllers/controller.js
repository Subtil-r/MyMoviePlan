const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES

const saveMovie = (dbSave) => {

// open the database connection
let db = new sqlite3.Database('./db/db.movielistdb');

db.run(`INSERT INTO movie (movie_id, title, poster, date_plan, genre, rate) VALUES (?, ?, ?, ?, ?, ?)`, [dbSave.movie_id, dbSave.title, dbSave.poster, dbSave.date_plan, dbSave.genre, dbSave.rate], err => {
 if(err){
    return console.error(err.message);
  } else {
    console.log(`Rows inserted:  ${dbSave}`);
  }
 
});
 
db.close();

};

exports.saveMovie = saveMovie;

const showMovies = (req, res) => {

  let dataMovie = {data: []};

  // open the database
  let db = new sqlite3.Database('./db/db.movielistdb', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the movielist database.');
  });

  db.serialize(() => {
    db.each(`SELECT * FROM movie`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
      dataMovie.data.push(row)
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    res.send(dataMovie);
    console.log('Close the database connection.');
  });
};

exports.showMovies = showMovies;