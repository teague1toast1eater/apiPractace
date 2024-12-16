const searchInput = document.getElementById("search-text");
const movieButton = document.getElementById("movie-button");
const tvButton = document.getElementById("tv-button");
const personButton = document.getElementById("person-button");

// Add the listener to each anchor button
// these buttons will take the user to their respective page
searchEventListeners(movieButton);
searchEventListeners(tvButton);
searchEventListeners(personButton);

// promise object for getting the popular movies
moviePopular()
    .then(result => {
        const info = result.results; // the array of popular movie objects
        console.log("movies");
        console.log(info);
        const container = document.getElementById("movie-container");
        for (let i = 0; i < info.length; i++) { // creates each movie card
            const pic = imgUrl + "/w500" + info[i].poster_path;
            const card = (buildMovieCard(info[i].title, pic, info[i].release_date, info[i].vote_average, info[i].id));
            container.innerHTML += card;
        }
    })
    .catch(error => console.log(error));

// promise object for getting the popular people
peoplePopular()
    .then(result => {
        const info = result.results;
        console.log("people");
        console.log(info);
        const container = document.getElementById("people-container");
        for (let i = 0; i < info.length; i++) {
            const pic = imgUrl + "w500" + info[i].profile_path;
            container.innerHTML += buildPersonCard(pic, info[i].name, info[i].id);
        }
    })
    .catch(error => console.log(error));

tvPopular()
    .then(result => {
        const info = result.results;
        console.log("tv");
        console.log(info);
        const container = document.getElementById("tv-container");
        for (let i = 0; i < info.length; i++) {
            const title = info[i].name;
            const pic = imgUrl + "/w500" + info[i].poster_path;
            const releaseYear = info[i].first_air_date;
            const rating = info[i].vote_average;
            const card = (buildTVCard(title, pic, releaseYear, rating));
            container.innerHTML += card;
        }
    })
    .catch(error => console.log(error));
