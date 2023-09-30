const API_FILMS_URL = 'https://api.nomoreparties.co';
const API_FILMS_PATH = '/beatfilm-movies';

export const getMovies = () => {
    return fetch(`${API_FILMS_URL}${API_FILMS_PATH}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",            
    },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    })
}