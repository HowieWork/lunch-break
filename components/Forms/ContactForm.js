import { useState, useContext } from 'react';

import NotificationContext from '../../store/notification-context';

import classes from './ContactForm.module.css';

const sendContentData = async (contactDetail) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactDetail),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }
};

const ContactForm = () => {
  const notificationCtx = useContext(NotificationContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    });

    try {
      await sendContentData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      notificationCtx.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Message sent successfully!',
      });

      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
    } catch (error) {
      notificationCtx.showNotification({
        status: 'error',
        title: 'Error!',
        message: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <section className={classes.container}>
      <h2>How can I help you?</h2>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Message</label>
            <textarea
              id='message'
              rows='6'
              required
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={classes.actions}>
          <button type='submit'>Send message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
