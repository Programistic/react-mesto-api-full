import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({isOpen, onClose, onConfirmDeleteCard}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirmDeleteCard();
  }
  
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmDeletePopup;