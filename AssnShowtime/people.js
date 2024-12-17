// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const peopleName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");
const nextPageBtn = document.getElementById("next-btn");
const prevPageBtn = document.getElementById("prev-btn");
let pageNumber = 1;
let totalPages = 1;

function checkNbuild(result) {
    if (result.total_results === 0 || idInput.value === undefined) {
        peoplePopular(pageNumber)
            .then(result => {
                pageNumber = result.page;
                totalPages = result.total_pages;
                document.getElementById("current-page-num").innerText = `${pageNumber} / ${totalPages}`
                console.log("people result in peopleSearch if", result);
                const info = result.results;
                const container = document.getElementById("people-container");
                for (let i = 0; i < info.length; i++) {
                    const pic = imgUrl + "/w500" + info[i].profile_path;
                    const card = (buildPeopleCard(info[i].name, pic, info[i].id));
                    container.innerHTML += card;
                }
            })
    } else {
        const info = result.results;
        console.log("search info in peopleSearch else", info)
        const container = document.getElementById("people-container");
        pageNumber = result.page;
        totalPages = result.total_pages;
        document.getElementById("current-page-num").innerText = `${pageNumber} / ${totalPages}`
        for (let i = 0; i < info.length; i++) {
            const pic = imgUrl + "/w500" + info[i].profile_path;
            const card = (buildPeopleCard(info[i].name, pic, info[i].id));
            container.innerHTML += card;
        }
    }
    console.log("totalPages", totalPages);
}

// Make the call to get results from the search
peopleSearch(idInput.value)
    .then(result => {
        checkNbuild(result);
    })
    .catch(error => console.log(error));

nextPageBtn.addEventListener("click", () => {
    if (pageNumber < totalPages) {
        pageNumber++;
        console.log("page", pageNumber);
        const container = document.getElementById("people-container");
        container.innerHTML = ``; // resets the field to put in the next set of cards
        peopleSearch(idInput.value, pageNumber)
            .then((result) => {
                checkNbuild(result);
            })
    } else {
        console.log("This is your computer speaking, as indicated by the page count at the bottom of this page, you have made it to the last page of the people available to be viewed. Conduct another search or go touch grass, both would be preferable to trying to click the next button again.")
    }
})

prevPageBtn.addEventListener("click", () => {
    if (pageNumber > 1) {
        pageNumber--;
        console.log("page", pageNumber);
        const container = document.getElementById("people-container");
        container.innerHTML = ``; // resets the field to put in the next set of cards
        peopleSearch(idInput.value, pageNumber)
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
    const container = document.getElementById("people-container");
    container.innerHTML = ``;
    if (idInput.value === "") {
        console.log("Hmm, seems like there isn't anything to search for.");
        container.innerHTML = `<span id="search-error-msg">Hmm, it seems like there isn't anything to search for at the moment. Try typing the name of a person into the text box and then click the Find button again!</span>`
    }
    peopleSearch(idInput.value)
        .then((result) => {
            checkNbuild(result);
        })
});
