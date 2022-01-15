import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';

import ProfileForm from '../Forms/ProfileForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      }
      if (session) {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    // TODO STYLING LOADING
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>USER PROFILE</h2>
      <ProfileForm />
    </div>
  );
};

export default UserProfile;
