
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchResultContainer = document.getElementById("movie-search-results-container")
const omdbApiUrl = "http://www.omdbapi.com/?apikey=3868c4dd&"

const findingNemo = {
    "Title": "Finding Nemo",
    "Year": "2003",
    "Rated": "G",
    "Released": "30 May 2003",
    "Runtime": "100 min",
    "Genre": "Animation, Adventure, Comedy",
    "Director": "Andrew Stanton, Lee Unkrich",
    "Writer": "Andrew Stanton, Bob Peterson, David Reynolds",
    "Actors": "Albert Brooks, Ellen DeGeneres, Alexander Gould",
    "Plot": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    "Language": "English, Japanese, Russian",
    "Country": "United States, Japan",
    "Awards": "Won 1 Oscar. 49 wins & 63 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5NjExNTA5OV5BMl5BanBnXkFtZTYwMTQ0ODY2._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "8.2/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "99%"
        },
        {
            "Source": "Metacritic",
            "Value": "90/100"
        }
    ],
    "Metascore": "90",
    "imdbRating": "8.2",
    "imdbVotes": "1,150,718",
    "imdbID": "tt0266543",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "$380,843,261",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const movie = searchInput.value

    fetch(omdbApiUrl + "s=" + encodeURIComponent(movie))
        .then(response => response.json())
        .then(result => {
            result["Search"].forEach(movie => getMovieDetails(movie))
        })

})

function getMovieDetails(movie) {
    fetch(omdbApiUrl + "i=" + movie["imdbID"])
        .then(response => response.json())
        .then(movie => {
            renderMovie(movie)
        })
}



function renderMovie(movie) {
    const movieContainer = document.createElement("div")
    movieContainer.classList.add("movie-container")
    movieContainer.innerHTML = `
        <img 
            class="movie-poster"
            src="${movie["Poster"]}" 
            alt="Movie poster for ${movie["Title"]}" 
        />
        <div class="movie-stats-container">
            <div class="movie-stats-top-row">
                <h2 class="movie-title">${movie["Title"]}</h2>
                <p class="movie-detail">IMDB rating: ${movie["imdbRating"]}</p>
            </div>
            <div class="movie-stats-bottom-row">
                <p class="movie-detail movie-runtime">${movie["Runtime"]}</p>
                <p class="movie-detail movie-category">${movie["Genre"]}</p>
                <button>Watchlist</button>
            </div>
        </div>
        <p class="movie-plot">${movie["Plot"]}</p>
    `
    searchResultContainer.appendChild(movieContainer)
}