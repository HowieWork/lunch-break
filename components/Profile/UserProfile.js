import ProfileForm from '../Forms/ProfileForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.container}>
      <h2>Profile</h2>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
