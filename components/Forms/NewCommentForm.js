import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Notification from '../UI/Notification';

import classes from './NewCommentForm.module.css';

const sendCommentData = async (commentData) => {
  const response = await fetch(`/api/comments/${commentData.postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }
};

const NewCommentForm = (props) => {
  const { name, email } = props.user;

  // router.query.slug
  const router = useRouter();
  const postId = router.query.slug;

  const [enteredEmail, setEnteredEmail] = useState(email || '');
  const [enteredName, setEnteredName] = useState(name || '');
  const [enteredCommentDetail, setEnteredCommentDetail] = useState('');

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  // SUBMIT FORM
  const sendCommentHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendCommentData({
        postId: postId,
        email: enteredEmail,
        name: enteredName,
        commentDetail: enteredCommentDetail,
        date: new Date().toISOString(),
      });
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredName('');
      setEnteredCommentDetail('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  };

  // BETTER UX: PROVIDING USER FEEDBACK
  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending comment...',
      message: 'Your comment is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Comment sent successfully!',
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
    <div>
      <form className={classes.form} onSubmit={sendCommentHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your email</label>
            <input
              id='email'
              type='email'
              value={enteredEmail}
              onChange={(event) => {
                setEnteredEmail(event.target.value);
              }}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your name</label>
            <input
              id='name'
              type='text'
              value={enteredName}
              onChange={(event) => {
                setEnteredName(event.target.value);
              }}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='commentDetail'>Comment</label>
            <textarea
              id='commentDetail'
              row='5'
              value={enteredCommentDetail}
              onChange={(event) => {
                setEnteredCommentDetail(event.target.value);
              }}
              required
            />
          </div>
          <div className={classes.actions}>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
};

export default NewCommentForm;
