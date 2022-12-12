import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector , popupCallback) {
    super(popupSelector);
    this._popupCallback = popupCallback;
    this._form = this._element.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    Array.from(this._form.querySelectorAll('.popup__input')).forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
