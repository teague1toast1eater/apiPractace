// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const tvName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");

function checkNbuild(result) {
    const container = document.getElementById("tv-container");
    if (result.total_results === 0 || idInput.value === undefined) {
        moviePopular(pageNumber)
            .then(result => {
                pageNumber = result.page;
                totalPages = result.total_pages;
                document.getElementById("current-page-num").innerHTML = `${pageNumber} / ${totalPages}`
                console.log("popular tv", result)
                console.log("totalPages", totalPages)
                const info = result.results;
                for (let i = 0; i < info.length; i++) {
                    const pic = imgUrl + "/w500" + info[i].poster_path;
                    const card = (buildTVCard(info[i].title, pic, info[i].release_date, info[i].vote_average, info[i].id));
                    container.innerHTML += card;
                }
            })
    } else {
        console.log("tv search", result)
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

// Make the call to get results from the search
tvSearch(tvName)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Navigate with a query String
findButton.addEventListener("click", e => {
    e.preventDefault();
    console.log(`${e.target.href}?id=${idInput.value}`);
    window.location.href = `${e.target.href}?id=${idInput.value}`;
});
