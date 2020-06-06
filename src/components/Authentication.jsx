import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import SignIn from './SignIn';

const Authentication = ({ user, userLoaded }) => {
  // if (!userLoaded) return null;

  // const userInfo = user ? <CurrentUser {...user} /> : <SignInAndSignUp />;

  // return <div>{userLoaded ? userInfo : <SignInAndSignUp />}</div>;
  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
