function PopupWithForm({
  isOpen,
  name,
  title,
  buttonText,
  onSubmit,
  children,
  onClose,
}) {
  const popupOpened = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_role_${name} ${popupOpened}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="form__submit form__submit_theme_black form__submit_location_popup button" type="submit" aria-label={buttonText}>{buttonText}</button>
        </form>
      </div>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
    </div>
  );
}

export default PopupWithForm;
