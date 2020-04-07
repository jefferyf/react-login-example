import React from 'react';

export const LoggedIn = (props) => {
  const { token, logoutHandler } = props;

  return (
    <div>
      <p>Logged In: {token}</p>
      <button onClick={logoutHandler}>Log Out</button>
    </div>    
  );
}