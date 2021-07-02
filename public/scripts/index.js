let genres; //variable to get genre name


// Modal to display Full Cards
const myModal = () => {

  let modal = document.getElementById("modal-box");
  
  let card_info = document.querySelectorAll('.card-info');
  

  card_info.forEach(card => {

    card.addEventListener('click', (event) => {
      
      let fullCards = document.getElementsByClassName('card-full');
     
      for(let i = 0; i < fullCards.length; i++){
      
        if(fullCards[i].id == card.id){
          fullCards[i].style.display = "inline-flex";
          
        } else {
          fullCards[i].style.display = "none";
        }
      }
      modal.style.display = "block";
    });

    modal.addEventListener('click', (event) => {
    modal.style.display = "none";
    fullCard.style.display = "none";
  });

  })

}



// Slide carousel
/* const slide = (time) => {
  $(document).ready(function(){
    $('.miniSlide').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: time,
      
    });
  });
}; */

//adding movie to db
const addMovie = () => {

  let dbCards = document.querySelectorAll('.card-mini');
  
  dbCards.forEach(card => {

    let addBtn = card.querySelector('.addBtnMovie');
    
    addBtn.addEventListener("click", (event) => {

      //display modal with date to input
      let modalDate = document.getElementById("modalDate");
      modalDate.style.display = "block";
      let dateInput = document.getElementById("dateInput");
      dateInput.style.display = "inline-flex";

      //save button
      let saveDate = document.getElementById('dateOk');

      saveDate.addEventListener('click', () => {

        let dbMovieId = card.querySelector('img').id;
        let dbTitle = card.querySelector('.title').innerText;
        let dbPoster = card.querySelector('img').src;
        let dbDate = document.querySelector('#datePlan').value;
        let dbGenre = card.querySelector('.genre').innerText;
        let dbRate = card.querySelector('.rate').innerText;

        let dbSave = {movie_id: dbMovieId, title: dbTitle, poster: dbPoster, date_plan: dbDate, genre: dbGenre, rate: dbRate};

        fetch("api/add/movie", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dbSave),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

          modalDate.style.display = "none";
          dateInput.style.display = "none";

      })

      //cancel button
      let cancelDate = document.getElementById('dateCancel');

      cancelDate.addEventListener('click', (event) => {
        modalDate.style.display = "none";
        dateInput.style.display = "none";
      })
      
    });
  })
  
  
  
};

//show movies in saved container
const dispMovContainer = (display) => {

  display.forEach((info) => {

    //generating full card to display on modal
    let containerFull = document.querySelector('#modal-box');

    let fullContent = ` <div id="${info.id}" class="card-full">
    <div id="titleBox" class="title">
      <p><i class='bx bx-purchase-tag'></i>${info.title}</p>
    </div>
    <div class="left">
      <img src="${info.poster}" alt="poster" id="poster">
      <div id="graphic-poster">/*<i class='bx bx-x-circle' ></i>*/</div>
    </div>

    <div class="right">
      
      <p class="sinopse">${info.overview}</p>
      <div class="info-position">
        <div class="infos">
          <p class="country"><i class='bx bx-world'></i>country: <span>${info.original_language}</span></p>
          <p class="release-date"><i class='bx bx-calendar-event' ></i>date: <span>${info.release_date}</span></p>
          <p class="duration"><i class='bx bx-time' ></i>duration: <span>${info.release_date}</span></p>
          <p class="idiom"><i class='bx bx-message-rounded-detail'></i>idiom: <span>${info.original_language}</span></p>
        </div>
        <div class="credit">
            <p class="director"><i class='bx bx-user' ></i>director: <span>director</span></p>
            <p class="cast"><i class='bx bx-star' ></i>cast: <span>cast</span></p>
          </div>
          <div class="trailer-wrap">

            <div class="graphic-left"></div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/c_dNIXwrbzY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="graphic-right"></div>
      </div>

        </div>`;

    containerFull.insertAdjacentHTML('beforeend', fullContent);
    
    //generating mini cards to display on load page
    let saveContainer = document.querySelector('#container-saved');

    let miniContent = `<div>
    <div class="card-mini">
    <img id="${info.id}" src="${info.poster}" alt="movie poster" class="card-info">
    <p class="title">${info.title}</p>
    <div class="card-foot">
      <p class="genre" id="genre_id">${info.genre}</p>
      <p class="rate">${info.rate}</p>
      <i class='button add bx bx-plus-circle addBtnMovie' id="add"></i>
    </div>
    <p class="date">${info.date_plan}</p>
  </div>
  </div>`;

  saveContainer.insertAdjacentHTML('beforeend', miniContent);

  })
  myModal();
  
  $(document).ready(function(){
    $('.miniSave').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      cssEase: 'ease-in-out',
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 3000
      
    });
  });
  
};

const displayMoviesDB = () => {

  fetch('api/show/movie', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  dispMovContainer(data.data);
})
.catch(error => {
  console.error('Error:', error);
});
};



