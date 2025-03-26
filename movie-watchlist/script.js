
let pageNumber = 1
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchResultContainer = document.getElementById("search-results-container")


searchBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const movie = searchInput.value

    const params = new URLSearchParams()
    params.append("apikey", "3868c4dd")
    params.append("s", movie)

    const response = await fetch(`http://www.omdbapi.com/?${params}`)
    const searchResult = await response.json()

    pageNumber = 1
    renderMovieResults(searchResult)
})

function renderMovieResults(result) {
    let moviesHtml = ""
    result.Search.forEach(movie => moviesHtml += `
        <div class="movie-container">
            <h2>${movie["Title"]}</h2>
        </div>    
    `)
    searchResultContainer.innerHTML = moviesHtml
}