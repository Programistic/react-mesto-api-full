import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [textOnSubmit, setTextOnSubmit] = useState('');

  useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
    setTextOnSubmit('Сохранить');
  }, [currentUser, isOpen]);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUserDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTextOnSubmit('Сохранение...');
    onUpdateUser(userName, userDescription);
  };

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText={textOnSubmit} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset form__fieldset_location_popup">
        <div className="form__field">
          <input id="user-name-input" className="form__input form__input_theme_white form__input_location_popup" type="text" name="user-name" value={userName || ''} onChange={handleNameChange} placeholder="Ваше имя" required />
          <span className="form__input-error user-name-input-error"></span>
        </div>
        <div className="form__field">
          <input id="user-info-input" className="form__input form__input_theme_white form__input_location_popup" type="text" name="user-info" value={userDescription || ''} onChange={handleDescriptionChange} placeholder="Ваша профессия" required />
          <span className="form__input-error user-info-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
