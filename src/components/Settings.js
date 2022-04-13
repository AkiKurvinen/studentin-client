import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';

import Button from 'react-bootstrap/Button';

function Settings(props) {
  const { sendRequest } = useHttpClient();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();
  const [myId, setMyId] = useState(props.id);
  const [newusername, setNewusername] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [newpasswordagain, setNewpasswordagain] = useState('');
  const [accountUpdated, setAccountUpdated] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/users/${myId}`
        );

        setUserData(response);
      } catch (err) {
        setError(err.toString());
      }
    };
    if (myId) {
      getData(myId);
    }
  }, [myId, sendRequest]);
  const submitValue = () => {
    const details = {
      Email: newusername,
      Password: newpassword,
    };
    updateUserData(details.newusername, details.newpassword);
  };
  const updateUserData = async () => {
    try {
      const sendThis = JSON.stringify({
        username: newusername,
        email: userData.users[0].email,
        password: newpassword,
        title: userData.users[0].title,
        id: myId,
      });

      const response = await sendRequest(
        `http://localhost:5000/api/users/`,
        'PATCH',
        sendThis,
        {
          'Content-Type': 'application/json',
        }
      );

      setUserData(response);
      if (response.users[0].username === newusername) {
        setAccountUpdated('Account Updated');
      }
    } catch (err) {
      setError(err.toString());
    }
  };
  function passwordValidator() {
    if (newpassword !== newpasswordagain) {
      return true;
    } else if (newpassword.length < 3) {
      return true;
    } else {
      return false;
    }
  }
  function usernameValidator() {
    if (newusername === userData.users[0].username) {
      return true;
    } else if (newusername.length < 3) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      {userData && (
        <div className='loginDetails'>
          <h1>Edit Login Details</h1> <label>New username </label>
          <input
            type='text'
            placeholder='username'
            value={newusername}
            onChange={(e) => setNewusername(e.target.value)}
          />
          <br />
          <Button
            variant='warning'
            onClick={submitValue}
            disabled={usernameValidator() ? true : ''}
          >
            Change username
          </Button>
          <br />
          <label>New password </label>
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setNewpassword(e.target.value)}
          />
          <label>Repeat new password </label>
          <input
            type='password'
            placeholder='rewrite password'
            onChange={(e) => setNewpasswordagain(e.target.value)}
          />
          <br />
          <Button
            variant='warning'
            onClick={submitValue}
            disabled={passwordValidator() ? true : ''}
          >
            Change password
          </Button>
        </div>
      )}
    </>
  );
}
export default Settings;
