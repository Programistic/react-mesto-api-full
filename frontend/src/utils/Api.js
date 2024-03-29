const baseURL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;
const cardURL = `${baseURL}/cards`;
const userURL = `${baseURL}/users/me`;
const avatarURL = `${baseURL}/users/me/avatar`;

class Api {
  constructor(userURL, cardURL, avatarURL) {
    this._userURL = userURL;
    this._cardURL = cardURL;
    this._avatarURL = avatarURL;
    this._headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  _headersWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
  }

  getUserInfo() {
    return fetch(this._userURL, {
      headers: this._headersWithJwt(),
    })
      .then(this._getResponseData);
  }

  getCards() {
    return fetch(this._cardURL, {
      headers: this._headersWithJwt(),
    })
      .then(this._getResponseData);
  }

  setUserInfo(userName, userDescription) {
    return fetch(this._userURL, {
      method: 'PATCH',
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        name: userName,
        about: userDescription,
      }),
    })
      .then(this._getResponseData);
  }

  setAvatar(avatarData) {
    return fetch(this._avatarURL, {
      method: 'PATCH',
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        avatar: avatarData,
      }),
    })
      .then(this._getResponseData);
  }

  setCard(placeName, placeImage) {
    return fetch(this._cardURL, {
      method: 'POST',
      headers: this._headersWithJwt(),
      body: JSON.stringify({
        name: placeName,
        link: placeImage,
      }),
    })
      .then(this._getResponseData);
  }

  deleteCard(cardID) {
    return fetch(this._cardURL + `/${cardID}`, {
      method: 'DELETE',
      headers: this._headersWithJwt(),
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) {
      return fetch(this._cardURL + `/${cardID}/likes`, {
        method: 'PUT',
        headers: this._headersWithJwt(),
      })
        .then(this._getResponseData);
    } else {
        return fetch(this._cardURL + `/${cardID}/likes`, {
          method: 'DELETE',
          headers: this._headersWithJwt(),
        })
          .then(this._getResponseData);
      }
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  }
}

const api = new Api(userURL, cardURL, avatarURL);

export default api;
