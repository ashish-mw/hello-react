function MovieList(props) {
  const { movies, onMovieDelete } = props;

  return (
    <div>
      {movies.map((m) => {
        return (
          <article key={m.id}>
            <h2>{m.title}</h2>
            <p>Year: {m.year}</p>
            <p>Genre: {m.genre}</p>
            <button onClick={() => onMovieDelete(m.id)}>Delete movie</button>
          </article>
        );
      })}
    </div>
  );
}

export default MovieList;
