
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchResultContainer = document.getElementById("search-results-container")
const omdbApiUrl = "http://www.omdbapi.com/?apikey=3868c4dd&"


searchBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const movie = searchInput.value

    fetch(omdbApiUrl + "s=" + encodeURIComponent(movie))
        .then(response => response.json())
        .then(result => renderMovieResults(result["Search"]))

})

function renderMovieResults(movies) {
    let movieResultsHtml = ""
    movies.forEach( (movie) => {
        console.log(movie)
        movieResultsHtml += `
            <div class="movie-container" id="${movie["imdbID"]}"></div>
        `
    })
    searchResultContainer.innerHTML = movieResultsHtml
    getMovieDetails(movies)
}

function getMovieDetails(movies) {
    movies.forEach(movie => {
        fetch(omdbApiUrl + "i=" + movie["imdbID"])
            .then(response => response.json())
            .then(movie => {
                document.getElementById(movie["imdbID"]).innerHTML = `
                    <img 
                        class="movie-poster"
                        src="${movie["Poster"]}" 
                        alt="Movie poster for ${movie["Title"]}" 
                    />
                    <div class="movie-details-container">
                        <div class="movie-details-top-row">
                            <h2 class="movie-title">${movie["Title"]}</h2>
                            <p class="movie-detail">IMDB rating: ${movie["imdbRating"]}</p>
                        </div>
                        <div class="movie-details-bottom-row">
                            <p class="movie-detail movie-runtime">${movie["Runtime"]}</p>
                            <p class="movie-detail movie-category">${movie["Genre"]}</p>
                            <button>Watchlist</button>
                        </div>
                    </div>
                `
            })

    })
}