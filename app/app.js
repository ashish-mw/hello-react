const MovieList = (props) => {
  const { movies, onMovieDelete } = props;

  return (
    <div>
      {movies.map((m) => {
        return (
          <div className="movie-card" key={m.id}>
            <h2>{m.title}</h2>
            <p>Year: {m.year}</p>
            <p>Genre: {m.genre}</p>
            <button onClick={() => onMovieDelete(m.id)}>Delete movie</button>
          </div>
        );
      })}
    </div>
  );
};

const AddMovieForm = (props) => {
  const { onMovieAdd } = props;

  const [newMovie, setNewMovie] = React.useState({
    title: "",
    year: "",
    genre: "",
  });

  const disableSubmit = React.useMemo(() => {
    let isDisabled = true;

    if (newMovie.title.length > 2 && newMovie.year && newMovie.genre) {
      isDisabled = false;
    }

    return isDisabled;
  }, [newMovie.title, newMovie.year, newMovie.genre]);

  const handleChange = ({ e, fieldType }) => {
    setNewMovie((prev) => {
      const update = { ...prev };
      update[fieldType] = e.target.value;
      return update;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onMovieAdd(newMovie);
    setNewMovie({
      title: "",
      year: "",
      genre: "",
    });
  };

  return (
    <div className="add-movie-form">
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={newMovie.title}
            onChange={(e) => handleChange({ e, fieldType: "title" })}
          />
        </label>
        <label>
          Year
          <input
            type="text"
            value={newMovie.year}
            onChange={(e) => handleChange({ e, fieldType: "year" })}
          />
        </label>
        <label>
          Genre
          <input
            type="text"
            value={newMovie.genre}
            onChange={(e) => handleChange({ e, fieldType: "genre" })}
          />
        </label>

        <input type="submit" value="create movie" disabled={disableSubmit} />
      </form>
    </div>
  );
};

const App = function () {
  // jsx
  // return <p>Hello world</p>;
  // return React.createElement("p", null, "Hello world");

  const [movies, setMovies] = React.useState([
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
  ]);

  React.useEffect(() => {
    const moviesFromStorage = localStorage.getItem("allMovies");
    const json = JSON.parse(moviesFromStorage);
    setMovies(json);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }, [movies]);

  const handleDelete = (movieId) => {
    const newMovieList = movies.filter((m) => m.id !== movieId);
    setMovies(newMovieList);
  };

  const handleAdd = (movieInfo) => {
    const moviePayload = {
      ...movieInfo,
      id: new Date().getTime(),
    };
    setMovies((prev) => {
      const update = [...prev];
      update.push(moviePayload);
      return update;
    });
  };

  return (
    <div>
      <AddMovieForm onMovieAdd={handleAdd} />
      <MovieList movies={movies} onMovieDelete={handleDelete} />
    </div>
  );
};

const el = document.getElementById("root");
ReactDOM.render(<App />, el);
