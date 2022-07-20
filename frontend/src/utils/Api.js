const baseURL = `${window.location.protocol}//backend.mesto.students.nomoredomains.xyz`;
const cardURL = `${baseURL}/cards`;
const userURL = `${baseURL}/users/me`;
const avatarURL = `${baseURL}/users/me/avatar`;

class Api {
  constructor(userURL, cardURL, avatarURL, token) {
    this._userURL = userURL;
    this._cardURL = cardURL;
    this._avatarURL = avatarURL;
    this._token = token;
    this._headers = { authorization: this._token, 'Content-Type': 'application/json' }
  }

  getUserInfo() {
    return fetch(this._userURL, {
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  getCards() {
    return fetch(this._cardURL, {
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  setUserInfo(userName, userDescription) {
    return fetch(this._userURL, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userDescription,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  setAvatar(avatarData) {
    return fetch(this._avatarURL, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarData,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  setCard(placeName, placeImage) {
    return fetch(this._cardURL, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: placeImage,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardID) {
    return fetch(this._cardURL + `/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) {
      return fetch(this._cardURL + `/${cardID}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(res => this._getResponseData(res));
    } else {
        return fetch(this._cardURL + `/${cardID}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
          .then(res => this._getResponseData(res));
      }
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  }
}

const api = new Api(userURL, cardURL, avatarURL);

export default api;
