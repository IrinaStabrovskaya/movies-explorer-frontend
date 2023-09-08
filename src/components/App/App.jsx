import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";

import { useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  // Navigate,
  // useNavigate,
  // useLocation,
} from "react-router-dom";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
