export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this._nameProfile = document.querySelector(this._name);
    this._jobProfile = document.querySelector(this._job);
  }

  getUserInfo() {
    const userData = {};
    userData.userName = this._nameProfile.textContent;
    userData.userJob = this._jobProfile.textContent;
    return userData;
  }

  setUserInfo(userData) {
    this._nameProfile.textContent = userData['name-input'];
    this._jobProfile.textContent = userData['job-input'];
  }
}
