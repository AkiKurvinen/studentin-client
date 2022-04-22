import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth-context';
import { useHttpClient } from './http-hook';
import Login from './Login';

const Signup = (props) => {
  const [googleInfo, setGoogleInfo] = useState('');
  const [role, setRole] = useState('normal');
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(null);
  const { sendRequest } = useHttpClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkGoogleLogin = async (googleInfo) => {
    setError(null);
    if (isLoginMode) {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/google/login/`,
          'POST',
          JSON.stringify({
            googleid: googleInfo.googleId,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        if (!response.error) {
          auth.login(response.userId, response.token);
          props.imgsetter(googleInfo.imageUrl);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError(err.toString());
      }
    } else {
      try {
        var str = googleInfo.name;
        str = str.replace(/\s+/g, '').toLowerCase();
        str += googleInfo.googleId.slice(0, 3);

        if (googleInfo.googleId != null && googleInfo.googleId !== 0) {
          const response = await sendRequest(
            `${process.env.REACT_APP_BACKEND}/google/signup/`,
            'POST',
            JSON.stringify({
              fname: googleInfo.givenName,
              lname: googleInfo.familyName,
              email: googleInfo.email,
              username: str,
              title: role,
              googleid: googleInfo.googleId,
            }),
            {
              'Content-Type': 'application/json',
            }
          );

          auth.login(response.userId, response.token);
          props.imgsetter(googleInfo.imageUrl);
        }
      } catch (err) {
        setError(err.toString());
      }
    }
  };

  const onSubmit = async (data) => {
    setError(null);
    if (isLoginMode) {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/login`,
          'POST',
          JSON.stringify({
            username: data.username,
            password: data.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        if (!response.error) {
          auth.login(response.userId, response.token);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError(err.toString());
      }
    } else {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND}/users`,
          'POST',
          JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
            title: data.title,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(response.userId, response.token);
      } catch (err) {
        setError(err.toString());
      }
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const switchModeHandler = () => {
    setError(null);
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <>
      <div className='loginWrapper'>
        <div className='loginArea'>
          <img
            className='studentin_full_logo'
            src={'./img/studentin.svg'}
            alt='StudentIn logo'
          ></img>
          <h1> {isLoginMode ? 'Login' : 'Signup'}</h1>
          <div className='loginAreaContent'>
            {error && <p data-cy='errorP'>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <label>Username</label>
                <input
                  data-cy='usernameInput'
                  placeholder='username'
                  {...register('username', { required: true })}
                />
              </>
              <label>Password</label>
              <input
                data-cy='passwordInput'
                type='password'
                placeholder='password'
                {...register('password', { required: true })}
              />
              {!isLoginMode && (
                <>
                  <label>Repeat Password</label>
                  <input
                    data-cy='repeatpasswordInput'
                    type='password'
                    placeholder='repeat password'
                    {...register('password', { required: true })}
                  />
                </>
              )}
              {errors.exampleRequired && <span>This field is required</span>}
              <br />
              {!isLoginMode && (
                <select {...register('title')} onChange={handleChange}>
                  <option value='student'>Student</option>
                  <option value='instructor'>Instructor</option>
                  <option value='client'>Client</option>
                </select>
              )}
              <br />

              <Button
                as='input'
                variant='primary'
                type='submit'
                data-cy='submitButton'
                value={isLoginMode ? 'Login' : 'Sign up'}
              />
              <Login
                updategoogle={() => setGoogleInfo}
                checkGoogleLogin={(googleInfo) => checkGoogleLogin(googleInfo)}
              />
            </form>
            <Button
              data-cy='insteadButton'
              variant='outline-primary'
              className='insteadButton'
              onClick={switchModeHandler}
            >
              {isLoginMode ? 'Signup' : 'Login'} instead?
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
