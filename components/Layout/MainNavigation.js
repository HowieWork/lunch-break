import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdMenu, MdClose } from 'react-icons/md';

import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <header className={classes.container}>
      {/* 1. NON-SIDE-DRAWER NAVIGATION */}
      <div className={classes['non-slide-nav']}>
        <NavLinks />
      </div>

      {/* 2. SIDE-DRAWER NAVIGATION */}
      {/* 1) MENU BTN *TOGGLE SIDE DRAWER */}
      <div className={classes['hamburger-menu-container']}>
        {!isDrawerOpen && (
          <MdMenu
            className={classes['menu-btn']}
            onClick={toggleDrawerHandler}
          />
        )}
        {isDrawerOpen && (
          <MdClose
            className={classes['menu-btn']}
            onClick={toggleDrawerHandler}
          />
        )}
      </div>

      {/* 2) MENU-BTN-BG */}
      {!isDrawerOpen && <div className={classes['menu-btn-bg']}></div>}

      {/* BACKDROP */}
      {isDrawerOpen && (
        <div
          className={classes['backdrop']}
          onClick={toggleDrawerHandler}
        ></div>
      )}

      {/* 3) SIDE-DRAWER */}
      <CSSTransition
        in={isDrawerOpen}
        timeout={300}
        classNames='slide-in-left'
        mountOnEnter
        unmountOnExit
      >
        <NavLinks onClick={toggleDrawerHandler} />
      </CSSTransition>
    </header>
  );
};

export default MainNavigation;
