import Popup from './Popup.js';
export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._element.querySelector('.popup__form');
  }

  setPopupCallback(popupCallback) {
    this._popupCallback = popupCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupCallback();
    });
  }
}
