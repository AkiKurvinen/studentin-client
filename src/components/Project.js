import React, { useState } from 'react';
import { useHttpClient } from './http-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditableField from './EditableField';
import ProjectMembers from './ProjectMembers';
function Project(props) {
  const { sendRequest } = useHttpClient();
  const [error, setError] = useState(null);
  const [alertDel, setAlertDel] = useState(false);
  const [pid, setPid] = useState(props.project_id);
  const [uid, setUid] = useState(props.user_id);

  const alertDelete = async (pid) => {
    setAlertDel(true);
  };

  const deleteProject = async (pid) => {
    setAlertDel(false);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/project/`,
        'DELETE',
        JSON.stringify({
          pid: pid,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      if (response !== undefined) {
        setPid(null);
      }
    } catch (err) {
      setError(err.toString());
    }
  };
  return (
    <React.Fragment>
      <div className='findme'>
        {pid && (
          <div className='case'>
            <div>
              <input
                type='checkbox'
                id={'project' + props.project_id}
                className='project-checkbox'
              />
              <h3>
                <label htmlFor={'project' + props.project_id}>
                  {props.name}
                </label>
              </h3>
              <div className='projectcontent'>
                <h5>Project details</h5>
                <EditableField
                  pid={pid}
                  name=''
                  data={props.details}
                  dbfield='details'
                  fieldType='textarea'
                ></EditableField>
                <ProjectMembers pid={pid} uid={uid} pidSetter={setPid} />
                <div className='projectOptionsBar'>
                  {!alertDel && (
                    <button
                      className='delProject roundButton'
                      onClick={function (event) {
                        alertDelete(props.project_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                  {alertDel && (
                    <>
                      <p>Delete project?</p>
                      <button
                        data-cy='deleteProject'
                        className='delProject'
                        onClick={function (event) {
                          deleteProject(props.project_id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className='delProject'
                        onClick={function (event) {
                          setAlertDel(false);
                        }}
                      >
                        No
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {!pid && <p>Project removed.</p>}
      </div>
    </React.Fragment>
  );
}

export default Project;
