
const imgURL ="https://image.tmdb.org/t/p/original";
const API_KEY="177dd684f60f28a86707fe911c2445ec";
const url="https://api.themoviedb.org/3/search/movie?query=";

window.addEventListener("load", () => fetchmovie("Murder"));

window.addEventListener


/*--- function to ftech each movie according the query argument ---*/
async function fetchmovie(query){

    const res = await fetch(`${url}${query}&api_key=${API_KEY}`);
    const data = await res.json();
    bindData(data.results);

}

/* This function binds our data and creates copies of templates */
function bindData(results){

    const cardsContainer =document.getElementById("movie-container");               //container of movie cards
    const movieCardTemplate = document.getElementById("template-movie-card");       //template to copy

    cardsContainer.innerHTML="";
    

    results.forEach((results) => {
        if(!results.backdrop_path) return;

        const cardClone = movieCardTemplate.content.cloneNode(true);

        //deep cloning true for all data to be cloned
        fillDataInCard(cardClone,results);
        cardsContainer.appendChild(cardClone);

    });
}



function fillDataInCard(element , data){

    const movieImg = element.querySelector('.movie-img');
    const movieTitle = element.querySelector('.movie-title');
    const info = element.querySelector('.inf')
    movieImg.src=`${imgURL}${data.poster_path}`;
    info.innerHTML=`${data.overview}`;
    movieTitle.innerHTML=`<p class="naam">${data.title}</p>`;
}

/*--- for onclick div ---*/
async function msg(element) {

    const name = await element.querySelector('.naam').innerText;
    const inf = await element.querySelector('.inf').innerHTML;

    document.querySelector('.ttl').innerText = `${name}`;
    document.querySelector('.info').innerText = `${inf}`;
    

}


/*--- js for search button hereafter ---*/

const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',() =>{

    let searchtxt = document.getElementById('search-query').value;
    if(!searchtxt) return;

    fetchmovie(searchtxt);

});


const node = document.getElementById("search-query");
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let searchtxt = document.getElementById('search-query').value;
        if(!searchtxt) return;

        fetchmovie(searchtxt);
    }
});