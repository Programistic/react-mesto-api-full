import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  
  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick =() => {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (isOwn ? 'card__button-delete' : 'card__button-delete_inactive');

  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeSetClassName = (isLiked ? 'card__like_liked' : '');

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <button className={`button ${cardDeleteButtonClassName}`} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="card__inner-container">
        <h2 className="card__title">{card.name}</h2>
          <button className="button card__button-like" type="button" aria-label="Симпатия" onClick={handleLikeClick}>
            <span className={`card__like ${cardLikeSetClassName}`}></span>
            <span className="card__like-counter">{card.likes.length}</span>
          </button>  
      </div>
    </li>
  );
}

export default Card;