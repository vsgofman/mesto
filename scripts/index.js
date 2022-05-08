const popupEdit = document.querySelector('.popup_edit');
const openPopupEditButton = document.querySelector('.profile__button_edit');
const closePopupEditButton = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__block_profile_edit');
const profileNameInput = popupEdit.querySelector('.popup__input_content_name');
const profileJobInput = popupEdit.querySelector('.popup__input_content_job');

const popupAdd = document.querySelector('.popup_add');
const openPopupAddButton = document.querySelector('.profile__button_add');
const closePopupAddButton = popupAdd.querySelector('.popup__close_add');
const formAdd = popupAdd.querySelector('.popup__block_card_add');
const cardNameInput = popupAdd.querySelector('.popup__input_card_name');
const cardLinkInput = popupAdd.querySelector('.popup__input_card_link');

const popupImage = document.querySelector('.popup_cover');
const closePopupImageButton = popupImage.querySelector('.popup__close_cover')

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const cardTemplate = document.querySelector('#card-template').content;
const cardsElement = document.querySelector('.cards');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

const closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openPopupEdit() {
  profileNameInput.value = nameProfile.textContent;
  profileJobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  openPopup(popupAdd);
}

const openPopupImage = (evt) => {
  const nameCard = event.target.alt;
  document.querySelector('.popup__image').src = event.target.src;
  document.querySelector('.popup__image').alt = nameCard;
  document.querySelector('.popup__caption').textContent = nameCard;
  openPopup(popupImage);
}

const addCard = (card) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  cardElement.querySelector('.card__name').textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  const deleteCardButton = cardElement.querySelector('#button__remove');
  deleteCardButton.addEventListener('click', deleteCardHandler);

  const likeCardButton = cardElement.querySelector('#button__like');
  likeCardButton.addEventListener('click', likeCardHandler);

  const openImage = cardElement.querySelector('.card__photo');
  openImage.addEventListener('click', openPopupImage);

  return cardElement;
};

const deleteCardHandler = (evt) => {
  evt.target.closest('.card').remove();
}

const likeCardHandler = (evt) => {
  evt.target.classList.toggle('card__button_active');
}

const createCard = (card) => {
  cardsElement.prepend(addCard(card));
};

initialCards.forEach((card) => {
  createCard(card);
});

function handleProfileFormEditSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = profileNameInput.value;
  jobProfile.textContent = profileJobInput.value;
  closePopup(evt);
}

function handleProfileFormAddSubmit (evt) {
  evt.preventDefault();
  createCard({name: cardNameInput.value, link: cardLinkInput.value});
  formAdd.reset();
  closePopup(evt);
}

openPopupEditButton.addEventListener('click', openPopupEdit);
closePopupEditButton.addEventListener('click', closePopup);
openPopupAddButton.addEventListener('click', openPopupAdd);
closePopupAddButton.addEventListener('click', closePopup);
closePopupImageButton.addEventListener('click', closePopup);
formEdit.addEventListener('submit', handleProfileFormEditSubmit);
formAdd.addEventListener('submit', handleProfileFormAddSubmit);