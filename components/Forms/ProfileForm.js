import { useRef } from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = (props) => {
  const newPassword = useRef();
  const oldPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPassword.current.value;
    const enteredNewPassword = newPassword.current.value;

    // OPTIONAL: ADD VALIDATION

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New password</label>
        <input ref={newPassword} id='new-password' type='password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old password</label>
        <input ref={oldPassword} id='old-password' type='password' />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
