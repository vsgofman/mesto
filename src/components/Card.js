export default class Card {
  constructor({ data, userId }, cardTemplate, handleCardClick, handleDeleteClick, likeCardHandler) {
    this._title = data.name;
    this._photo = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCardHandler = likeCardHandler;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._likeButton = this._element.querySelector('#button__like');
    this._cardLike = this._element.querySelector('.card__amount');
    this._deleteButton = this._element.querySelector('#button__remove');
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._title;
    this._cardImage.src = this._photo;
    this._cardImage.alt = this._title;
    this._cardLike.textContent = this._likes.length;
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }

    const userWhoLikedCard = this._likes.find(user => user._id === this._userId)
    if (userWhoLikedCard) {
      this._likeCard()
    }

    return this._element;
  }
// откорректировать название функции удаления карточки
  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeCardHandler(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._photo);
    });
  }

  deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeButton.classList.toggle('card__button_active');
  }
}
