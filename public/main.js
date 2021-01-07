const movieList = document.querySelector(".movie-list");
const addMovieForm = document.querySelector(".add-movie-form");

let output = "";

const renderMovies = (movies) => {
    movies.forEach((movie) => {
        output += `
            <div class="card mt-4 col-md-6">
                <img src="${movie.imagen}" class="card-img-top mt-2" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Title: ${movie.nombre}</h5>
                    <p class="card-text">Director: ${movie.director}</p>
                    <p class="card-text">Sinopsis: ${movie.sinopsis}</p>
                    <a href="#" class="btn btn-secondary bg-dark">Edit</a>
                    <a href="#" class="btn btn-secondary bg-dark">Delete</a>
                </div>
            </div>
            `;
    });
    movieList.innerHTML = output;
};

const url = "http://localhost:3000/peliculas";

// Get - Read the movies
// Method: GET

fetch(url)
    .then((res) => res.json())
    .then((data) => renderMovies(data));

// Create - Insert new movie
//Method: POST
addMovieForm.addEventListener("submit", () => {
    console.log("form submited");
});