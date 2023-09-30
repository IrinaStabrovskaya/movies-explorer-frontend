import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { QueryContext } from "../../contexts/QueryContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import * as movieApi from "../../utils/MoviesApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem("token") ? true : false,
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoadingPage] = useState(false);
  const [, setIsLoggedIn] = useState(null);
  const [errorRegister, setErrorRegister] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [query, setQuery] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (currentUser.isLoggedIn &&
      location.pathname === "/signin" &&
      navigate("/movies", { replace: true })) ||
      (currentUser.isLoggedIn &&
        location.pathname === "/signup" &&
        navigate("/movies", { replace: true }));
  }, [location.pathname, navigate, currentUser.isLoggedIn]);

  // получение фильмов со стороннего API
  const getMovies = async () => {
    try {
      const data = await movieApi.getMovies();
      setMovies(data);
      return data;
    } catch (err) {
      handleError(err);
    }
  };

  //получение сохраненных фильмов
  const getSavedMovies = useCallback(() => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        handleError(err);
        console.log(err);
      });
  }, []);

  //проверка токена и получение данных пользователя
  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getInfo()
        .then((data) => {
          if (data) {
            setCurrentUser({
              isLoggedIn: true,
              name: data.name,
              email: data.email,
            });
            navigate(location.pathname);
          }
        })
        .catch(() => {
          handleError("Что-то пошло не так. Авторизуйтесь заново.");
          localStorage.clear();
          setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
      getSavedMovies();
      if ("movies" in localStorage) {
        setMovies(JSON.parse(localStorage.getItem("movies")));
      }
    }
  }, [checkToken, currentUser.isLoggedIn, getSavedMovies]);

  const closeInfoTooltipPopup = () => {
    setIsInfoTooltipOpen(false);
  };

  const handleError = (err) => {
    if (err.message === "Validation failed") {
      setQuery((prev) => ({
        ...prev,
        isError: true,
        errMessage: "Не верно введённые данные",
      }));
    }
    setQuery((prev) => ({ ...prev, isError: true, errMessage: err }));
  };

  // обновление данных пользователя
  const hendlerUserData = ({ name, email }) => {
    setQuery((prev) => ({ ...prev, isLoading: true }));
    mainApi
      .setInfo({ name, email })
      .then((userData) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          name: userData.name,
          email: userData.email,
        }));

        setQuery((prev) => ({
          ...prev,
          goodMessage: "Данные успешно обновились",
        }));
        setTimeout(() => {
          setQuery((prev) => ({
            ...prev,
            goodMessage: "",
          }));
        }, 2000);
      })
      .catch((err) => {
        handleError(err);
        setTimeout(() => {
          setQuery((prev) => ({ ...prev, isError: true, errMessage: "" }));
        }, 2000);
      })
      .finally(() => {
        setQuery((prev) => ({ ...prev, isLoading: false }));
      });
  };

  // сохранение нового фильма в коллекцию
  const handleLikeMovie = (movie) => {
    const isLiked = savedMovies.some((item) => item.movieId === movie.movieId);

    if (!isLiked) {
      setQuery((prev) => ({ ...prev, isLoading: true }));
      return mainApi
        .saveMovie(movie)
        .then((newSavedMovie) => {
          setSavedMovies([newSavedMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const id = savedMovies.find((item) => item.movieId === movie.movieId)._id;
      return mainApi
        .deleteMovie(id)
        .then(() => {
          setSavedMovies((movies) =>
            movies.filter((movie) => movie._id !== id)
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setQuery((prev) => ({ ...prev, isLoading: false }));
        });
    }
  };

  // удаление фильма из коллекции сохраненных фильмов
  const handleDeleteMovie = (movie) => {
    setQuery((prev) => ({ ...prev, isLoading: true }));

    return mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setQuery((prev) => ({ ...prev, isLoading: false }));
      });
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.isLoggedIn]);

  // регистрация
  const handleRegister = (name, email, password) => {
    return mainApi
      .register({ name, email, password })
      .then(() => {
        setErrorRegister(false);
        setIsInfoTooltipOpen(true);
        handleAuthorization(email, password);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        handleError(err);
        setIsInfoTooltipOpen(true);
      });
  };

  // авторизация
  const handleAuthorization = (email, password) => {
    return mainApi
      .authorization({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setCurrentUser({
          isLoggedIn: true,
        });
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        handleError(err);
        setIsLoggedIn(false);
        setErrorRegister(true);
        setIsInfoTooltipOpen(true);
      });
  };

  const hendleLogout = () => {
    localStorage.clear();
    setCurrentUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    navigate("/", { replace: true });
  };

  return isLoadingPage ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <QueryContext.Provider value={query}>
        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/signin"
            element={<Login onAuthorization={handleAuthorization} />}
          />
          <Route
            path="/"
            element={<Main isLoggedIn={currentUser.isLoggedIn} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={currentUser.isLoggedIn}
                movies={movies}
                savedMovies={savedMovies}
                onError={handleError}
                onSaveMovie={handleLikeMovie}
                onDeleteMovie={handleDeleteMovie}
                getMovies={getMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={currentUser.isLoggedIn}
                movies={savedMovies}
                savedMovies={savedMovies}
                onError={handleError}
                onDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={currentUser.isLoggedIn}
                onSubmit={hendlerUserData}
                onLogout={hendleLogout}
              />
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltipPopup}
          errorRegister={errorRegister}
        />
      </QueryContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
