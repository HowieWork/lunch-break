import { useState, useEffect } from 'react';

import ProfileForm from '../Forms/ProfileForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const changePasswordHandler = async (passwordData) => {
    console.log('TESTING');
    console.log(passwordData);
    const response = await fetch('/api/user/password/reset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    console.log(data);

    //TODO ADD USER FEEDBACK: YOUR PASSWORD HAS BEEN UPDATED OR NOT
  };

  return (
    <div>
      <h2>USER PROFILE</h2>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </div>
  );
};

export default UserProfile;
