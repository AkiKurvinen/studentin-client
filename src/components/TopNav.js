import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function TopNav(props) {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const location = useLocation();
  const displayText =
    location.pathname === '/'
      ? props.uid === 0
        ? 'Home'
        : 'My Profile'
      : toTitleCase(location.pathname.replace('/', ''));

  return (
    <nav id='topNav'>
      <NavLink to={`/`} data-cy='avatarLink'>
        {props.uid !== 0 ? (
          <img
            className='avatar'
            src={'./img/default-user.jpg'}
            width='40'
            height='40'
            alt={props.uid}
          ></img>
        ) : (
          <img
            className='sinlogo'
            src={'./img/sin_logo.svg'}
            width='100'
            height='40'
            alt='sin_logo'
          ></img>
        )}
      </NavLink>
      <p data-cy='topNavP'>{displayText}</p>{' '}
    </nav>
  );
}
export default TopNav;
