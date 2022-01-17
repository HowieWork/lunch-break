import { useState, useEffect } from 'react';

import Notification from '../UI/Notification';

import classes from './SubscriptionForm.module.css';

const sendSubscriptionData = async (subscriptionDetail) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionDetail),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }
};

const SubscriptionForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const sendSubscriptionHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendSubscriptionData({ email: enteredEmail });
      setRequestStatus('success');
      setEnteredEmail('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending information...',
      message: 'Your info is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'You have subscribed successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  // CLEAR NOTIFICATION
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <section className={classes['section-sub']}>
      <h2>Join our newsletter!</h2>
      <p>
        Subscribe our newsletter to receive the latest popular news every week.
      </p>
      <form className={classes.form} onSubmit={sendSubscriptionHandler}>
        <label htmlFor='email'></label>
        <input
          type='email'
          id='email'
          placeholder='Enter your email'
          value={enteredEmail}
          onChange={(event) => {
            setEnteredEmail(event.target.value);
          }}
          required
        />
        <button type='submit'>Subscribe</button>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default SubscriptionForm;
