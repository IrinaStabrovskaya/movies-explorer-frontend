import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { QueryContext } from "../../contexts/QueryContext";
import {
  Routes,
  Route,  
  useNavigate,
  useLocation,
} from "react-router-dom";
import { API_FILMS_URL } from "../../utils/constants/data";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import * as movieApi from "../../utils/MoviesApi";
//import { ScreenContext, windowWidth } from "../../contexts/ScreenContext";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem("token") ? true : false,
  });
  //const [screen, setScreen] = useState("desktop");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setIsLoading(true);
      movieApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch(() => {
          setErrorRegister(true);
          setIsInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
          //  setRequest(false);
        });
    }
  }, [currentUser.isLoggedIn]);

  // получение всех уже сохраненных пользователем фильмов
  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch(() => {
          setErrorRegister(true);
          setIsInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser.isLoggedIn]);


  const closeInfoTooltipPopup = () => {
    setIsInfoTooltipOpen(false);
  };

  const handleError = (err) => {
    setQuery((prev) => ({...prev, isError: true, errMessage: err}))
  };

  

  // обновление данных пользователя
  const hendlerUserData = ({ name, email }) => {
    
    setIsLoading(true);
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
      })
        .catch(() => {
          handleError();
        })
        .finally(() => {
          setQuery((prev) => ({
            ...prev,
            goodMessage: "",
          }));
         
        });     

  }

  // сохранение нового фильма в коллекцию
  const handleSaveMovie = (movie) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: API_FILMS_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${API_FILMS_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    setIsLoading(true);
    return mainApi
      .saveMovie(movieData)
      .then((newSavedMovie) => {
        console.log(newSavedMovie);
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // удаление фильма из коллекции сохраненных фильмов
  const handleDeleteMovie = (movieId) => {
    setIsLoading(true);
    return mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((movie) => movie._id !== movieId)
        );
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //проверка токена и получение данных пользователя
  const checkToken = () => {
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
        .catch((err) => {
          handleError("Что-то пошло не так. Авторизуйтесь заново.")
          localStorage.clear();
          setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        });
    }
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
      .then((data) => {
        setErrorRegister(false);        
        setIsInfoTooltipOpen(true);
        handleAuthorization(email, password)
        console.log(email, password);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setErrorRegister(true);
        setIsInfoTooltipOpen(true);
        handleError(err);
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
          isLoggedIn: true
        })
        navigate("/movies", { replace: true })
      })      
      .catch(() => {
        setIsLoggedIn(false);
        setErrorRegister(true);
        setIsInfoTooltipOpen(true);
      });
  };

  const hendleLogout = () => {
    localStorage.clear();
    setCurrentUser((prev) => ({
      ...prev, isLoggedIn:false
    }));
    navigate("/", { replace: true });
  };    

  return (
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
        <Route path="/" element={<Main isLoggedIn={currentUser.isLoggedIn} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              isLoggedIn={currentUser.isLoggedIn}
              isLoading={isLoading}
              movies={movies}
              savedMovies={savedMovies}
              onError={handleError}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
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
        <Route path="/profile" element={<ProtectedRoute 
        element={Profile}
        isLoggedIn={currentUser.isLoggedIn}        
        
        onSubmit={hendlerUserData}
        onLogout={hendleLogout}

         />} />
        <Route path="*" element={<ProtectedRoute element={PageNotFound} />} />
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
