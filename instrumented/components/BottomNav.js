import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFolder,
  faCog,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

function BottomNav(props) {
  const auth = useContext(AuthContext); //Linking our AuthContext from app

  return (
    <nav id='bottomNav'>
      <ul>
        {' '}
        <li activeclassname='is-active' id='settings_link'>
          <NavLink to={`/settings`}>
            <FontAwesomeIcon icon={faCog} className='menuIcon' />
            Settings
          </NavLink>
        </li>
        <li id='profile_link'>
          <NavLink activeclassname='is-active' to={`/`}>
            <FontAwesomeIcon icon={faUser} className='menuIcon' />
            Profile
          </NavLink>
        </li>
        <li activeclassname='is-active' id='projects_link'>
          <NavLink to={`/projects`}>
            <FontAwesomeIcon icon={faFolder} className='menuIcon' />
            Projects
          </NavLink>
        </li>
        <li activeclassname='is-active' id='search_link'>
          <NavLink to={`/search`}>
            <FontAwesomeIcon icon={faSearch} className='menuIcon' />
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default BottomNav;
