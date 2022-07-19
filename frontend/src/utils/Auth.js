export const BASE_URL = `${window.location.protocol}//backend.mesto.students.nomoredomains.xyz`;

export const register = (email, password) => {
  return fetch('http://backend.mesto.students.nomoredomains.xyz/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponseData);
};

export const authorize = (email, password) => {
  return fetch('http://backend.mesto.students.nomoredomains.xyz/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponseData);
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(getResponseData);
};

export const getResponseData = (res) => {
  return res.ok ? res.json() : res.json().then((res) => {
    Promise.reject(`Ошибка: ${res.error === undefined ? res.message : res.error}`);
  });
};
