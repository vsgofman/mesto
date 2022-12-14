export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._nameProfile = document.querySelector(name);
    this._jobProfile = document.querySelector(job);
    this._avatarProfile = document.querySelector(avatar);
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

  setUserAvatar(avatar) {
    this._avatarProfile.src = avatar;
  }
}
