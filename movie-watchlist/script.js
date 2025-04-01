
let pageNumber = 1
let searchTerm = ""
let searchResults = null
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const paginationContainer = document.getElementById("pagination-container")
const moviesContainer = document.getElementById("movies-container")
const omdbApiUrl = "https://www.omdbapi.com/?apikey=3868c4dd&"

function fetchMovies(searchTerm, pageNumber) {
    moviesContainer.innerHTML = ""
    fetch(omdbApiUrl + "s=" + encodeURIComponent(searchTerm) + "&page=" + pageNumber)
        .then(response => response.json())
        .then(result => {
            searchResults = result["Search"] ? result["Search"].map(movie => movie["imdbID"]) : "Error"

            renderMovies()
            handlePagination(result.totalResults)
        })
}

function fetchMovieDetails(imdbID) {
    return fetch(omdbApiUrl + "i=" + imdbID)
        .then(response => response.json())
}


function renderMovies() {
    if ( window.location.pathname.includes("watchlist.html") ) {
        const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
        if (watchlist.length === 0) {
            moviesContainer.innerHTML = `
                <div class="movies-placeholder">
                    <h2>Your watchlist is looking a little empty...</h2>
                    <p>
                        <img src="images/add-icon.png" alt="Add icon" />
                        <a href="index.html">Let’s add some movies!</a>
                    </p>
                <div>
            `
        } else {
            watchlist.forEach(imdbID => fetchMovieDetails(imdbID).then(renderMovie))
        }

    } else if (window.location.pathname.includes("index.html")) {
        if (searchResults === null) {
            moviesContainer.innerHTML = `
                <div class="movies-placeholder">
                    <img class="placeholder-img" src="images/film-icon.png" alt="film-reel-icon" />
                    <h2 class="placeholder-message">Start exploring</h2>
                <div>
            `
        } else if (searchResults === "Error") {
            moviesContainer.innerHTML = `
                <div class="movies-placeholder">
                    <p class="placeholder-message">
                        Unable to find what you’re looking for. Please try another search.
                    </>
                <div>
            `
        } else if (searchResults.length) {
            searchResults.forEach(imdbID => fetchMovieDetails(imdbID).then(renderMovie))
        } 
    }

}



function renderMovie(movie) {
    const movieContainer = document.createElement("div")
    movieContainer.classList.add("movie-container")
    movieContainer.id = movie["imdbID"]
    movieContainer.innerHTML = `
        <div class="movie-poster-container">
            <img class="movie-poster" 
                src="${movie["Poster"] !== "N/A" ? movie["Poster"] : "images/no-poster.jpg"}"
                alt="${movie["Poster"] !== "N/A" ? 
                    `Movie poster for movie${movie["Title"]}` : "Movie poster not available"}"
            />
        </div>
        <div class="movie-info-container">
            <div class="movie-stats-top-row">
                <h2 class="movie-title movie-detail">${movie["Title"]}</h2>
                <p class="movie-rating movie-detail">⭐ ${movie["imdbRating"]}</p>
            </div>
            <div class="movie-stats-bottom-row">
                <p class="movie-runtime movie-detail">${movie["Runtime"]}</p>
                <p class="movie-category movie-detail">${movie["Genre"]}</p>
            </div>
            <p class="movie-plot">${movie["Plot"]}</p>
        </div>
        <hr class="movie-divider" />
    `
    moviesContainer.appendChild(movieContainer)
    renderMovieActionButton(movie["imdbID"])
}

function renderMovieActionButton(imdbID) {

    const actionButton = document.createElement("button")
    actionButton.type ="button"
    actionButton.classList.add("movie-action-btn")
    actionButton.setAttribute("imdbID", imdbID)

    if (document.location.pathname.includes("index.html")) {

        const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
        if (watchlist.includes(imdbID)) {
            actionButton.classList.add("movie-action-btn-disabled")
            actionButton.innerHTML = `
                ✔️ Added! 
            `
        } else { 
            actionButton.textContent = `
                ➕ Watchlist
            `
            actionButton.addEventListener("click", addToWatchlist)
        }


    } else if (document.location.pathname.includes("watchlist.html")) {
        actionButton.innerHTML = `
            ➖ Remove
        `
        actionButton.addEventListener("click", removeFromWatchList)
    }

    document.getElementById(imdbID)
        .querySelector(".movie-stats-bottom-row")
        .appendChild(actionButton)
}

function addToWatchlist(e) {
    const imdbID = e.currentTarget.getAttribute("imdbID")
    const watchlist = JSON.parse(localStorage.getItem("watchlist"))

    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }

    e.target.classList.add("movie-action-btn-disabled")
    e.target.innerHTML = `✔️ Added!`

}

function removeFromWatchList(e) {
    const targetMovieID = e.target.getAttribute("imdbID")
    let watchlist = JSON.parse(localStorage.getItem("watchlist"))

    watchlist = watchlist.filter(movieID => movieID !== targetMovieID)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    moviesContainer.innerHTML = ""

    renderMovies()

}

function handlePagination(totalResults) {
    if (totalResults <= 10 || totalResults === undefined) return;

    paginationContainer.innerHTML = `
        <button id="back-btn" class="pagination-btn" ${pageNumber === 1 ? "disabled" : ""}>&lt; Back</button>
        <button id="next-btn" class="pagination-btn" ${pageNumber * 10 > totalResults ? "disabled" : ""}>Next &gt;</button>
    `;
    document.getElementById("back-btn")?.addEventListener("click", () => changePage(-1));
    document.getElementById("next-btn")?.addEventListener("click", () => changePage(1));
}

function changePage(increment) {
    pageNumber += increment;
    moviesContainer.innerHTML = "";
    fetchMovies(searchTerm, pageNumber);
}

function oldHandlePagination(totalResults) {
    console.log(totalResults)
    if (totalResults < 10 || totalResults === undefined) return 

    document.getElementById("pagination-container").innerHTML = `
        <button
            id="back-btn"
            class="pagination-btn"
            type="button"
            data-next-page-increment="-1"
            ${pageNumber === 1 ? "disabled" : ""}
        >
            &lt; Back
        </button>
        <button
            id="next-btn"
            class="pagination-btn"
            type="button"
            data-next-page-increment="1"
            ${pageNumber * 10 > totalResults ? "disabled": ""}
        >
            Next &gt;
        </button>
    `
    document.querySelectorAll(".pagination-btn").forEach(btn => {
        btn.addEventListener("click", handlePaginationBtnClick)
    })
}

function oldHandlePaginationBtnClick(e) {

    const nextPageIncrement = Number(e.target.dataset.nextPageIncrement)
    pageNumber += nextPageIncrement

    moviesContainer.innerHTML = ""
    fetchMovies(searchTerm, pageNumber)
}

document.addEventListener("load", function() {

    if (localStorage.getItem("watchlist") === null) {
        localStorage.setItem("watchlist", JSON.stringify([]))
    }

    if (window.location.pathname.includes("index.html")) {
        searchBtn.addEventListener("click", async (e) => {
            e.preventDefault()
        
            searchTerm = searchInput.value
            pageNumber = 1;
        
            fetchMovies(searchTerm, pageNumber)
        
        })
    }

    renderMovies()
})



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