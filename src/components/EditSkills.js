import React, { useState, useEffect } from 'react';
import { useHttpClient } from './http-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from './SvgIcon.js';
import Button from 'react-bootstrap/Button';

function EditSkills(props) {
  const { sendRequest } = useHttpClient();
  const [uid, setUid] = useState(props.id);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [newskill, setNewskill] = useState('');
  const [newSkillAdded, setNewSkillAdded] = useState(false);

  function skillValidator() {
    if (newskill.length < 1) {
      return true;
    } else {
      return false;
    }
  }
  function clickAlert(skilldataId, skilldataUid) {
    deleteData(skilldataId, skilldataUid);
  }

  const deleteData = async (skilldataId, skilldataUid) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/talents/`,
        'DELETE',
        JSON.stringify({
          skilldataId: skilldataId,
          skilldataUid: skilldataUid,
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
        const skills = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/${uid}/skills`
        );
        return skills;
      } catch (err) {}
    };
    const newData = await fetchUsers();
    setUserData(newData);
  };
  const submitValue = () => {
    setError('');
    setInfo('');
    const details = {
      skill: newskill,
    };
    addNewSkill(details.skill);
    setNewskill('');
  };

  const addNewSkill = async (skillname) => {
    async function newSkillToDB(skillname, category) {
      try {
        let sendThis;
        if (category == null) {
          sendThis = JSON.stringify({
            skill: skillname,
            cat: 'other',
          });
        } else {
          sendThis = JSON.stringify({
            skill: skillname,
          });
        }

        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/skills/`,
          'POST',
          sendThis,
          {
            'Content-Type': 'application/json',
          }
        );
        if (response !== undefined) {
          return response;
        }
      } catch (err) {
        return err;
      }
    }
    // get skill id
    let sid = 0;
    try {
      const request = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/skills/${skillname}`
      );
      if (request !== undefined && request.skillid > 0) {
        sid = parseInt(request.skillid);
      } else if (request.skillid === 0) {
        // if id not found, add new skill

        const res = await newSkillToDB(skillname, null);

        if (res !== undefined) {
          sid = parseInt(res.id);
        } else {
          setError('Could not add new skill.');
        }
      }
    } catch (err) {
      setError(err.toString());
    }

    // update skill to talents
    if (sid !== 0) {
      try {
        const sendThis = JSON.stringify({
          user_id: uid,
          skill_id: sid,
        });

        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/talents/`,
          'POST',
          sendThis,
          {
            'Content-Type': 'application/json',
          }
        );
        if (response) {
          setInfo(response.message.toString());
          setNewSkillAdded(!newSkillAdded);
        }
      } catch (err) {
        setError(err.toString());
      }
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const skills = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/user/${uid}/skills`
        );
        if (skills.error) {
          setError(skills.error);
        } else {
          setUserData(skills);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, uid, newSkillAdded]);
  return (
    <>
      <h3 data-cy='myskillsH3'>My skills</h3>
      {userData && (
        <SkillsList data={userData} myId={uid} onChildClick={clickAlert} />
      )}
      {error && <p>{error}</p>}
      {info && <p>{info}</p>}
      <div id='addNewSkill'>
        <label>Add Skill</label>
        <input
          data-cy='skillInputField'
          type='text'
          placeholder='skill'
          value={newskill}
          onChange={(e) => setNewskill(e.target.value)}
        />

        <Button
          data-cy='addskillButton'
          variant='primary'
          onClick={submitValue}
          disabled={skillValidator() ? true : ''}
        >
          Add
        </Button>
      </div>
    </>
  );
}
const SkillsList = (props) => {
  if (props.data === 0) {
    return <p>No skills found.</p>;
  }

  return (
    <div className='skillList'>
      {props.data.skills.map(function (skilldata, index) {
        return (
          <div
            className={'skilltag' + ' skill-' + skilldata.category}
            title={skilldata.skill}
            key={skilldata.skill_id}
          >
            {['adobe', 'office'].includes(skilldata.category) ? (
              <SvgIcon icon={skilldata.skill} cat={skilldata.category} />
            ) : (
              <label>{skilldata.skill}</label>
            )}

            <button
              data-cy={`delete-${skilldata.skill}-button`}
              onClick={function (event) {
                props.onChildClick(
                  skilldata.skill_id,
                  skilldata.user_id,
                  event
                );
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default EditSkills;
