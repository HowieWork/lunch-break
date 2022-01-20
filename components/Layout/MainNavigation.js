import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdMenu, MdClose } from 'react-icons/md';

import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawerHandler = () => {
    console.log('CLICKED!!!');
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <header>
      {/* 1. NON-SIDE-DRAWER NAVIGATION */}
      <div className={classes['non-slide-nav']}>
        <NavLinks />
      </div>

      {/* 2. SIDE-DRAWER NAVIGATION */}
      {/* HAMBURGER MENU: TOGGLE SIDE DRAWER */}
      <div className={classes['hamburger-menu-container']}>
        <div>
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
      </div>

      {/* MENU-BTN-BG */}
      {!isDrawerOpen && <div className={classes['menu-btn-bg']}></div>}

      {/* BACKDROP */}
      {isDrawerOpen && (
        <div
          className={classes['backdrop']}
          onClick={toggleDrawerHandler}
        ></div>
      )}

      {/* SIDE-DRAWER */}
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
