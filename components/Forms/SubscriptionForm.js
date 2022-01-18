import { useState, useContext } from 'react';

import NotificationContext from '../../store/notification-context';

import classes from './SubscriptionForm.module.css';

const sendSubscriptionData = async (subscriptionDetail) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionDetail),
  });

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  const data = await response.json();

  return data;
};

const SubscriptionForm = () => {
  const notificationCtx = useContext(NotificationContext);

  const [enteredEmail, setEnteredEmail] = useState('');

  const sendSubscriptionHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      status: 'pending',
      title: 'Registering for newsletter.',
      message: 'Your info is on its way!',
    });

    try {
      await sendSubscriptionData({ email: enteredEmail });

      notificationCtx.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'You have subscribed successfully!',
      });

      setEnteredEmail('');
    } catch (error) {
      notificationCtx.showNotification({
        status: 'error',
        title: 'Error!',
        message: error.message || 'Something went wrong!',
      });
    }
  };

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
    </section>
  );
};

export default SubscriptionForm;
