import { useEffect, useState, useCallback } from "react";
import { filterFilms } from "../utils/filterFunction";

const useSearch = ({ movies, isSavedMoviesPage, getMovies }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [savedSearch, setSavedSearch] = useState({
    searchMovie: "",
    shortMovie: false,
    savedMovies: [],
  });

  const [searchStatus, setSearchStatus] = useState({
    statusMessage: "",
    isLoading: false,
    isFirstSearch: false,
  });

  const resetStatus = useCallback(() => {
    setSearchStatus({
      ...searchStatus,
      statusMessage: "",
      isLoading: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);   

  useEffect(() => {
    if ("allMovies" in localStorage && !isSavedMoviesPage) {
      //const data = JSON.parse(localStorage.getItem("allMovies"));
      const savedMovies = JSON.parse(localStorage.getItem("searchedMovies"));
      const savedSearch = JSON.parse(localStorage.getItem("search"));
      //filterFilms(savedSearch, data);
      //console.log(data)
      setSavedSearch({
        searchMovie: savedSearch.searchMovie,
        shortMovie: savedSearch.shortMovie,
        savedMovies: savedMovies,
      });
      setFilteredMovies(savedMovies);
    }
    if (!("allMovies" in localStorage) && !isSavedMoviesPage) {
      setSearchStatus({
        ...searchStatus,
        isFirstSearch: true,
        statusMessage: "Для поиска фильмов введите ключевое слово.",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSavedMoviesPage]);

useEffect(() => {
    if (isSavedMoviesPage && !searchStatus.isLoading) {
      setFilteredMovies(filterFilms(savedSearch, movies));
    }
  }, [isSavedMoviesPage, movies, savedSearch, searchStatus.isLoading]);
 
  useEffect(() => {
    if (isSavedMoviesPage) {
      setFilteredMovies(filterFilms(savedSearch, movies));
    }
  }, [isSavedMoviesPage, movies, savedSearch]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setSearchStatus((searchStatus) => ({
        ...searchStatus,
        statusMessage: "Ничего не найдено, попробуйте изменить параметры поиска.",
      }));
    } else {
      resetStatus();
    }
  }, [filteredMovies.length, resetStatus]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem("allMovies")) {
      setFilteredMovies(savedSearch.savedMovies);
    }
  }, [isSavedMoviesPage, savedSearch.savedMovies]);

  const setLoader = (boolean) => {
    setSearchStatus((data) => {
      return {
        ...data,
        isLoading: boolean,
        isFirstSearch: false,
      };
    });
  };

  const handleSubmitSearch = async (value) => {
    let allMovies;
    let data;
    if (searchStatus.isFirstSearch && !isSavedMoviesPage) {
      allMovies = await getMovies();
      data = filterFilms(value, allMovies);
    } else {
      data = filterFilms(value, movies);
    }

    if ("allMovies" in localStorage && !isSavedMoviesPage) {
      const films = JSON.parse(localStorage.getItem("allMovies"));
      data = filterFilms(value, films);      
    }

    resetStatus();
    setLoader(true);

    setTimeout(
      () => {
        if (data.length === 0) {
          setSearchStatus((data) => {
            return {
              ...data,
              statusMessage: "Ничего не найдено, попробуйте изменить параметры поиска.",
            };
          });
        }
        setFilteredMovies(data);
        setLoader(false);
      },
      searchStatus.isFirstSearch ? 500 : 1500
    );

    if (!isSavedMoviesPage && searchStatus.isFirstSearch) {
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
      localStorage.setItem("searchedMovies", JSON.stringify(data));
      localStorage.setItem(
        "search",
        JSON.stringify({
          shortMovie: value.shortMovie,
          searchMovie: value.searchMovie,
        })
      );
    } else if (!isSavedMoviesPage) {
      localStorage.setItem("searchedMovies", JSON.stringify(data));
      localStorage.setItem(
        "search",
        JSON.stringify({
          shortMovie: value.shortMovie,
          searchMovie: value.searchMovie,
        })
      );
    }
  };
  return {
    filteredMovies,
    savedSearch,
    searchStatus,
    handleSubmitSearch,
    setSearchStatus,
    resetStatus,
  };
};

export default useSearch;
