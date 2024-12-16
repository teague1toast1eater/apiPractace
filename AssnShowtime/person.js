// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");

function cardEvent(id, href) {
    // this will send the user to the desired cards page
    window.location.href = `${href}?api_key=${apiKey}&id=${id}`;
}

function buildMovieCard(title, pic, releaseYear, rating, ident, character) {
    return `<button class="movie-card" onclick="cardEvent(${ident}, 'movie.html')">
                <div class="card">
                    <span class="card-title">${title}</span>
                    <img class="card-img-top" src="${pic}" alt="${title}" />
                    <span class="card-release-year">Released: ${releaseYear}</span>
                    <span class="card-rating">${rating} Stars</span>
                    <span class="card-character">Playing as: ${character}</span>
                </div>
            </button>`;
}

function makePersonCard(person) {
    // TODO: if a value is null, don't display it
    document.getElementById("profile-container").innerHTML = `<img src="${imgUrl}w300/${person.profile_path}" alt="${person.name} profile photo" />`;
    document.getElementById("name-container").innerHTML = `<h3 id="person-name">${person.name}</h3>`;
    document.getElementById("bday-container").innerHTML = `<span id="birthday">${person.birthday}</span>`;
    document.getElementById("birth-place-container").innerHTML = `<span id="birth-place">${person.place_of_birth}</span>`;
    document.getElementById("death-container").innerHTML = `<span id="death-info">${person.deathday}</span>`;
    document.getElementById("biography-container").innerHTML = `<p>${person.biography}</p>`;
}

function makePersonGallary(person) {
    const container = document.getElementById("snapshot-container");
    const photos = person.profiles;
    container.innerHTML = ``;
    for (let i = 0; i < photos.length; i++) {
        container.innerHTML += `<img src="${imgUrl}w300/${photos[i].file_path}" alt="" />`
    }
}

document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
})

// Show the images based on the id
findButton.addEventListener("click", e => {
    personImages(personId)
        .then(data => {
            console.log(data);
            makePersonGallary(data);
        })
});

// Make the call to get the info based on the id
const getCreds = `${personId}/combined_credits`;
personDetails(getCreds)
    .then(data => {
        console.log("w. gitC", data);
        const container = document.getElementById("cast-container");
        const cast = data.cast;
        container.innerHTML = ``;
        for (let i = 0; i < cast.length; i++) {
            const pic = imgUrl + "/w500" + cast[i].poster_path;
            const card = (buildMovieCard(cast[i].title, pic, cast[i].release_date, cast[i].vote_average, cast[i].id, cast[i].character));
            container.innerHTML += card;
        }
    })
personDetails(personId)
    .then(result => {
        console.log("person details", result);
        makePersonCard(result);
    })
    .catch(error => console.log(error));

// Make the call to get the info based on the id
personImages(personId)
    .then(result => console.log(result))
    .catch(error => console.log(error));