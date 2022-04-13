import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth-context';
import { useHttpClient } from './http-hook';

const Signup = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(null);
  const { sendRequest } = useHttpClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    setError(null);
    if (isLoginMode) {
      try {
        const response = await sendRequest(
          'http://localhost:5000/api/login',
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
          'http://localhost:5000/api/users',
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
        console.log(err.toString());
        setError(err.toString());
      }
    }
  };

  const switchModeHandler = () => {
    setError(null);
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <>
      <h1> {isLoginMode ? 'Login' : 'Signup'}</h1>
      <div className='loginWrapper'>
        <div className='loginArea'>
          <div className='loginAreaContent'>
            {error && <p data-cy='errorP'>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <label>Username</label>
                <input
                  data-cy='usernameInput'
                  defaultValue='Alfa'
                  placeholder='username'
                  {...register('username', { required: true })}
                />
              </>
              <label>Password</label>
              <input
                data-cy='passwordInput'
                type='password'
                defaultValue='Alfa'
                placeholder='password'
                {...register('password', { required: true })}
              />
              {!isLoginMode && (
                <>
                  <label>Repeat Password</label>
                  <input
                    data-cy='repeatpasswordInput'
                    type='password'
                    defaultValue='Alfa'
                    placeholder='repeat password'
                    {...register('password', { required: true })}
                  />
                </>
              )}
              {errors.exampleRequired && <span>This field is required</span>}
              <br />
              {!isLoginMode && (
                <select {...register('title')}>
                  <option value='student'>Student</option>
                  <option value='instructor'>Instructor</option>
                  <option value='client'>Client</option>
                  <option value='admin'>Admin</option>
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
