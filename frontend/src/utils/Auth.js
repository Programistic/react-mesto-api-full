export const BASE_URL = `${window.location.protocol}//backend.mesto.students.nomoredomains.xyz`;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponseData);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponseData);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(getResponseData);
};

export const getResponseData = (res) => {
  return res.ok ? res.json() : res.json().then((res) => {
    Promise.reject(`Ошибка: ${res.error === undefined ? res.message : res.error}`);
  });
};
