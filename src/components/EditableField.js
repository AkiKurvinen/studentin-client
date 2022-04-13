import React, { useState } from 'react';
import { useHttpClient } from './http-hook';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

function EditableField(props) {
  const { sendRequest } = useHttpClient();
  const initialState = props.data === null ? 'N/A' : props.data;
  const [uid, setUid] = useState(props.id);
  const [pid, setPid] = useState(props.pid);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState('');
  const [newData, setNewData] = useState(initialState);
  const [dbfield, setDbfield] = useState(props.dbfield);
  const [dbmessage, setDbmessage] = useState('');
  function textChanged(event) {
    setNewData(event.target.value);
  }
  function toggeEditing() {
    if (editing) {
      if (data !== newData && typeof pid === 'undefined') {
        updateUserData();
      } else if (data !== newData && pid > 0) {
        updateProjectData();
      }
    }
    setEditing(!editing);
  }
  const updateUserData = async () => {
    setDbmessage('');
    setError('');
    try {
      const sendThis = JSON.stringify({
        id: uid,
        data: newData,
        item: dbfield,
      });

      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/update/userdata/`,
        'PATCH',
        sendThis,
        {
          'Content-Type': 'application/json',
        }
      );

      if (
        response.success !== null &&
        response.success !== undefined &&
        response.success.length > 0
      ) {
        setDbmessage(response.success);

        setData(newData);
      } else if (response.error !== null && response.error.length > 0) {
        setError(response.error);
      }
    } catch (err) {
      setDbmessage(err.toString());
    }
  };
  const updateProjectData = async () => {
    setDbmessage('');
    setError('');
    try {
      const sendThis = JSON.stringify({
        pid: pid,
        data: newData,
        item: dbfield,
      });

      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/update/project/`,
        'PATCH',
        sendThis,
        {
          'Content-Type': 'application/json',
        }
      );

      if (
        response.success !== null &&
        response.success !== undefined &&
        response.success.length > 0
      ) {
        setDbmessage(response.success);

        setData(newData);
      } else if (response.error !== null && response.error.length > 0) {
        setError(response.error);
      }
    } catch (err) {
      setDbmessage(err.toString());
    }
  };
  return (
    <div>
      <p>{props.name}</p>
      {props.fieldType === 'textarea' ? (
        <textarea
          className='descript'
          rows='3'
          disabled={!editing}
          value={newData}
          onChange={textChanged}
        />
      ) : (
        <input
          data-cy={props.dbfield}
          type={props.fieldType}
          className='descript'
          disabled={!editing}
          value={newData}
          onChange={textChanged}
        />
      )}

      <Button
        data-cy={'penIcon' + dbfield}
        title={editing ? 'Save Changes' : 'Edit'}
        variant='contained'
        className='edit-pen-icon'
        onClick={toggeEditing}
      >
        <FontAwesomeIcon icon={editing ? faCheck : faPen} />
      </Button>
      <br />
      {dbmessage !== undefined && dbmessage.length > 0 && (
        <span className='fadeOut successmsg'> {dbmessage}</span>
      )}
      {error !== undefined && error.length > 0 && (
        <span className='errormsg'> {error}</span>
      )}
    </div>
  );
}
export default EditableField;
