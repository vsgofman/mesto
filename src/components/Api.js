export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  getProfile() {
    fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(console.log)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      });
  }

  deleteCard() {

  }

  addCard() {

  }
}
