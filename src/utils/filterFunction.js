//ф-ция фильтрации фильмов

const filterSearсhMovie = (value, moviesList) => {
  return moviesList.filter(
    (movie) =>
      movie.nameRU
        .trim()
        .toLowerCase()
        .includes(value.searchMovie.trim().toLowerCase()) ||
      movie.nameEN
        .trim()
        .toLowerCase()
        .includes(value.searchMovie.trim().toLowerCase())
  );
};

const filterShortMovie = (moviesList) => {
  return moviesList.filter((movie) => movie.duration <= 40);
};

export const filterFilms = (value, moviesList) => {
  if (value.shortMovie) {
    return filterShortMovie(filterSearсhMovie(value, moviesList));
  } else {
    return filterSearсhMovie(value, moviesList);
  }
};
