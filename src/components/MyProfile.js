import React, { useContext } from 'react';
import AuthContext from '../context/auth-context.js';
import MyDetails from './MyDetails.js';
const MyProfile = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext;

  if (authContext.isLoggedIn) {
    return (
      <React.Fragment>{userId && <MyDetails id={userId} />}</React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Auth FAILED</p>
      </React.Fragment>
    );
  }
};
export default MyProfile;
