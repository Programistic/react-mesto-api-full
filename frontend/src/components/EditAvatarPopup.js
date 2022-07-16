import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose}) {

  const [textOnSubmit, setTextOnSubmit] = useState('');

  const inputAvatarSrc = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTextOnSubmit('Сохранение...');
    onUpdateAvatar(inputAvatarSrc.current.value);
  }

  useEffect(() => {
    inputAvatarSrc.current.value = '';
    setTextOnSubmit('Сохранить');
  }, [isOpen]);

  return (
    <PopupWithForm name="avatar-update" title="Обновить аватар" buttonText={textOnSubmit} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="form__fieldset form__fieldset_location_popup">
        <div className="form__field">
          <input id="avatar-image-input" className="form__input form__input_theme_white form__input_location_popup" type="url" name="avatar-image" ref={inputAvatarSrc} placeholder="Ссылка на фото" required />
          <span className="form__input-error avatar-image-input-error"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;