import { cardTemplate, cardImage, cardTitle, openPopup, popupImage } from './index.js';
export default class Card {
  constructor(data) {
    this._title = data.name;
    this._photo = data.link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._likeButton = this._element.querySelector('#button__like');
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._title;
    this._cardImage.src = this._photo;
    this._cardImage.alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('#button__remove').addEventListener('click', () => {
      this._deleteCardHandler();
    });

    this._likeButton.addEventListener('click', () => {
      this._likeCardHandler();
    });

    this._cardImage.addEventListener('click', () => {
      this._openCardImage();
    });
  }

  _deleteCardHandler() {
    this._element.remove();
  }

  _likeCardHandler() {
    this._likeButton.classList.toggle('card__button_active');
  }

  _openCardImage() {
    cardImage.src = this._photo;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;
    openPopup(popupImage);
  }
}
