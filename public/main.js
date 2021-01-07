const movieList = document.querySelector(".movie-list");
const addMovieForm = document.querySelector(".add-movie-form");
const movieValue = document.getElementById("movie-value");
const imgValue = document.getElementById("urlImage-value");
const dirValue = document.getElementById("director-value");
const sinpValue = document.getElementById("sinopsis-value");
const clasValue = document.getElementById("clasification-value");
const btnSubmit = document.querySelector(".btnS");

let output = "";

const renderMovies = (movies) => {
    movies.forEach((movie) => {
        output += `
            <div class="card mt-4 col-md-6">
              <div class="card-body" data-id=${movie.id}>
                <img src="${movie.imagen}" class="card-img-top mt-2" alt="Image Movie" />
                <h5 class="card-title">${movie.nombre}</h5>
                <p class="card-text1">${movie.clasificacion}</p>
                <p class="card-text2">${movie.director}</p>
                <p class="card-text3">${movie.sinopsis}</p>
                <a href="#" class="btn btn-secondary bg-dark" id="editMovie">Edit</a>
                <a href="#" class="btn btn-secondary bg-dark" id="delMovie">Delete</a>
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

movieList.addEventListener("click", (e) => {
    let delBtnIsPress = e.target.id == "delMovie";
    let editBtnIsPress = e.target.id == "editMovie";

    let id = e.target.parentElement.dataset.id;

    // Delete - Remove the existing movie
    // Method: DELETE
    if (delBtnIsPress) {
        fetch(`${url}/${id}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then(() => location.reload());
    }

    if (editBtnIsPress) {
        const parent = e.target.parentElement;
        let movieContent = parent.querySelector(".card-title").textContent;
        let imgContent = parent.querySelector(".card-img-top").src;
        let dirContent = parent.querySelector(".card-text2").textContent;
        let sinpContent = parent.querySelector(".card-text3").textContent;
        let clasContent = parent.querySelector(".card-text1").textContent;

        movieValue.value = movieContent;
        imgValue.value = imgContent;
        dirValue.value = dirContent;
        sinpValue.value = sinpContent;
        clasValue.value = clasContent;
    }

    //Update -update the existing movie
    // Method: PATCH
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: movieValue.value,
                    imagen: imgValue.value,
                    director: dirValue.value,
                    sinopsis: sinpValue.value,
                    clasificacion: clasValue.value,
                }),
            })
            .then((res) => res.json())
            .then(() => location.reload());
    });
});

// Create - Insert new movie
//Method: POST
addMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: movieValue.value,
                imagen: imgValue.value,
                director: dirValue.value,
                sinopsis: sinpValue.value,
                clasificacion: clasValue.value,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            const dataArr = [];
            dataArr.push(data);
            renderMovies(dataArr);
        });
    movieValue.value = "";
    imgValue.value = "";
    dirValue.value = "";
    sinpValue.value = "";
    clasValue.value = "";
});