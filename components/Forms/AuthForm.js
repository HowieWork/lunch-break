import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import classes from './AuthForm.module.css';

const createUser = async (email, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
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
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

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
        // TODO SHOW FAILED LOGIN FEEDBACK TO USERS
        console.log(result.error);
        window.location.href = '/auth';
      }
      if (!result.error) {
        // TODO SHOW SUCCESS LOGIN FEEDBACK TO USERS
        console.log(result);
        window.location.href = '/';
      }
    }

    // SIGN UP MODE
    if (!isLogin) {
      // SEND POST REQUEST TO BE
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        // TODO SHOW SUCCESS SIGN UP FEEDBACK TO USERS
        console.log(result);
      } catch (error) {
        // TODO SHOW ERROR FEEDBACK TO USERS
        console.log(error);
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
