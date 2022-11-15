import { initialCards } from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonPopupEditOpen = document.querySelector('.profile__button_edit');
const buttonPopupAddOpen = document.querySelector('.profile__button_add');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const formPopupEdit = popupEdit.querySelector('.popup__block_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');
const formAdd = popupAdd.querySelector('.popup__block_card_add');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainerSelector = '.cards';

// создание карточек
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
  popupImage.open(name, link);
}
// попапы
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit',
  submitFormCallback: (userData, evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add',
  submitFormCallback: (cardData, evt) => {
    evt.preventDefault();
    const newCard = new Section({
      items: [ cardData ],
      renderer: (cardData) => {
        const card = {};
        card.name = cardData['card-name'];
        card.link = cardData['card-link'];
        newCard.addItem(createCard(card));
      }
    }, cardContainerSelector);
    newCard.renderItems();
    popupAddCard.close();
  }
});

const popupImage = new PopupWithImage('.popup_cover');
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__position' });

const handlePopupEditOpen = () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.userName;
  profileJobInput.value = data.userJob;
  formPopupEditValidator.checkPopupBeforeOpen();
  popupEditProfile.open();
};

const handlePopupAddOpen = () => {
  formPopupAddValidator.checkPopupBeforeOpen();
  popupAddCard.open();
};
// валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formPopupEditValidator = new FormValidator(validationConfig, formPopupEdit);
formPopupEditValidator.enableValidation();
const formPopupAddValidator = new FormValidator(validationConfig, formAdd);
formPopupAddValidator.enableValidation();
// слушатели
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
buttonPopupEditOpen.addEventListener('click', handlePopupEditOpen);
buttonPopupAddOpen.addEventListener('click', handlePopupAddOpen);
