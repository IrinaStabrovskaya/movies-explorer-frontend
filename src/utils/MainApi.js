//export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "https://api.my-movies.nomoreparties.co";


// ф-ция регистрации
export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,  
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  });}

// ф-ция авторизации
export const authorization = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  });}

// запрос данных пользователя
export const getInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};

// обновление данных пользователя на сервере
export const setInfo = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
         "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
}

// получение уже сохраненных фильмов
export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};

// сохранение фильма в коллекцию пользователя при помощи постановки лайка
export const saveMovie = ({ ...data }) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
        body:  JSON.stringify({
            ...data
        }),   
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};

//удаление фильма из коллекции пользователя по id(фильма)
export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            "content-type": "application/json",
        },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};