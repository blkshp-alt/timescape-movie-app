const API_Key = 'api_key=b90a47fca897e886e321f5f0b735baae';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&'+ API_Key;
const IMG_URL  = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_Key;


const main = document.getElementById('main');
const form = document.getElementById('form');
console.log(form);
const search = document.getElementById('search');


getMovies(API_URL);

function getMovies(url) {
  //fetch url and show movies that we get as a data response from the url
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)
    showMovies(data.results)
   })

}

function showMovies(data) {
  main.innerHTML = '';
  //since we are targeting the results obeject we can loop through the array of data which is the moves to display them

  //use object descrusting to get the rating overview and image
  data.forEach(movie => {
    const {title, backdrop_path, overview, vote_average} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src=${IMG_URL+backdrop_path} alt=${title}>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class=${getColor(vote_average)}>${vote_average}</span>
    </div>

    <div class="overview">
      ${overview}
    </div>

  `
  main.appendChild(movieEl);
  });
}


function getColor(vote) {

  //if the vote is greater than or equal to 8 
  if(vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}



form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  
  setGenre();
  if(searchTerm) {
      getMovies(searchURL+'&query='+searchTerm)
  }else{
      getMovies(API_URL);
  }

})