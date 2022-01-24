import { Fragment } from 'react';
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
  MdDevicesOther,
} from 'react-icons/md';

import classes from './NavLinks.module.css';

const NavLinks = (props) => {
  const [session, loading] = useSession();
  const router = useRouter();

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
    <div className={classes['container']}>
      <div className={classes['subcontainer']}>
        {/* A - SITE LOGO */}
        <div className={classes['logo-container']} onClick={props.onClick}>
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
          <SearchForm
            onSearch={searchHandler}
            closeSideDrawer={props.onClick}
          />
          <FilterForm
            onFilter={filterHandler}
            closeSideDrawer={props.onClick}
          />
        </div>

        {/* C - NAVIGATION */}
        <nav className={classes['nav-container']}>
          <ul>
            {/* 1. ALL POSTS */}
            <div className={classes['nav-subcontainer']}>
              <li onClick={props.onClick}>
                <MdOutlineGridView />
                <Link href='/posts'>All Posts</Link>
              </li>
            </div>

            {/* 2. FEATURED: DESIGN & PSYCHOLOGY */}
            <div className={classes['nav-subcontainer']}>
              <div className={classes['nav-title']}>Featured</div>
              <li onClick={props.onClick}>
                <MdBrush />
                <Link href='/posts/design'>Design</Link>
              </li>
              <li onClick={props.onClick}>
                <MdPsychology />
                <Link href='/posts/psychology'>Psychology</Link>
              </li>
            </div>

            {/* 3. DESIGN: HOME, OFFICE */}
            {/* NOTE CURRENTLY DISABLED LINKS */}
            <div className={classes['nav-subcontainer']}>
              <div className={classes['nav-title']}>Design</div>
              <li onClick={props.onClick}>
                <MdHouse />
                <Link href='/posts/design/home'>
                  <a className={classes['disabled-link']}>Home</a>
                </Link>
              </li>
              <li onClick={props.onClick}>
                <MdWork />
                <Link href='/posts/design/office'>
                  <a className={classes['disabled-link']}>Office | Workplace</a>
                </Link>
              </li>
            </div>

            {/* 4. PSYCHOLOGY: DESIGN */}
            {/* NOTE CURRENTLY DISABLED LINKS */}
            <div className={classes['nav-subcontainer']}>
              <div className={classes['nav-title']}>Psychology</div>
              <li onClick={props.onClick}>
                <MdDevicesOther />
                <Link href='/'>
                  <a className={classes['disabled-link']}>
                    Design & Develop Series
                  </a>
                </Link>
              </li>
            </div>

            {/* 5. CONTACT */}
            <div className={classes['nav-subcontainer']}>
              <div className={classes['nav-title']}>Contact</div>
              <li onClick={props.onClick}>
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
              <li onClick={props.onClick}>
                <Link href='/auth'>Sign in</Link>
              </li>
              <li onClick={props.onClick}>
                <Link href='/auth'>Join us</Link>
              </li>
            </Fragment>
          )}
          {session && (
            <Fragment>
              <li onClick={props.onClick}>
                <Link href='/profile'>Profile</Link>
              </li>
              <li onClick={props.onClick}>
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
    </div>
  );
};

export default NavLinks;
