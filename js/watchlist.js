// Calling LocalStorage Data
const watchListResult = document.getElementById("watchlist-result")
let watchListFromLocal = []
getLocalValue()

function getLocalValue(){
    if (localStorage.getItem("array")){
        watchListFromLocal = JSON.parse(localStorage.getItem("array"))
    }else{
        watchListFromLocal = []
    }
}

// Rendering WatchList for watchlist.html
function getWatchList(){    
    let watchListHtml = watchListFromLocal.map((watchList) => {
        const {Title, Poster, Runtime, Genre, imdbRating, imdbID, Plot} = watchList
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
                    <p id="add-to-watchlist" data-imdb="${imdbID}"><i class="fa-solid fa-circle-minus"></i>&nbsp;Remove to Watchlist</p>
                </div>
                <p id="movie-description">
                    ${Plot} 
                </p>
            </div>
        </div>
        `
    }).join('')
    
    renderWatchList(watchListHtml)
}

function renderWatchList(watchLists){
    // For Clearing Watch List
    if (watchListFromLocal.length > 0){
        watchListResult.innerHTML = watchLists
        watchListResult.innerHTML += `<p id="clear-watchlist">Clear Watch List</p>`
        document.getElementById("clear-watchlist").style.display = "block"
    }else{
        document.getElementById("clear-watchlist").style.display = "none"
        displayNoWatchList()
    }
}

// Removing to Watchlist
document.addEventListener("click",function(e){
    e.preventDefault()
      
    if (e.target.dataset.imdb){
        // Getting index of the selected imdbID
        let currentWatchList = JSON.parse(localStorage.getItem("array"))
        let selectedFilmId = e.target.dataset.imdb
        let selectedFilmIndex = currentWatchList.findIndex((obj => obj.imdbID === selectedFilmId))
        
        // Deleting Watchlist Using Splice
        currentWatchList.splice(selectedFilmIndex,1)
        const newWatchList = JSON.stringify(currentWatchList)
        
        // Setting New Storage
        localStorage.clear()
        localStorage.setItem("array",newWatchList)
        getLocalValue()
        getWatchList()
    } 
})

// It displays if no Watchlist
function displayNoWatchList(){
    localStorage.clear()
    watchListResult.innerHTML = `
        <i class="fa-solid fa-film fa-sharp movie-icon"></i>
        <p id="start-exploring-message">Your watchlist is empty. Click <font id="return-index" onclick="window.location.href='index.html'">here</font> to add movies</p>
        <p id="clear-watchlist">Clear Watch List</p>
    `
}

getWatchList()

document.getElementById("clear-watchlist").addEventListener("click",function(){
    displayNoWatchList()
})