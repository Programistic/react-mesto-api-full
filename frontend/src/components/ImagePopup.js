function ImagePopup({card, onClose}) {

  const popupOpened = card.link ? 'popup_opened' : '';

  return (
    <div className={`popup popup_role_image-display ${popupOpened}`}>
      <img className="popup__image" src={card.link} alt={card.name}/>
      <p className="popup__image-caption">{card.name}</p>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
    </div>
  );
}

export default ImagePopup;