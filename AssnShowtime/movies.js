// TODO: document.getElementById("current-page-num").innerText = `${pageNumber} / ${result.total_pages}`
// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");
const nextPageBtn = document.getElementById("next-btn");
const prevPageBtn = document.getElementById("prev-btn");
let pageNumber = 1;
let totalPages = 1;

function checkNbuild(result) {
    const container = document.getElementById("movie-container");
    if (result.total_results === 0 || idInput.value === undefined) {
        moviePopular(pageNumber)
            .then(result => {
                pageNumber = result.page;
                totalPages = result.total_pages;
                document.getElementById("current-page-num").innerHTML = `${pageNumber} / ${totalPages}`
                console.log("popular movies", result)
                console.log("totalPages", totalPages)
                const info = result.results;
                for (let i = 0; i < info.length; i++) {
                    const pic = imgUrl + "/w500" + info[i].poster_path;
                    const card = (buildMovieCard(info[i].title, pic, info[i].release_date, info[i].vote_average, info[i].id));
                    container.innerHTML += card;
                }
            })
    } else {
        console.log("movie search", result)
        pageNumber = result.page;
        totalPages = result.total_pages;
        console.log("total pages", totalPages);
        document.getElementById("current-page-num").innerHTML = `${pageNumber} / ${totalPages}`
        const info = result.results;
        pageNumber = result.page;
        for (let i = 0; i < info.length; i++) {
            const pic = imgUrl + "/w500" + info[i].poster_path;
            const card = (buildMovieCard(info[i].title, pic, info[i].release_date, info[i].vote_average, info[i].id));
            container.innerHTML += card;
        }
    }
}
console.log(pageNumber);
// Make the call to get results from the search
movieSearch(idInput.value)
    .then(result => {
        checkNbuild(result);
    })
    .catch(error => console.log(error));

nextPageBtn.addEventListener("click", () => {
    if (pageNumber < totalPages) {
        pageNumber++;
        console.log("page", pageNumber);
        const container = document.getElementById("movie-container");
        container.innerHTML = ``; // resets the field to put in the next set of cards
        movieSearch(idInput.value, pageNumber)
            .then(result => {
                checkNbuild(result);
            })
    } else {
        console.log("This is your computer speaking, as indicated by the page count at the bottom of this page, you have made it to the last page of the movies available to be viewed. Conduct another search or go touch grass, both would be preferable to trying to click the next button again.")
    }
})

prevPageBtn.addEventListener("click", () => {
    if (pageNumber > 1) {
        pageNumber--;
        console.log("page", pageNumber);
        const container = document.getElementById("movie-container");
        container.innerHTML = ``; // resets the field to put in the next set of cards
        movieSearch(idInput.value, pageNumber)
            .then((result) => {
                checkNbuild(result);
            })
    } else {
        console.log("This is your computer speaking, you are already on the first page, there is not a page 0, silly human.")
    }
})

// Navigate with a query String
findButton.addEventListener("click", e => {
    e.preventDefault();
    console.log(`${e.target.href}?id=${idInput.value}`);
    const container = document.getElementById("movie-container");
    container.innerHTML = ``;
    if (idInput.value === "") {
        console.log("Hmm, seems like there isn't anything to search for.");
        container.innerHTML = `<span id="search-error-msg">Hmm, it seems like there isn't anything to search for at the moment. Try typing the name of a movie into the text box and then click the Find button again!</span>`
    }
    pageNumber = 1;
    movieSearch(idInput.value)
        .then((result) => {
            checkNbuild(result);
        })
});

