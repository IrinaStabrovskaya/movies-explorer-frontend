export const filterMovies = (data, request) => {
  const { searchMovie, shortMovie } = request;

  if (shortMovie) {
    return data.filter(
      (movie) =>
        (movie.nameRU
          .trim()
          .toLowerCase()
          .includes(searchMovie.trim().toLowerCase()) ||
          movie.nameEN
            .trim()
            .toLowerCase()
            .includes(searchMovie.trim().toLowerCase())) &&
        movie.duration <= 40
    );
  } else {
    return data.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchMovie.trim().toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchMovie.trim().toLowerCase())
    );
  }
};
