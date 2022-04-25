const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__button_edit');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__block_profile_edit');
const nameInput = popup.querySelector('.popup__input_content_name');
const jobInput = popup.querySelector('.popup__input_content_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');

function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupClose();
}

openPopupButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 