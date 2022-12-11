export default class UserInfo {
  constructor({ name, job }) {
    this._nameProfile = document.querySelector(name);
    this._jobProfile = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(name, job) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
  }
}
