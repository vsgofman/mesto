import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector , submitFormCallback }) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._element.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValueObject = {};
    this._inputList.forEach((input, i) => {
      inputValueObject[`input${i+1}`] = input.value;
    });
    return inputValueObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submitFormCallback(this._getInputValues(), evt);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
