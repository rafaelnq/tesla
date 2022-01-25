import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import HeaderBlock from './components/HeaderBlock';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, login } = useAuth();

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        login({
          email: currentUser.email,
          uid: currentUser.uid,
          displayName: currentUser.displayName,
        });
      }
    });

    return authListener;
  }, [login]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && <Menu />}
            <HeaderBlock />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/signup">
            {user ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/account">
            {!user ? (
              <Redirect to="/login" />
            ) : (
              <>
                <Account
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
              </>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
