import { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({cards, onCardLike, onCardClick, onCardDelete, onEditAvatar, onEditProfile, onAddPlace }) {

  const currentUser = useContext(CurrentUserContext);

  const cardList = cards.map((card) => {
    return (
      <Card
        key={card._id}
        card={card}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        onCardClick={onCardClick}
      />
    );
  });

  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
        <div className="profile__edit-icon" onClick={onEditAvatar}></div>    
        <div className="profile__inner-container">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button className="button profile__button-edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
        </div>
        <p className="profile__user-info">{currentUser.about}</p>
        <button className="button profile__button-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button> 
      </section>
      <section className="card-repository">
        <ul className="cards">
          {cardList}
        </ul>
      </section>
    </main>
  );
}

export default withRouter(Main);