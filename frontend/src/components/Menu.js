import { Route, Switch, Link, useHistory } from 'react-router-dom';

function Menu({userEmail, resetLoggedIn, loggedIn}) {

  const history = useHistory();
  const signOut = () => {
    localStorage.removeItem('jwt');
    resetLoggedIn();
    history.push("/signin");
  }

  return (
    <nav className="menu">
      <Switch>
        <Route path="/main">
          <div className="menu__item">
            <p className="menu__user-email">{userEmail}</p>
            <Link to="signin" className="menu__link menu__link_mobile" onClick={signOut}>Выйти</Link>
          </div> 
        </Route>
        <Route path="/signin">
          <Link to="signup" className="menu__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="signin" className="menu__link">Войти</Link>
        </Route>
      </Switch>
    </nav>
  );
}

export default Menu;