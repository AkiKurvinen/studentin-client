import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Docs from './components/Docs';
import { useGoogleLogout } from 'react-google-login';

let logoutTimer;
function App() {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(0);
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const clientId =
    '145839285893-3nji7qhivmfcbhvgmh194m776hhill9n.apps.googleusercontent.com';

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

  const onLogoutSuccess = (res) => {
    setInfo('Logged out Successfully');
  };

  const onFailure = () => {
    setError('Google login failed');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const logout = useCallback(() => {
    // google users

    signOut();
    //prevent a render loop
    setToken(null);
    setUserId(0);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, [signOut]);

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
  if (token && userId !== 0) {
    routes = (
      <Routes>
        <Route exact path='/docs' element={<Docs />} />

        <Route exact path='/' element={<MyProfile imgUrl={img} />} />
        <Route
          exact
          path='/projects'
          element={<MyProjects id={userId}></MyProjects>}
        />
        <Route
          exact
          path='/settings'
          element={
            <Settings id={userId} removeLogin={() => logout()}></Settings>
          }
        />
        <Route exact path='/search' element={<Search id={userId}></Search>} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path='/docs' element={<Docs />} />
        <Route path='*' element={<NotFound />} />
        <Route exact path='/' element={<Signup imgsetter={setImg} />} />
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
          <TopNav uid={userId} imgUrl={img}></TopNav>
          <main
            className={
              userId === 0 ? 'main_no_bottom_menu' : 'main_with_bottom_menu'
            }
          >
            {' '}
            {error && <p lassName='errortxt'>{error}</p>}
            {info && <p className='infotxt'>{info}</p>}
            {token && (
              <a href='/'>
                <Button id='logOutButton' onClick={logout}>
                  Logout <FontAwesomeIcon icon={faSignOut} />
                </Button>
              </a>
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
