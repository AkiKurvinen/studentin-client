import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from './SvgIcon.js';
import Button from 'react-bootstrap/Button';

function AddNewProject(props) {
  const { sendRequest } = useHttpClient();
  const [uid, setUid] = useState(props.id);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [newProjectName, setNewProjectName] = useState('New Project');
  const [newProjectDesc, setNewProjectDesc] = useState('Awesome Project');

  const addNewMembership = async (pid) => {
    setInfo('');
    try {
      const sendThis = JSON.stringify({
        uid: uid,
        pid: pid,
        role: 'creator',
      });

      const response = await sendRequest(
        `http://localhost:5000/api/memberships/`,
        'POST',
        sendThis,
        {
          'Content-Type': 'application/json',
        }
      );
      if (response !== undefined) {
        setInfo('Added project with id ' + response.response.toString());

        if (response.response === 'Membership added') {
          setInfo('Project created!');
        }
      }
    } catch (err) {
      setError(err.toString());
    }
  };
  const addNewProject = async (details) => {
    try {
      const sendThis = JSON.stringify({
        projectname: details.project_name,
        projectdetails: details.project_desc,
      });

      const response = await sendRequest(
        `http://localhost:5000/api/projects/`,
        'POST',
        sendThis,
        {
          'Content-Type': 'application/json',
        }
      );
      if (response !== undefined) {
        if (response.projectid > 0) {
          addNewMembership(parseInt(response.projectid));
        } else {
          setError('Could not add project');
        }
        props.setter((prevState) => {
          if (prevState !== null) {
            const newId = response.projectid;
            return {
              projects: [
                ...prevState.projects,
                {
                  id: newId,
                  name: details.project_name,
                  details: details.project_desc,
                },
              ],
            };
          } else {
            return {
              projects: [
                {
                  id: response.projectid,
                  name: details.project_name,
                  details: details.project_desc,
                },
              ],
            };
          }
        });
      }
    } catch (err) {
      setError(err.toString());
    }
  };
  const submitValue = () => {
    setError('');
    setInfo('');
    const details = {
      project_name: newProjectName,
      project_desc: newProjectDesc,
    };
    addNewProject(details);
  };
  function nameValidator() {
    if (newProjectName.length < 3) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <React.Fragment>
      <h3>Add New Project</h3>
      {error && <p>{error}</p>}
      {info && <p>{info.toString()}</p>}
      <input
        data-cy='newProjectInput'
        type='text'
        placeholder='New Project'
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <Button
        data-cy='addNewPorjectButton'
        className='roundButton'
        variant='primary'
        onClick={submitValue}
        disabled={nameValidator() ? true : ''}
      >
        +
      </Button>
    </React.Fragment>
  );
}
export default AddNewProject;
