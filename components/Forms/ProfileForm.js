import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New password</label>
        <input id='new-password' type='password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old password</label>
        <input id='old-password' type='password' />
      </div>
      <div className={classes.action}>
        <button>Change password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
