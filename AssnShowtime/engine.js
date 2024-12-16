/**
 * @param element
 * Navigate with a query string
 */
function searchEventListeners(element) {
    element.addEventListener("click", e => {
        console.log(searchInput.value);
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    })
}

// make the back button work the same as the one built into the browser
document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
});

/**
 * @param id
 * @param href
 * this will send the user to the desired cards page when they click on a card
 */
function cardEvent(id, href) {
    window.location.href = `${href}?api_key=${apiKey}&id=${id}`;
}

/**
 * @param title
 * @param pic
 * @param ident
 * @returns {string}
 * creates the elements needed for customizing which persons info is displayed
 */
function buildPeopleCard(title, pic, ident) {
    return `<button class="people-card" onclick="cardEvent(${ident}, 'person.html')">
                <div class="card">
                    <span class="card-title">${title}</span>
                    <img class="card-img-top" src="${pic}" alt="${title}" />
                </div>
            </button>`;
}


function buildMovieCard(title, pic, releaseYear, rating, ident) {
    return `<button class="movie-card" onclick="cardEvent(${ident}, 'movie.html')">
                <div class="card">
                    <span class="card-title">${title}</span>
                    <img class="card-img-top" src="${pic}" alt="${title}" />
                    <span class="card-release-year">${releaseYear}</span>
                    <span class="card-rating">${rating}</span>
                </div>
            </button>`;
}

function buildTVCard(title, pic, releaseYear, rating, ident) {
    return `<button class="tv-card" onclick="cardEvent(${ident}, 'series.html')">
                <div class="card">
                    <span class="card-title">${title}</span>
                    <img class="card-img-top" src="${pic}" alt="${title}" />
                    <span class="card-release-year">${releaseYear}</span>
                    <span class="card-rating">${rating}</span>
                </div>
            </button>`;
}

/**
 * @param pic
 * @param name
 */
function buildPersonCard(pic, name, ident) {
    return `<button class="person-card" onclick="cardEvent(${ident}, 'person.html')">
                <div class="person-card">
                    <img class="person-photo" src="${pic}" alt="${name}"/>
                    <span class="person-name">${name}</span>
                </div>
            </button>`;
}

//////// FROM MOVIE /////////
// create an html element to display the basic info
function makeFilmCard(movie) {
    document.getElementById("poster-container").innerHTML = `<img src="${imgUrl}w300/${movie.poster_path}" alt="${movie.title} cover image" />`;
    document.getElementById("title-container").innerHTML = `<h3>${movie.title}</h3>`;
    document.getElementById("release-container").innerHTML = `<span id="release">${movie.release_date}</span>`;
    document.getElementById("summary-container").innerHTML = `<p>${movie.overview}</p>`;
    document.getElementById("runtime-container").innerHTML = `<span id="runtime">${movie.runtime}</span>`;
    document.getElementById("stars-container").innerHTML = `${movie.vote_average}`;
}

function makePersonCard(person) {
    // TODO: if a value is null, don't display it
    return `<div id="person-card">
           <img src="${imgUrl}w300/${person.profile_path}" alt="${person.name} profile photo" />
           <h3 id="person-name">${person.name}</h3>
           <span id="character">${person.character}</span>
       </div>`;
}

function makeGallary(movie) {
    const container = document.getElementById("snapshot-container");
    const backDropImgs = movie.backdrops;
    container.innerHTML = ``;
    for (let i = 0; i < backDropImgs.length; i++) {
        container.innerHTML += `<img src="${imgUrl}w300/${backDropImgs[i].file_path}" alt="" />`;
    }
}
//////////////////////
