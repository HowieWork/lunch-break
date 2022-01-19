import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import Logo from './Logo';
import Footer from './Footer';
import SearchForm from '../Forms/SearchForm';
import FilterForm from '../Forms/FilterForm';

import {
  MdBrush,
  MdPsychology,
  MdOutlineGridView,
  MdHouse,
  MdWork,
  MdOutlineHelp,
  MdOutlineSearch,
  MdDevicesOther,
} from 'react-icons/md';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    signOut();
  };

  const searchHandler = (keyword) => {
    // VALIDATING KEYWORD
    if (!keyword || keyword.trim() === '') {
      return;
    }

    const path = `/posts/search/${keyword}`;

    router.push(path);
  };

  const filterHandler = (year, month) => {
    const numYear = +year;
    const numMonth = +month;

    // VALIDATING YEAR & MONTH
    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2020 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return;
    }

    const path = `/posts/search/${numYear}/${numMonth}`;

    router.push(path);
  };

  return (
    <Fragment>
      {/* 1. NON-SIDE-DRAWER NAVIGATION */}
      <header className={classes['container']}>
        {/* HAMBURGER MENU */}
        <button
          className={classes['menu-button']}
          onClick={toggleDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={classes['subcontainer']}>
          {/* A - SITE LOGO */}
          <div className={classes['logo-container']}>
            <Link href='/'>
              <a>
                <Logo />
              </a>
            </Link>
            <div className={classes['logo-text']}>
              Focus on techies' work-life balance.
            </div>
          </div>

          {/* B - SEARCH & FILTER */}
          <div className={classes['search-container']}>
            <SearchForm onSearch={searchHandler} />
            <FilterForm onFilter={filterHandler} />
          </div>

          {/* C - NAVIGATION */}
          <nav className={classes['nav-container']}>
            <ul>
              {/* 1. ALL POSTS */}
              <div className={classes['nav-subcontainer']}>
                <li>
                  <MdOutlineGridView />
                  <Link href='/posts'>All posts</Link>
                </li>
              </div>

              {/* 2. FEATURED: DESIGN & PSYCHOLOGY */}
              <div className={classes['nav-subcontainer']}>
                <div className={classes['nav-title']}>Featured</div>
                <li>
                  <MdBrush />
                  <Link href='/posts/design'>Design</Link>
                </li>
                <li>
                  <MdPsychology />
                  <Link href='/posts/psychology'>Psychology</Link>
                </li>
              </div>

              {/* 3. DESIGN: HOME, OFFICE */}
              <div className={classes['nav-subcontainer']}>
                <div className={classes['nav-title']}>Design</div>
                <li>
                  <MdHouse />
                  <Link href='/posts/design/home'>Home</Link>
                </li>
                <li>
                  <MdWork />
                  <Link href='/posts/design/office'>Office | Workplace</Link>
                </li>
              </div>

              {/* 4. PSYCHOLOGY: DESIGN */}
              <div className={classes['nav-subcontainer']}>
                <div className={classes['nav-title']}>Psychology</div>
                <li>
                  <MdDevicesOther />
                  <Link href='/'>Design & Develop Series</Link>
                </li>
              </div>

              {/* 5. CONTACT */}
              <div className={classes['nav-subcontainer']}>
                <div className={classes['nav-title']}>Contact</div>
                <li>
                  <MdOutlineHelp />
                  <Link href='/contact'>Get help</Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>

        <div className={classes['subcontainer']}>
          {/* D - CTA */}
          <div className={classes['cta-container']}>
            {!session && !loading && (
              <Fragment>
                <li>
                  <Link href='/auth'>Sign in</Link>
                </li>
                {/* <span> | </span> */}
                <li>
                  <Link href='/auth'>Join us</Link>
                </li>
              </Fragment>
            )}
            {session && (
              <Fragment>
                <li>
                  <Link href='/profile'>Profile</Link>
                </li>
                {/* <span> | </span> */}
                <li>
                  <button onClick={logoutHandler}>Log out</button>
                </li>
              </Fragment>
            )}
          </div>

          {/* E - FOOTER */}
          <div className={classes['footer-container']}>
            <Footer />
          </div>
        </div>
      </header>

      {/* 2. SIDE-DRAWER NAVIGATION */}
    </Fragment>
  );
};

export default MainNavigation;
