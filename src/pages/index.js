import Api from '../components/Api.js';
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
let userId = '';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainerSelector = '.cards';


const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '2ce6c808-d58b-4b11-aa87-9ee20a23a568',
    'Content-Type': 'application/json'
  },
}

const api = new Api(apiConfig);
api.getProfile()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about)
  userId = res._id
})

api.getInitialCards()
.then((result) => {
  const defaultCardList = new Section({
    items: result,
    renderer: (cardItem) => {
      defaultCardList.addItem(createCard(cardItem));
    }
  }, cardContainerSelector)
  defaultCardList.renderItems()
})
.catch((error) => {
  console.log(error)
});


// создание карточек
const createCard = (item) => {
  const card = new Card(
    { data: item, userId: userId },
    cardTemplate,
    handleCardClick,
    (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changePopupCallback(() => {
        api.deleteCard(id)
        .then((res) => {
          popupDeleteConfirm.close();
          card.deleteCard();
        })
      })
    },
    (id) => {
      api.addLike(id)
      .then((res) => {
        console.log(res)
      })
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
};

function handleCardClick(name, link) {
  popupImage.open(name, link);
}
// попапы
const popupEditProfile = new PopupWithForm(
  '.popup_edit',
  (data) => {
  api.editProfile(data['name-input'], data['job-input'])
  .then(() => {
    userInfo.setUserInfo(data['name-input'], data['job-input']);
  })
  popupEditProfile.close();
});

const popupAddCard = new PopupWithForm('.popup_add', (cardData) => {
  api.addCard(cardData['card-name'], cardData['card-link'])
  .then((res) => {
    const newCard = new Section({
      items: [ res ],
      renderer: (res) => {
        newCard.addItem(createCard(res))
      }
    }, cardContainerSelector);
    newCard.renderItems()
  })
  .then(() => {
    popupAddCard.close()
  })
});


const popupDeleteConfirm = new PopupWithForm('.popup_confirm')

const popupImage = new PopupWithImage('.popup_cover');
const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__position' });

const handlePopupEditOpen = () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;
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
popupDeleteConfirm.setEventListeners();
buttonPopupEditOpen.addEventListener('click', handlePopupEditOpen);
buttonPopupAddOpen.addEventListener('click', handlePopupAddOpen);

// пример функции для кнопки сохранения
// function renderLoading(isLoading) {
//   if(isLoading) {
//     spinner.classList.add('spinner_visible');
//     content.classList.add('content_hidden');
//   } else {
//     content.classList.remove('content_hidden');
//     spinner.classList.remove('spinner_visible');
//   }
// }
