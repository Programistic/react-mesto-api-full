import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onAddPlace, onClose}) {

  const inputPlaceName = useRef();
  const inputPlaceImage = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace(inputPlaceName.current.value, inputPlaceImage.current.value);
  }

  useEffect(() => {
    inputPlaceName.current.value = '';
    inputPlaceImage.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm name="create" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset form__fieldset_location_popup">
        <div className="form__field">
          <input id="place-name-input" className="form__input form__input_theme_white form__input_location_popup" type="text" name="place-name" ref={inputPlaceName} placeholder="Название" required />
          <span className="form__input-error place-name-input-error"></span>
        </div>
        <div className="form__field">
          <input id="place-image-input" className="form__input form__input_theme_white form__input_location_popup" type="url" name="place-image" ref={inputPlaceImage} placeholder="Ссылка на картинку" required />
          <span className="form__input-error place-image-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;