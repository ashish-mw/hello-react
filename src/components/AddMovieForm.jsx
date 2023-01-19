import { useState, useMemo } from "react";

function AddMovieForm(props) {
  const { onMovieAdd } = props;

  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    genre: "",
  });

  const disableSubmit = useMemo(() => {
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
    <div>
      <h2>Add a new movie</h2>
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

        <input type="submit" value="Add movie" disabled={disableSubmit} />
      </form>
    </div>
  );
}

export default AddMovieForm;
