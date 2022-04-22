import React from 'react';

import { useGoogleLogin } from 'react-google-login';

// refresh token
import { refreshTokenSetup } from './refreshToken';

const clientId =
  '145839285893-3nji7qhivmfcbhvgmh194m776hhill9n.apps.googleusercontent.com';

function LoginHooks(props) {
  const onSuccess = (res) => {
    props.updategoogle(res.profileObj);

    refreshTokenSetup(res);
    props.checkGoogleLogin(res.profileObj);
  };

  const onFailure = (res) => {
    alert(`Failed to login.`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className='googlebutton'>
      <img src='img/google.svg' alt='google login' className='icon'></img>
      <span className='buttonText'>Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
