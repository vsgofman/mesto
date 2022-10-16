import Card from './Card.js';
import FormValidator from './FormValidator.js';
const popupEdit = document.querySelector('.popup_edit');
const buttonPopupEditOpen = document.querySelector('.profile__button_edit');
const formPopupEdit = popupEdit.querySelector('.popup__block_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');

const popupAdd = document.querySelector('.popup_add');
const buttonPopupAddOpen = document.querySelector('.profile__button_add');
const formAdd = popupAdd.querySelector('.popup__block_card_add');
const cardNameInput = popupAdd.querySelector('.popup__input_card_name');
const cardLinkInput = popupAdd.querySelector('.popup__input_card_link');

const popupImage = document.querySelector('.popup_cover');
const cardImage = document.querySelector('.popup__image');
const cardTitle = document.querySelector('.popup__caption');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const cardTemplate = document.querySelector('#card-template').content;
const cardsElement = document.querySelector('.cards');

const popupList = Array.from(document.querySelectorAll('.popup'));

const enableValidationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formPopupEditValidator = new FormValidator(enableValidationObject, formPopupEdit, popupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(enableValidationObject, formAdd, popupAdd);
formPopupAddValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openPopupEdit() {
  profileNameInput.value = nameProfile.textContent;
  profileJobInput.value = jobProfile.textContent;
  formPopupEditValidator.checkPopupBeforeOpen();
  openPopup(popupEdit);
}

function openPopupAdd() {
  popupAdd.querySelector('.popup__form').reset();
  formPopupAddValidator.checkPopupBeforeOpen();
  openPopup(popupAdd);
}

function closePopupButtonAndOverlay(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const createCard = (item) => {
  const card = new Card(item);
  console.log(card);
  const cardElement = card.generateCard();
  addCard(cardElement);
};

const addCard = (card) => {
  cardsElement.prepend(card);
};

function handleProfileFormEditSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = profileNameInput.value;
  jobProfile.textContent = profileJobInput.value;
  closePopup(popupEdit);
}

function handleProfileFormAddSubmit (evt) {
  evt.preventDefault();
  createCard({name: cardNameInput.value, link: cardLinkInput.value});
  closePopup(popupAdd);
  formAdd.reset();
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  createCard(item);
});

popupList.forEach (popup => {
  popup.addEventListener('click', closePopupButtonAndOverlay);
});

buttonPopupEditOpen.addEventListener('click', openPopupEdit);
buttonPopupAddOpen.addEventListener('click', openPopupAdd);

formPopupEdit.addEventListener('submit', handleProfileFormEditSubmit);
formAdd.addEventListener('submit', handleProfileFormAddSubmit);

export { cardTemplate, cardImage, cardTitle, openPopup, popupImage };
