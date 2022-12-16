export default class FormValidator {
  constructor(options, formElement) {
    this._validationObject = options;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationObject.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationObject.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validationObject.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validationObject.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
    });
  });
  }

  enableValidation() {
    this._setEventListeners();
  }

  checkPopupBeforeOpen() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
