import ReactDOM from 'react-dom';

import classes from './Notification.module.css';

const Notification = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  return (
    <div className={`${classes.notification} ${statusClasses}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
