const popupEdit = document.querySelector('.popup_edit');
const buttonPopupEditOpen = document.querySelector('.profile__button_edit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const formPopupEdit = popupEdit.querySelector('.popup__block_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');

const popupAdd = document.querySelector('.popup_add');
const buttonPopupAddOpen = document.querySelector('.profile__button_add');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close_add');
const formAdd = popupAdd.querySelector('.popup__block_card_add');
const cardNameInput = popupAdd.querySelector('.popup__input_card_name');
const cardLinkInput = popupAdd.querySelector('.popup__input_card_link');

const popupImage = document.querySelector('.popup_cover');
const cardImage = document.querySelector('.popup__image');
const cardTitle = document.querySelector('.popup__caption');
const buttonPopupImageClose = popupImage.querySelector('.popup__close_cover');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const cardTemplate = document.querySelector('#card-template').content;
const cardsElement = document.querySelector('.cards');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  const buttonPopupClose = popup.querySelector('.popup__close');
  buttonPopupClose.addEventListener('click', () => closePopup(popup));
}

function openPopupEdit() {
  profileNameInput.value = nameProfile.textContent;
  profileJobInput.value = jobProfile.textContent;
  const formElementEdit = popupEdit.querySelector('.popup__form');
  const inputList = Array.from(popupEdit.querySelectorAll('.popup__input'));
  const buttonElement = popupEdit.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, enableValidationObject);
  openPopup(popupEdit);
  inputList.forEach((inputElement) => {
      checkInputValidity(formElementEdit, inputElement, enableValidationObject);
  });
}

function openPopupAdd() {
  const inputList = Array.from(popupAdd.querySelectorAll('.popup__input'));
  const buttonElement = popupAdd.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, enableValidationObject);
  openPopup(popupAdd);
}

const openPopupImage = (card) => {
  const nameCard = card.name;
  cardImage.src = card.link;
  cardImage.alt = nameCard;
  cardTitle.textContent = nameCard;
  openPopup(popupImage);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  const buttonPopupClose = popup.querySelector('.popup__close');
  buttonPopupClose.removeEventListener('click', () => closePopup(popup));
};

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget)  {
    closePopup(evt.target);
  }
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

const addCard = (card) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  cardElement.querySelector('.card__name').textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  const buttonCardDelete = cardElement.querySelector('#button__remove');
  buttonCardDelete.addEventListener('click', deleteCardHandler);

  const buttonCardLike = cardElement.querySelector('#button__like');
  buttonCardLike.addEventListener('click', likeCardHandler);

  const imageOpen = cardElement.querySelector('.card__photo');
  imageOpen.addEventListener('click', () => openPopupImage(card));

  return cardElement;
};

const createCard = (card) => {
  cardsElement.prepend(addCard(card));
};

const deleteCardHandler = (evt) => {
  evt.target.closest('.card').remove();
}

const likeCardHandler = (evt) => {
  evt.target.classList.toggle('card__button_active');
}

initialCards.forEach((card) => {
  createCard(card);
});

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

buttonPopupEditOpen.addEventListener('click', openPopupEdit);
buttonPopupAddOpen.addEventListener('click', openPopupAdd);

formPopupEdit.addEventListener('submit', handleProfileFormEditSubmit);
formAdd.addEventListener('submit', handleProfileFormAddSubmit);
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupImage.addEventListener('click', closePopupOverlay);