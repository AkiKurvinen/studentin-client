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
  const [delWarn, setDelWarn] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/users/${myId}`
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
    setAccountUpdated(null);
    try {
      const sendThis = JSON.stringify({
        username: newusername,
        email: userData.users[0].email,
        password: newpassword,
        title: userData.users[0].title,
        id: myId,
      });

      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/users/`,
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
  const deleteData = async (id) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/users/talents/`,
        'DELETE',
        JSON.stringify({
          id: id,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      if (response && response.success) {
        try {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND}/users/memberships/`,
            'DELETE',
            JSON.stringify({
              id: id,
            }),
            {
              'Content-Type': 'application/json',
            }
          );
          if (response && response.success) {
            try {
              const response = await sendRequest(
                `${process.env.REACT_APP_BACKEND}/users/`,
                'DELETE',
                JSON.stringify({
                  id: id,
                }),
                {
                  'Content-Type': 'application/json',
                }
              );
              if (response && response.success) {
                // My account deleted
                props.removeLogin();
              }
            } catch (err) {
              setError(err.toString());
            }
          }
        } catch (error) {}
      }
    } catch (error) {
      setError(error.toString());
    }

    const fetchUsers = async () => {
      try {
        const users = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/users/`
        );
        return users;
      } catch (err) {}
    };
    const newData = await fetchUsers();
    setUserData(newData);
  };
  return (
    <>
      {userData !== undefined && userData.users !== undefined && (
        <div className='loginDetails'>
          <h1>Edit Account {userData.users[0].username}</h1>
          {accountUpdated && (
            <p className='fadeOut'>{accountUpdated.toString()}</p>
          )}
          <label>New username </label>
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
          <br />
          <div className='delAccountDiv'>
            <label>Delete account</label>
            <Button
              id='delAccBtn'
              variant='danger'
              onClick={(e) => setDelWarn(true)}
            >
              Delete Account
            </Button>
            {delWarn && (
              <div>
                <p>Delete my account?</p>
                <Button
                  id='noDelAccBtn'
                  variant='primary'
                  onClick={(e) => setDelWarn(false)}
                >
                  No
                </Button>
                <Button
                  id='yesDelAccBtn'
                  variant='danger'
                  onClick={(e) => deleteData(myId)}
                >
                  Yes
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Settings;
