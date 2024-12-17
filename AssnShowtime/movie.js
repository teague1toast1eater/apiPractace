// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

// should i reconfigure this file to use the idInput and slider?
const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");
const slider = document.getElementById("carousel-slider");

// Show images based on the id
findButton.addEventListener("click", () => {
    movieImages(movieId)
        .then(result => {
            makeGallary(result)
        });
});

// Make a call to get the credit info based on the id
const cast = `${movieId}/credits`;
// get the cast for the selected movie
movieDetails(cast)
    .then(result => {
        console.log("creds", result);
        const container = document.getElementById("person-div");
        const cast = result.cast;
        console.log("cast", cast);
        for (let i = 0; i < cast.length; i++) {
            container.innerHTML += makePersonCard(cast[i]);
        }
    })

// this grabs different info from the call above
movieDetails(movieId)
    .then(result => {
        makeFilmCard(result);
    })
    .catch(error => console.log(error));

// Make a call to get info based on the id
movieImages(movieId)
    .then(result => {
        console.log("movie image result");
        console.log(result);
        // makeImageCarousel(result.posters); // Leaving this here as a hint for making a scrolling gallery
    })
    .catch(error => console.log(error));
