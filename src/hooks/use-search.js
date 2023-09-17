import { useEffect, useState } from "react";
//функция фильтра фильмов по запросу и длине
import { filterMovies } from "../utils/filterFunction";

//movies -фильмы, которые приходят  со стороннего апи
//страница фильмов  основная, на кеоторой рендерятся отфильтрованные фильмы
//страница сохраненных фильмов на которой рендерятся сохраненные фильмы

export function useSearch({ movies, isMoviesPage, isSavedMoviesPage }) {
  //состояние загруженности и изменение состояния загруженности, изначально не загруженно
  const [isLoading, setLoading] = useState(false);
  // все отфильтрованные фильмы
  const [isFilterMovies, setIsFilterMovies] = useState([]);
//информациооный текст
  const [text, setText] = useState(
    "Для просмотра фильмов введите название фильма в строку поиска."
  );
  //последний запрос, изначальное состояние: строка запроса пустая, короткие не выбрваны, массива фильмов пустой
  const [ lastSearch, setLastSearch] = useState({
    requestString: "",
    shortMovie: false,
    data: [],
  });
//
  useEffect(() => {
    if (isSavedMoviesPage) {
      setIsFilterMovies(movies);
    }
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if ("search" in localStorage) {
      setLastSearch(JSON.parse(localStorage.getItem("search")));
    }
  }, [isMoviesPage]);

  useEffect(() => {
    if (isMoviesPage) {
      setIsFilterMovies(lastSearch.data);
    }
  }, [isMoviesPage, lastSearch]);

  const handleSearch = (searchRequest) => {
    setLoading(true);

    const data = filterMovies(movies, searchRequest);
    setIsFilterMovies(data);

    if (!searchRequest.searchMovie) {
      setText("Введите название фильма в строку поиска.");
      setIsFilterMovies([]);
    }

    if (data.length === 0) {
      setText("Ничего не найдено. Попробуйте поменять параметры поиска.");
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (isMoviesPage) {
      localStorage.setItem(
        "search",
        JSON.stringify({
          searchMovie: searchRequest.searchMovie,
          shortMovie: searchRequest.shortMovie,
          data: data,
        })
      );
    }
  };

  return { isFilterMovies, handleSearch, isLoading, text };
}
