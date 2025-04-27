const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="


const form = document.getElementById("form")
const search = document.getElementById("search")
const section = document.getElementById("hero")

let currentPage = 1;
let currentSearch = '';

const loadBtn = document.getElementById('btn');

loadBtn.addEventListener('click', () => {
  currentPage++;


  window.scrollTo({ top: 0, behavior: 'smooth' }); 

  if (currentSearch) {
    getMovies(`${SEARCH_API}${currentSearch}&page=${currentPage}`);
  } else {
    getMovies(`${API_URL.split('&page=')[0]}&page=${currentPage}`);
  }
});


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    console.log(data.results)
    showMovies(data.results)

    // getMovies(API_URL)

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const searchTerm = search.value
  
    if (searchTerm && searchTerm !== '') {
      getMovies(SEARCH_API + searchTerm)
  
      search.value = ''
    } else {
      window.location.reload()
    }
  })

  function showMovies(movies) {
    section.innerHTML = ''
  
    movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie
  
      const movieEl = document.createElement('div')
      movieEl.classList.add('movie-box')
  
      movieEl.innerHTML = `
      
      <img
      src="${IMG_PATH + poster_path}" alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3> ${title}</h3>
      <p>
       ${overview}
      </p>
    </div>
  
      `
  
      section.appendChild(movieEl)
    })
  }
  
  function getClassByRate(vote) {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  getMovies(API_URL);
  
