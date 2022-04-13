//Profile.js
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/auth-context.js';
import { useHttpClient } from './http-hook';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const FetchUsers = () => {
  const { sendRequest } = useHttpClient();
  const authContext = useContext(AuthContext);
  const { isLoggedIn, token, userId } = authContext;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/users/`
        );
        setUserData(users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  function clickAlert(accountId, event) {
    alert('Delete user with ' + accountId);
    deleteRow(accountId);
  }
  const deleteData = async (id) => {
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
    } catch (err) {
      setError(err.toString());
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

  const deleteRow = (data) => {
    deleteData(data);
  };
  return (
    <React.Fragment>
      <h3>Users</h3>
      {userData && (
        <UsersList data={userData} myId={userId} onChildClick={clickAlert} />
      )}
    </React.Fragment>
  );
};
const UsersList = (props) => {
  if (props.data === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table className='adminUserTable'>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        {props.data.users.map(function (account, index) {
          return (
            <tr key={index}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{account.title}</td>
              <td>
                {account.id !== props.myId && (
                  <Button
                    variant='danger'
                    onClick={function (event) {
                      props.onChildClick(account.id, event);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default FetchUsers;
