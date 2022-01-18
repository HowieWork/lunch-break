import { useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';

import classes from './ProfileForm.module.css';

const sendUpdatedPasswordData = async (passwordData) => {
  const response = await fetch('/api/user/password/reset', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwordData),
  });

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  const data = await response.json();

  return data;
};

const ProfileForm = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      status: 'pending',
      title: 'Reset password',
      message: 'Your info is on its way!',
    });

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // OPTIONAL: ADD VALIDATION

    try {
      await sendUpdatedPasswordData({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });

      notificationCtx.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'You have reset your password successfully!',
      });

      // RESET REF VALUES
      oldPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
    } catch (error) {
      notificationCtx.showNotification({
        status: 'error',
        title: 'Error!',
        message: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New password</label>
        <input ref={newPasswordRef} id='new-password' type='password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old password</label>
        <input ref={oldPasswordRef} id='old-password' type='password' />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
