export default class Card {
  constructor({ name, link }, cardTemplate, handleCardClick) {
    this._title = name;
    this._photo = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
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
      this._handleCardClick(this._title, this._photo);
    });
  }

  _deleteCardHandler() {
    this._element.remove();
  }

  _likeCardHandler() {
    this._likeButton.classList.toggle('card__button_active');
  }
}
