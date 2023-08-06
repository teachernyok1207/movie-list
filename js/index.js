// Importing Array for Watchlist
// import { watchListArr } from "./data.js"

// Call ElementsByID
const searchBar = document.getElementById("search-bar")
const searchButton = document.getElementById("search-button")
const searchResult = document.getElementById("search-result")

// Declaring Array for List of Films
let filmArray = []

// Declaring Array for the Watch List
let watchListArr = []
let currentWatchList = []

if (localStorage.getItem("array")){
    watchListArr = JSON.parse(localStorage.getItem("array"))
}else{
    watchListArr = []
}

// Fetch API
function searchMovie(){
    if (searchBar.value){
        fetch(`https://www.omdbapi.com/?apikey=f70d3711&s=${searchBar.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Search){
                setFilmsToArray(data.Search)
                filmArray = []
            }else{
                alert("Film not Found!")
            }
        })
    }else{
        searchBar.focus()
    }
}

// Setting Search Movies to Array
function setFilmsToArray(filmInfo){
    for (let lists of filmInfo){
        fetch(`https://www.omdbapi.com/?apikey=f70d3711&t=${lists.Title}`)
        .then(res => res.json())
        .then(data => {
            filmArray.push(data)
            setFilmList()
        })
    }
}

// Fetch Movie by Search Engine
searchButton.addEventListener("click", searchMovie)

// Display Movie List
function setFilmList(){
    let filmHtml = filmArray.map((film) => {
        const {Title, Poster, Runtime, Genre, imdbRating, imdbID, Plot} = film
        
        return `
        <div class="movie-list">
            <div id="movie-list-img">
                <img id="movie-img" src="${Poster}">
            </div>
            <div id="movie-details">
                <div id="movie-name">
                    <h3 id="movie-title">${Title}</h3>
                    <i id="star-rating" class="fa-solid fa-star"></i>
                    <p id="movie-rate">${imdbRating}</p>
                </div>
                <div id="other-details">
                    <p id="movie-watch-hours">${Runtime}</p>
                    <p id="movie-genre">${Genre}</p>
                    <p id="add-to-watchlist" data-imdb="${imdbID}"><i class="fa-solid fa-circle-plus"></i>&nbsp;Add to Watchlist</p>
                </div>
                <p id="movie-description">
                    ${Plot} 
                </p>
            </div>
        </div>
        `
    }).join('')
    renderFilmList(filmHtml)
}

// Displaying Search Result in innerHTML of DIV
function renderFilmList(filmLists){
    searchResult.innerHTML = filmLists
}

// Pushing Data to Watchlist
document.addEventListener("click",function(e){
    e.preventDefault()
    
    if (e.target.dataset.imdb){
        // Checking if the imdbID is existing
        if (localStorage.getItem("array")){
            currentWatchList = JSON.parse(localStorage.getItem("array"))
          
            const currentArray = currentWatchList.filter(function(watchlist){
                return watchlist.imdbID === e.target.dataset.imdb
            })
        }else{
            currentWatchList = []
        }
        
        const currentArray = currentWatchList.filter(function(watchlist){
            return watchlist.imdbID === e.target.dataset.imdb
        })
        
        if (currentArray.length === 0){
            const filmFilter = filmArray.filter(function(film){
                return film.imdbID === e.target.dataset.imdb
            })[0]
            // Adding to Array
            watchListArr.unshift({
                Title: filmFilter.Title,
                Poster: filmFilter.Poster,
                Runtime: filmFilter.Runtime,
                Genre: filmFilter.Genre,
                imdbRating: filmFilter.imdbRating,
                imdbID: filmFilter.imdbID,
                Plot: filmFilter.Plot
            })
            
            const watchList = JSON.stringify(watchListArr)
            localStorage.setItem("array",watchList)
        }else{
            alert("This film is existing in your Watch List!")
        }
    }
})