import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';
import FetchUsers from './FetchUsers.js';
import Button from 'react-bootstrap/Button';
import EditableField from './EditableField.js';
import EditSkills from './EditSkills.js';
import MyProjects from './MyProjects.js';

function ProjectMembers(props) {
  const { sendRequest } = useHttpClient();
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [membersData, setMembersData] = useState();
  const [pid, setPid] = useState(props.pid);
  const [uid, setUid] = useState(props.uid);
  const [newMember, setNewMember] = useState('');
  const [newMemberAdded, setNewMemberAdded] = useState(false);
  const [leaveWarning, setLeaveWarning] = useState(false);
  const removeMember = async (deluid) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/membership/`,
        'DELETE',
        JSON.stringify({
          pid: pid,
          uid: deluid,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      if (response !== undefined && response.success.length > 0) {
        try {
          const members = await sendRequest(
            `${process.env.REACT_APP_BACKEND}/members/${pid}`
          );

          // last person left project
          if (members !== undefined && members.members.length === 0) {
            // delete project with no members

            try {
              const response = await sendRequest(
                `${process.env.REACT_APP_BACKEND}/projects/empty/`,
                'DELETE',
                null,
                {
                  'Content-Type': 'application/json',
                }
              );
              if (response !== undefined) {
                console.log(response);
              }
            } catch (error) {
              console.log(error);
            }
            props.pidSetter(0);
          } else {
            setMembersData(members);
          }
        } catch (err) {
          setError(err.toString());
        }
      }
    } catch (err) {
      setError(err.toString());
    }
  };

  function memberValidator() {
    if (newMember.length < 1) {
      return true;
    } else {
      return false;
    }
  }
  const submitValue = () => {
    setError('');
    const details = {
      member: newMember,
    };
    addNewMember(details.newMember);
    setNewMember('');
  };
  const addNewMember = async () => {
    const addNewMembership = async (pid, userid) => {
      const myrole = uid === userid ? 'creator' : 'normal';

      if (uid !== userid) {
        try {
          const sendThis = JSON.stringify({
            uid: userid,
            pid: pid,
            role: myrole,
          });

          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND}/memberships/`,
            'POST',
            sendThis,
            {
              'Content-Type': 'application/json',
            }
          );
          if (response !== undefined) {
            setInfo('Added project with id ' + response.response.toString());

            if (response.response === 'Membership added') {
              setInfo('Membership added!');
              setNewMemberAdded(!newMemberAdded);
            }
          }
        } catch (err) {
          setError(err.toString());
        }
      } else {
        setError('You created this project!');
      }
    };
    const getUidByNameEmail = async (newMember) => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/find/${newMember}`
        );

        if (response.error !== undefined) {
          setError(response.error);
        } else {
          return response.users[0].id;
        }
      } catch (err) {
        setError(err.toString());
        return 0;
      }
    };

    const newMemberId = await getUidByNameEmail(newMember);

    // Find if the array contains an object by comparing the property value
    if (membersData.members.some((person) => person.id === newMemberId)) {
      setError('Person added!');
    } else if (newMemberId === 0 || newMemberId === undefined) {
      setError('No user found');
    } else {
      addNewMembership(pid, newMemberId);
    }
  };

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const members = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/members/${pid}`
        );
        setMembersData(members);
      } catch (err) {}
    };
    fetchProjectMembers();
  }, [sendRequest, pid, newMemberAdded]);
  return (
    <>
      <div className='members'>
        <h5>Project members</h5>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
            {membersData &&
              membersData.members.map((e, index) => {
                return (
                  <tr key={index}>
                    <td key={e.username}>{e.username}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>
                      {e.id !== uid && (
                        <Button
                          variant='danger'
                          className='member_del'
                          onClick={function (event) {
                            removeMember(e.id);
                          }}
                        >
                          Kick
                        </Button>
                      )}
                      {e.id === uid && !leaveWarning && (
                        <Button
                          variant='danger'
                          className='member_del'
                          onClick={function (event) {
                            setLeaveWarning(true);
                          }}
                        >
                          Leave
                        </Button>
                      )}
                      {e.id === uid && leaveWarning && (
                        <>
                          <p>
                            Are you sure to leave project?<br></br>Project with
                            no members will be deleted.
                          </p>
                          <Button
                            variant='danger'
                            onClick={function (event) {
                              removeMember(e.id);
                            }}
                          >
                            Yes, leave project
                          </Button>
                          <Button
                            onClick={function (event) {
                              setLeaveWarning(false);
                            }}
                          >
                            No
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className='addNewMember'>
          <p>
            <b>Add new member</b>
          </p>
          <input
            type='text'
            placeholder='username/email'
            value={newMember}
            data-cy='add-member-field'
            onChange={(e) => setNewMember(e.target.value)}
          />
          <Button
            variant='primary'
            onClick={submitValue}
            disabled={memberValidator() ? true : ''}
          >
            Add
          </Button>
          {error && <p>{error}</p>}
          {info && <p>{info}</p>}
        </div>
      </div>
    </>
  );
}
export default ProjectMembers;
