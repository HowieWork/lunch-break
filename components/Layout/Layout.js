import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <main className={classes['main-container']}>{props.children}</main>
    </div>
  );
};

export default Layout;
