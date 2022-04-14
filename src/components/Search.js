import React, { useState } from 'react';
import { useHttpClient } from './http-hook';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const { sendRequest } = useHttpClient();
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [findThis, setfindThis] = useState('projects');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const fetchSearch = async () => {
    setError('');
    setResult('');
    let url;
    console.log('findThis:' + findThis + ' ' + keyword);
    if (findThis === 'users') {
      url = `${process.env.REACT_APP_BACKEND}/find/${keyword}`;
    } else if (findThis === 'skills') {
      url = `${process.env.REACT_APP_BACKEND}/find/skills/${keyword}`;
    } else if (findThis === 'projects') {
      url = `${process.env.REACT_APP_BACKEND}/find/projects/${keyword}`;
    }
    try {
      const result = await sendRequest(url);
      if (result.error && result.error.length > 0) {
        setError(result.error.toString());
      } else {
        console.log(result);
        setResult(result);
      }
    } catch (err) {
      setError(err.toString());
    }
  };
  const submitValue = () => {
    setError('');
    setInfo('');

    fetchSearch();
  };
  function nameValidator() {
    if (keyword.length < 1) {
      return true;
    } else {
      return false;
    }
  }
  const handleChange = (e) => {
    setfindThis(e.target.value);
  };
  const handleKWChange = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <div id='searchWrapper'>
      <div id='searchComponent'>
        {error && <p>{error}</p>}
        <div className={`searchresults ${result ? '' : 'emptytextarea'}`}>
          {result.users && (
            <table className='searchResTable'>
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>School</th>
                </tr>

                {result.users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.fname !== undefined
                        ? user.fname
                        : '' + ' ' + user.lanme !== undefined
                        ? user.lanme
                        : ''}
                    </td>
                    <td>{user.school}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {result.skills && (
            <table className='searchResTable'>
              <tbody>
                <tr>
                  <th>Skill</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>School</th>
                </tr>

                {result.skills.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.skill}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.fname !== undefined
                        ? user.fname
                        : '' + ' ' + user.lanme !== undefined
                        ? user.lanme
                        : ''}
                    </td>
                    <td>{user.school}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {result.projects && (
            <table className='searchResTable'>
              <tbody>
                <tr>
                  <th>Project</th>
                  <th>Details</th>
                  <th>Created</th>
                </tr>

                {result.projects.map((pro) => (
                  <tr key={pro.id}>
                    <td>{pro.name}</td>
                    <td>{pro.details.slice(0, 20) + '...'}</td>
                    <td>{`${new Date(pro.created).getDate()}.${
                      new Date(pro.created).getMonth() + 1
                    }.${new Date(pro.created).getFullYear()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className='searchActions'>
          <h3>Search for</h3>
          <input
            type='radio'
            id='projects'
            name='group'
            value='projects'
            checked={findThis === 'projects'}
            onChange={handleChange}
          />
          <label htmlFor='projects'>Projects</label>
          <input
            type='radio'
            id='users'
            name='group'
            value='users'
            onChange={handleChange}
          />
          <label htmlFor='users'>Users</label>
          <input
            type='radio'
            id='skills'
            name='group'
            value='skills'
            onChange={handleChange}
          />
          <label htmlFor='skills'>Skills</label>
          <div className='searchbar'>
            <input
              type='text'
              id='searchField'
              name='searchField'
              placeholder={`Search ${findThis}...`}
              onChange={handleKWChange}
            ></input>
            <Button
              id='searchButton'
              variant='primary'
              onClick={submitValue}
              disabled={nameValidator() ? true : ''}
            >
              <FontAwesomeIcon icon={faSearch} className='menuIcon' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
