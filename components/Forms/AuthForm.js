import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import NotificationContext from '../../store/notification-context';

import classes from './AuthForm.module.css';

const createUser = async (email, name, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
};

const AuthForm = () => {
  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      status: 'pending',
      title: isLogin ? 'Log in' : 'Sign up',
      message: 'Your info is on its way!',
    });

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // OPTIONAL: ADD VALIDATION

    // LOG IN MODE
    if (isLogin) {
      // WORKING WITH NEXT-AUTH
      // NOTE RESULT WILL ALWAYS RETURN A PROMISE 'OK:TRUE' BUT DIFFERENT ERROR MESSAGE
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      // ERROR: NULL LOG IN SUCCESSFULLY
      if (result.error) {
        // SHOW FAILED LOGIN FEEDBACK TO USERS
        notificationCtx.showNotification({
          status: 'error',
          title: 'Error!',
          message: result.error || 'Something went wrong!',
        });

        router.replace('/auth');
      }
      if (!result.error) {
        // SHOW SUCCESS LOGIN FEEDBACK TO USERS
        notificationCtx.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'You have logged in successfully!',
        });

        router.replace('/profile');
      }
    }

    // SIGN UP MODE
    if (!isLogin) {
      const enteredName = nameInputRef.current.value;

      // SEND POST REQUEST TO BE
      try {
        const result = await createUser(
          enteredEmail,
          enteredName,
          enteredPassword
        );

        // SHOW SUCCESS SIGN UP FEEDBACK TO USERS
        notificationCtx.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'You have signed up successfully!',
        });
      } catch (error) {
        // SHOW ERROR FEEDBACK TO USERS
        notificationCtx.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Something went wrong!',
        });
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='name' id='name' required />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passwordInputRef}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
