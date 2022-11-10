export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this._nameProfile = document.querySelector('.profile__name');
    this._jobProfile = document.querySelector('.profile__position');
  }

  getUserInfo() {
    const userData = {};
    userData.userName = this._nameProfile.textContent;
    userData.userJob = this._jobProfile.textContent;
    return userData;
  }

  setUserInfo(userData) {
    this._nameProfile.textContent = userData.input1;
    this._jobProfile.textContent = userData.input2;
  }
}
