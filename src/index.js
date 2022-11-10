import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import './index.css';
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonPopupEditOpen = document.querySelector('.profile__button_edit');
const buttonPopupAddOpen = document.querySelector('.profile__button_add');

const formPopupEdit = popupEdit.querySelector('.popup__block_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');
const formAdd = popupAdd.querySelector('.popup__block_card_add');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainerSelector = '.cards';
// создание карточек
const initialCards = [
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
  },
  {
    name: 'Челябинск',
    link: 'https://static.ngs.ru/news/99/preview/84ef7324e374241f460a943ae263e53000d87c25_599_399_c.jpg'
  }
];

const createCard = (item) => {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    defaultCardList.addItem(createCard(cardItem));
  }
}, cardContainerSelector);
defaultCardList.renderItems();

function handleCardClick(name, link) {
  popupImageObject.open(name, link);
}
// попапы
const popupEditObject = new PopupWithForm({
  popupSelector: '.popup_edit',
  submitFormCallback: (userData, evt) => {
    evt.preventDefault();
    userInfoObject.setUserInfo(userData);
    popupEditObject.close();
  }
});

const popupAddObject = new PopupWithForm({
  popupSelector: '.popup_add',
  submitFormCallback: (cardData, evt) => {
    evt.preventDefault();
    const newCard = new Section({
      items: [ cardData ],
      renderer: (cardData) => {
        const cardObject = {};
        cardObject.name = cardData.input1;
        cardObject.link = cardData.input2;
        newCard.addItem(createCard(cardObject));
      }
    }, cardContainerSelector);
    newCard.renderItems();
    popupAddObject.close();
  }
});

const popupImageObject = new PopupWithImage('.popup_cover');
const userInfoObject = new UserInfo({});

const handlePopupEditOpen = () => {
  const data = userInfoObject.getUserInfo();
  profileNameInput.value = data.userName;
  profileJobInput.value = data.userJob;
  formPopupEditValidator.checkPopupBeforeOpen();
  popupEditObject.open();
};

const handlePopupAddOpen = () => {
  formPopupAddValidator.checkPopupBeforeOpen();
  popupAddObject.open();
};
// валидация форм
const enableValidationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formPopupEditValidator = new FormValidator(enableValidationObject, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(enableValidationObject, formAdd);
formPopupAddValidator.enableValidation();
// слушатели
popupEditObject.setEventListeners();
popupAddObject.setEventListeners();
popupImageObject.setEventListeners();
buttonPopupEditOpen.addEventListener('click', handlePopupEditOpen);
buttonPopupAddOpen.addEventListener('click', handlePopupAddOpen);
