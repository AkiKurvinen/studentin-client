import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';
import FetchUsers from './FetchUsers.js';
import Button from 'react-bootstrap/Button';
import EditableField from './EditableField.js';
import EditSkills from './EditSkills.js';
import MyProjects from './MyProjects.js';

function MyDetails(props) {
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

  return (
    <div>
      {error && <p>{error}</p>}
      {accountUpdated && <p>{accountUpdated}</p>}
      {userData && (
        <React.Fragment>
          <div className='accountOverview'>
            <img
              className='avatar-big'
              src={'./img/default-user.jpg'}
              width='150'
              height='150'
              alt={props.uid}
            ></img>
            <div>
              <p data-cy='usernameP'>
                <b>{userData.users[0].username}</b>
              </p>

              {userData.users[0].fname && (
                <p className='nameParagraph'>{userData.users[0].fname}</p>
              )}
              {userData.users[0].lname && (
                <p className='nameParagraph'>{userData.users[0].lname}</p>
              )}

              <p>{userData.users[0].school}</p>
            </div>
          </div>
          <div className='accountDetails'>
            <EditableField
              id={myId}
              name='First Name'
              data={userData.users[0].fname}
              dbfield='fname'
              fieldType='text'
            ></EditableField>
            <EditableField
              id={myId}
              name='Last Name'
              data={userData.users[0].lname}
              dbfield='lname'
              fieldType='text'
            ></EditableField>
            <EditableField
              id={myId}
              name='Email'
              data={userData.users[0].email}
              dbfield='email'
              fieldType='email'
            ></EditableField>
            <EditableField
              id={myId}
              name='School'
              data={userData.users[0].school}
              dbfield='school'
              fieldType='text'
            ></EditableField>
            <EditableField
              id={myId}
              name='Bio'
              fieldType='textarea'
              data={userData.users[0].bio}
              dbfield='bio'
            ></EditableField>
          </div>
          <EditSkills id={myId}></EditSkills>

          {userData.users[0].title === 'admin' && <FetchUsers />}
        </React.Fragment>
      )}
    </div>
  );
}
export default MyDetails;
