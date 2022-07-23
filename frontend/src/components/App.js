import { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/Auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isConfirmPopupOpen: false,
      isInfoTooltipOpen: false,
      infoTooltipButtonName: '',
      infoTooltipMessage: '',
      isSuccess: false,
      userEmail: '',
      selectedCard: {},
      deleteCard: {},
      cards: [],
      currentUser: {},
      loggedIn: false,
    };

    this.tokenCheck = this.tokenCheck.bind(this);
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleConfirmDeleteCardClick = () => {
    this.setState({ isConfirmPopupOpen: true });
  };

  handleEscClick = (event) => {
    if (event.key === 'Escape') {
      this.closeAllPopups();
    }
  };

  handleOutsideClick = (event) => {
    if (event.target.classList.contains('popup')) {
      this.closeAllPopups();
    }
  };

  handleUpdateUser = (userName, userDescription) => {
    api.setUserInfo(userName, userDescription)
      .then((res) => {
        this.setState({ currentUser: res.user });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdateAvatar = (userAvatar) => {
    api.setAvatar(userAvatar)
      .then((res) => {
        this.setState({ currentUser: res.user });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some((like) =>  like === this.state.currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        this.setState({ cards: this.state.cards.map((oldCard) => oldCard._id === res.card._id ? res.card : oldCard) });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardDelete = () => {
    api.deleteCard(this.state.deleteCard._id)
      .then(() => {
        this.setState({
          cards: this.state.cards.filter((currentCard) => currentCard._id !== this.state.deleteCard._id),
          isConfirmPopupOpen: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleAddPlace = (placeName, placeImage) => {
    api.setCard(placeName, placeImage)
      .then((res) => {
        this.setState({ cards: [res.card, ...this.state.cards] });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.tokenCheck();

    api.getUserInfo()
      .then((res) => {
        this.setState({ currentUser: res.user });
      })
      .catch((err) => {
        console.log(err);
      });

    api.getCards()
      .then((res) => {
        this.setState({ cards: res.card });
      })
      .catch((err) => {
        console.log(err);
      });

    document.addEventListener('keydown', this.handleEscClick);
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick);
    document.addEventListener('click', this.handleOutsideClick);
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isConfirmPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {},
    });
  };

  openConfirmDeletePopup = (card) => {
    this.setState({
      deleteCard: card,
      isConfirmPopupOpen: true,
    });
  };

  resetLoggedIn = () => {
    this.setState({
      loggedIn: false,
    });
  };

  tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        Auth
          .getContent(jwt)
          .then((res) => {
            if (res) {
              this.setState({
                loggedIn: true,
                userEmail: res.user.email
              }, () => {
                this.props.history.push("/main");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  };

  handleRegisterSubmit = (userEmail, userPassword) => {
    Auth.register(userEmail, userPassword)
      .then((res) => {
        if (res) {
          this.openTooltipSuccess(userEmail);
        } else {
          this.openTooltipFail();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLoginSubmit = (userEmail, userPassword) => {
    Auth.authorize(userEmail, userPassword)
      .then((data) => {
        if (data !== undefined && data.token) {
          localStorage.setItem('jwt', data.token);
          this.setState({
            loggedIn: true,
            userEmail: userEmail,
          });
          this.props.history.push('/main');
        } else {
          this.openTooltipFail();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openTooltipSuccess = (userEmail) => {
    this.setState({
      isSuccess: true,
      loggedIn: true,
      userEmail: userEmail,
      isInfoTooltipOpen: true,
      infoTooltipButtonName: 'success',
      infoTooltipMessage: 'Вы успешно зарегистрировались!',
    });
  };

  openTooltipFail = () => {
    this.setState({
      isSuccess: false,
      isInfoTooltipOpen: true,
      infoTooltipButtonName: 'fail',
      infoTooltipMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
    });
  };

  handleConfirmRegister = () => {
    this.closeAllPopups();
    if (this.state.isSuccess) {
      this.props.history.push('/signin');
    }
  };

  render() {
    return (
      <div className="page">
        <div className="container">

          <CurrentUserContext.Provider value={this.state.currentUser}>

            <Header userEmail={this.state.userEmail} resetLoggedIn={this.resetLoggedIn} loggedIn={this.state.loggedIn} />

            <Switch>

              <ProtectedRoute
                exact path="/main"
                loggedIn={this.state.loggedIn}
                cards={this.state.cards}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.openConfirmDeletePopup}
                onCardClick={this.handleCardClick}
                component={Main}>
              </ProtectedRoute>

              <Route path="/signin">
                <Login handleLoginSubmit={this.handleLoginSubmit} />
              </Route>

              <Route path="/signup">
                <Register handleRegisterSubmit={this.handleRegisterSubmit} />
              </Route>

              <Route>
                {this.state.loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
              </Route>

            </Switch>

            {this.state.loggedIn && <Footer />}

            <EditProfilePopup
              isOpen={this.state.isEditProfilePopupOpen}
              onUpdateUser={this.handleUpdateUser}
              onClose={this.closeAllPopups}
            />

            <EditAvatarPopup
              isOpen={this.state.isEditAvatarPopupOpen}
              onUpdateAvatar={this.handleUpdateAvatar}
              onClose={this.closeAllPopups}
            />

            <AddPlacePopup
              isOpen={this.state.isAddPlacePopupOpen}
              onAddPlace={this.handleAddPlace}
              onClose={this.closeAllPopups}
            />

            <ConfirmDeletePopup
              isOpen={this.state.isConfirmPopupOpen}
              onConfirmDeleteCard={this.handleCardDelete}
              onClose={this.closeAllPopups}
            />

            <ImagePopup
              card={this.state.selectedCard}
              onClose={this.closeAllPopups}
            />

            <InfoTooltip
              isOpen={this.state.isInfoTooltipOpen}
              message={this.state.infoTooltipMessage}
              buttonName={this.state.infoTooltipButtonName}
              onConfirm={this.handleConfirmRegister}
            />

          </CurrentUserContext.Provider>

        </div>
      </div>
    );
  }
}

export default withRouter(App);
