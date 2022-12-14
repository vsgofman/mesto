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
const popupAvatar = document.querySelector('.popup_avatar');

const buttonPopupEditOpen = document.querySelector('.profile__button_edit');
const buttonPopupAddOpen = document.querySelector('.profile__button_add');
const unitPopupAvatarOpen = document.querySelector('.profile__overlay');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const formPopupEdit = popupEdit.querySelector('.popup__form_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');
const formAdd = popupAdd.querySelector('.popup__form_card_add');
const formAvatarEdit = popupAvatar.querySelector('.popup__form_avatar_edit');
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
  userInfo.setUserAvatar(res.avatar)
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
      if (card.isLiked()) {
        api.deleteLike(id)
        .then((res) => {
          card.setLikes(res.likes)
        })
      } else {
        api.addLike(id)
        .then((res) => {
          card.setLikes(res.likes)
        })
      }
  });
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
    popupEditProfile.renderLoading(true);
    api.editProfile(data['name-input'], data['job-input'])
    .then(() => {
      userInfo.setUserInfo(data['name-input'], data['job-input']);
    })
    .catch(err => {
      console.log('Данные профиля не были обновлены', err)
    })
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.renderLoading(false);
    })
});

const popupAddCard = new PopupWithForm(
  '.popup_add',
  (cardData) => {
  popupAddCard.renderLoading(true);
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
  .catch(err => {
    console.log('Карточка не добавилась', err)
  })
  .finally(() => {
    popupAddCard.close()
    popupAddCard.renderLoading(false);
  })
});

const popupEditAvatar = new PopupWithForm(
  '.popup_avatar',
  (data) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar(data['avatar-link'])
    .then(() => {
      userInfo.setUserAvatar(data['avatar-link']);
    })
    .catch(err => {
      console.log('Не удалось обновить аватар', err)
    })
    .finally(() => {
      popupEditAvatar.close();
      popupEditAvatar.renderLoading(false);
    })
});

const popupDeleteConfirm = new PopupWithForm('.popup_confirm')

const popupImage = new PopupWithImage('.popup_cover');

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__position',
  avatar: '.profile__photo'
});

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

const handlePopupAvatarOpen = () => {
  formAvatarEditValidator.checkPopupBeforeOpen();
  popupEditAvatar.open();
}
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
const formAvatarEditValidator = new FormValidator(validationConfig, formAvatarEdit);
formAvatarEditValidator.enableValidation();
// слушатели
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteConfirm.setEventListeners();
buttonPopupEditOpen.addEventListener('click', handlePopupEditOpen);
buttonPopupAddOpen.addEventListener('click', handlePopupAddOpen);
unitPopupAvatarOpen.addEventListener('click', handlePopupAvatarOpen);
