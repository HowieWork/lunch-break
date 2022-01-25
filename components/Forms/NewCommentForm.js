import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import NotificationContext from '../../store/notification-context';

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
  const notificationCtx = useContext(NotificationContext);

  const { email, name } = props.user;

  // router.query.slug
  const router = useRouter();
  const postId = router.query.postSlug;

  const [enteredEmail, setEnteredEmail] = useState(email || '');
  const [enteredName, setEnteredName] = useState(name || '');
  const [enteredCommentDetail, setEnteredCommentDetail] = useState('');

  // SUBMIT FORM
  const sendCommentHandler = async (event) => {
    event.preventDefault();

    notificationCtx.showNotification({
      status: 'pending',
      title: 'Sending comment...',
      message: 'Your comment is on its way!',
    });

    try {
      await sendCommentData({
        postId: postId,
        email: enteredEmail,
        name: enteredName,
        commentDetail: enteredCommentDetail,
        date: new Date().toISOString(),
      });

      notificationCtx.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Comment sent successfully!',
      });

      setEnteredEmail('');
      setEnteredName('');
      setEnteredCommentDetail('');
    } catch (error) {
      notificationCtx.showNotification({
        status: 'error',
        title: 'Error!',
        message: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email:</label>
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
          <label htmlFor='name'>Your name:</label>
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
          <label htmlFor='commentDetail'>Comment:</label>
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
      </div>
      <div className={classes.actions}>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