//converting genre number to name
const getGenreNameById = (id) => {
  for(var prop in genres){
    if (genres[prop].id == id){
      return genres[prop].name;
    } else if (genres[prop].id === 878){
      genres[prop].name = "Sci-Fi";
      return genres[prop].name;
    }
  } 
 
}

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=dbf322db244485a6d4cf65aef8b2b1bb`)
  .then(response => response.json())
  .then((data) => {
    genres = data.genres;      
  });

  
//display 'now on theaters' movies
const nowMovie = () => {

 
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dbf322db244485a6d4cf65aef8b2b1bb&region=PT`)
  .then(response => response.json())
  .then(data => {
      data.results.forEach((info) => {

        //generating full card to display on modal
        let containerFull = document.querySelector('#modal-box');

        let fullContent = ` <div id="${info.id}" class="card-full">
        <div id="titleBox" class="title">
          <p><i class='bx bx-purchase-tag'></i>${info.title}</p>
        </div>
        <div class="left">
          <img src="https://image.tmdb.org/t/p/w500${info.poster_path}" alt="poster" id="poster">
          <div id="graphic-poster">/*<i class='bx bx-x-circle' ></i>*/</div>
        </div>

        <div class="right">
          
          <p class="sinopse">${info.overview}</p>
          <div class="info-position">
            <div class="infos">
              <p class="country"><i class='bx bx-world'></i>country: <span>${info.original_language}</span></p>
              <p class="release-date"><i class='bx bx-calendar-event' ></i>date: <span>${info.release_date}</span></p>
              <p class="duration"><i class='bx bx-time' ></i>duration: <span>${info.release_date}</span></p>
              <p class="idiom"><i class='bx bx-message-rounded-detail'></i>idiom: <span>${info.original_language}</span></p>
            </div>
            <div class="credit">
                <p class="director"><i class='bx bx-user' ></i>director: <span>director</span></p>
                <p class="cast"><i class='bx bx-star' ></i>cast: <span>cast</span></p>
              </div>
              <div class="trailer-wrap">

                <div class="graphic-left"></div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/c_dNIXwrbzY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="graphic-right"></div>
          </div>

            </div>`;

        containerFull.insertAdjacentHTML('beforeend', fullContent);
        
        //generating mini cards to display on load page
        let nowContainer = document.getElementById('nowContainer');

        let miniContent = `<div>
        <div class="card-mini ">
        <img id="${info.id}" src="https://image.tmdb.org/t/p/w500${info.poster_path}" alt="movie poster" class="card-info">
        <p class="title">${info.title}</p>
        <div class="card-foot">
          <p class="genre" id="genre_id">${getGenreNameById(info.genre_ids[0])}</p>
          <p class="rate">${info.vote_average}</p>
          <i class='button add bx bx-plus-circle addBtnMovie' id="add"></i>
        </div>
        <p class="date">${info.release_date}</p>
      </div>
      </div>`;

        nowContainer.insertAdjacentHTML('beforeend', miniContent);

      })
      myModal();
      
      $(document).ready(function(){
        $('.miniNow').slick({
          slidesToShow: 4,
          slidesToScroll: 3,
          arrows: true,
          cssEase: 'linear',
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 1500
          
        });
      });
    }
      
   );
};

//display 'upcoming' movies
const upComingMovie = () => {

  //let poster = `https://api.themoviedb.org/3/movie/${info.movie_id}/images?api_key=dbf322db244485a6d4cf65aef8b2b1bb`;
  
 fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=dbf322db244485a6d4cf65aef8b2b1bb&region=PT`)
   .then(response => response.json())
   .then(data => {
       data.results.forEach((info) => {
 
         let containerFull = document.querySelector('#modal-box');

         let fullContent = ` <div id="${info.id}" class="card-full">
        <div id="titleBox" class="title">
          <p><i class='bx bx-purchase-tag'></i>${info.title}</p>
        </div>
        <div class="left">
          <img src="https://image.tmdb.org/t/p/w500${info.poster_path}" alt="poster" id="poster">
          <div id="graphic-poster">/*<i class='bx bx-x-circle' ></i>*/</div>
        </div>

        <div class="right">
          
          <p class="sinopse">${info.overview}</p>
          <div class="info-position">
            <div class="infos">
              <p class="country"><i class='bx bx-world'></i>country: <span>${info.original_language}</span></p>
              <p class="release-date"><i class='bx bx-calendar-event' ></i>date: <span>${info.release_date}</span></p>
              <p class="duration"><i class='bx bx-time' ></i>duration: <span>${info.release_date}</span></p>
              <p class="idiom"><i class='bx bx-message-rounded-detail'></i>idiom: <span>${info.original_language}</span></p>
            </div>
            <div class="credit">
                <p class="director"><i class='bx bx-user' ></i>director: <span>director</span></p>
                <p class="cast"><i class='bx bx-star' ></i>cast: <span>cast</span></p>
              </div>
              <div class="trailer-wrap">

                <div class="graphic-left"></div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/c_dNIXwrbzY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="graphic-right"></div>
          </div>

            </div>`;
 
         containerFull.insertAdjacentHTML('beforeend', fullContent)
         
         let upContainer = document.getElementById('upContainer');

         let miniContent = `<div>
         <div class="card-mini ">
        <img id="${info.id}" src="https://image.tmdb.org/t/p/w500${info.poster_path}" alt="movie poster" class="card-info">
        <p class="title">${info.title}</p>
        <div class="card-foot">
          <p class="genre" id="genre_id">${getGenreNameById(info.genre_ids[0])}</p>
          <p class="rate">${info.vote_average}</p>
          <i class='button add bx bx-plus-circle addBtnMovie' id="add"></i>
        </div>
        <p class="date">${info.release_date}</p>
      </div>
      </div>`;
 
         upContainer.insertAdjacentHTML('beforeend', miniContent);
       })
       myModal();
       addMovie();
       
       $(document).ready(function(){
        $('.miniUp').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 1500
          
        });
      });
     }
       
    );
 };



//calling functions on page load
nowMovie();
upComingMovie();
displayMoviesDB();



//carousel

