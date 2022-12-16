import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector , popupCallback) {
    super(popupSelector);
    this._popupCallback = popupCallback;
    this._form = this._element.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
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
