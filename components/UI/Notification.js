import { useContext } from 'react';
import ReactDOM from 'react-dom';
import NotificationContext from '../../store/notification-context';
import Portal from '../../HOC/Portal';

import classes from './Notification.module.css';

const Notification = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  return (
    <Portal>
      <div
        className={`${classes.notification} ${statusClasses}`}
        onClick={notificationCtx.hideNotification}
      >
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </Portal>
  );
};

export default Notification;
