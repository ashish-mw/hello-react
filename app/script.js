/*
<div class="movie-card">
  <h2>Matrix</h2>
  <p>Year: 1998</p>
  <p>Genre: Sci-fi</p>
</div>
*/
let movies = [
  {
    id: 100,
    title: "Matrix",
    year: 1998,
    genre: "sci-fi",
  },
  {
    id: 101,
    title: "Lion King",
    year: 2000,
    genre: "kids",
  },
];

function makeMovieListHTMLElements(data) {
  const wrapper = document.createElement("div");
  for (let m of data) {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "movie-card");
    movieDiv.setAttribute("id", "movie--" + m.id);

    const titleHeading = document.createElement("h2");
    titleHeading.innerText = m.title;
    movieDiv.appendChild(titleHeading);

    const movieYear = document.createElement("p");
    movieYear.innerText = m.year;
    movieDiv.appendChild(movieYear);

    const movieGenre = document.createElement("p");
    movieGenre.innerText = m.genre;
    movieDiv.appendChild(movieGenre);

    movieDiv.addEventListener("click", () => {
      // update ui
      const elId = `movie--${m.id}`;
      document.getElementById(elId).remove();

      // update state
      movies = movies.filter((movie) => movie.id !== m.id);
    });

    wrapper.appendChild(movieDiv);
  }
  return wrapper;
}

function appendToMovieContainer(html) {
  const container = document.getElementById("movie-list");
  container.appendChild(html);
}

function main() {
  const html = makeMovieListHTMLElements(movies);
  appendToMovieContainer(html);
}

main();
