import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';
import Project from './Project';
import AddNewProject from './AddNewProject';

function MyProjects(props) {
  const { sendRequest } = useHttpClient();
  const [uid, setUid] = useState(props.id);
  const [myProjects, setMyProjects] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/myprojects/${uid}`
        );
        if (response.error !== undefined) {
          setError(response.error.toString());
        } else {
          setMyProjects(response);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, uid]);

  return (
    <React.Fragment>
      <h3>My Projects</h3>
      {error && <p className='error'>{error}</p>}

      {myProjects &&
        myProjects.projects.map((e, index) => {
          return (
            <Project
              key={'project' + index}
              name={e.name}
              project_id={e.id}
              details={e.details}
              user_id={uid}
            ></Project>
          );
        })}

      <AddNewProject id={uid} setter={setMyProjects}></AddNewProject>
    </React.Fragment>
  );
}
export default MyProjects;
