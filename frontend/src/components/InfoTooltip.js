function InfoTooltip({isOpen, message, buttonName, onConfirm}) {

  const popupOpened = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_role_tooltip ${popupOpened}`}>
      <div className="popup__container">
        <button className={`popup__button-confirm popup__button-${buttonName}`} onClick={onConfirm}></button>
        <h2 className="popup__message">{message}</h2> 
      </div>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onConfirm}></button>
    </div>
  );
}

export default InfoTooltip;