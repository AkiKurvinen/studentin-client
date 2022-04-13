import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/auth-context';
import MyProfile from './components/MyProfile';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Button from 'react-bootstrap/esm/Button';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import MyProjects from './components/MyProjects';
import Settings from './components/Settings.js';
import Search from './components/Search.js';

let logoutTimer;
function App() {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(0);

  const login = useCallback((uid, token, expirationDate, name, email, role) => {
    //prevent a render loop
    setToken(token);
    setUserId(uid);

    //current date in ms + 1h
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    //prevent a render loop
    setToken(null);
    setUserId(0);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() // if greater, still in future
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route exact path='/' element={<MyProfile />} />
        <Route
          exact
          path='/projects'
          element={<MyProjects id={userId}></MyProjects>}
        />
        <Route
          exact
          path='/settings'
          element={<Settings id={userId}></Settings>}
        />
        <Route exact path='/search' element={<Search id={userId}></Search>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path='/' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,

          login: login,
          logout: logout,
        }}
      >
        <Router>
          <TopNav uid={userId}></TopNav>{' '}
          <main>
            {token && (
              <Button id='logOutButton' onClick={logout}>
                Logout <FontAwesomeIcon icon={faSignOut} />
              </Button>
            )}
            {routes}
          </main>
          {userId !== 0 && <BottomNav route={'home'}></BottomNav>}
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
