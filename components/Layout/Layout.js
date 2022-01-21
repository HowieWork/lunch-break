import { Fragment, useContext } from 'react';

import MainNavigation from './MainNavigation';
import Notification from '../UI/Notification';
import NotificationContext from '../../store/notification-context';

import classes from './Layout.module.css';

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <div className={classes.layout}>
      <MainNavigation />

      <main className={classes['main-container']}>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </div>
  );
};

export default Layout;
