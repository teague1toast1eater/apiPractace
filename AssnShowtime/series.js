// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const seriesId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");


// Show the images based on the id
findButton.addEventListener("click", () => {
    tvImages(seriesId)
        .then(result => {
            console.log(result)
        })
});

// Make the call to get the info based on the id
const cast = `${seriesId}/credits`;
tvDetails(cast)
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log(error));

tvDetails(seriesId)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Make the call to get the info based on the id
tvImages(seriesId)
    .then(result => console.log(result))
    .catch(error => console.log(error));
