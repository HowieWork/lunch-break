import Link from 'next/link';
import Logo from './Logo';

import {
  MdBrush,
  MdPsychology,
  MdCallMade,
  MdOutlineGridView,
  MdHouse,
  MdWork,
  MdOutlineHelp,
  MdOutlineSearch,
} from 'react-icons/md';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes['header-container']}>
      {/* A - SITE LOGO */}
      <div className={classes['logo-container']}>
        <Link href='/'>
          <a>
            <Logo />
          </a>
        </Link>
        <div className={classes['logo-text']}>
          A blog site focus on work-life balance.
        </div>
      </div>

      {/* TODO B - SEARCH */}
      <div className={classes['search-container']}>
        <div className='center-flex-row tiny-gap'>
          <span>
            <MdOutlineSearch size='1.6rem' />
          </span>
          SEARCH BAR
        </div>
      </div>

      {/* C - NAVIGATION */}
      <nav className={classes['nav-container']}>
        <ul>
          {/* 1. FEATURED: DESIGN & PSYCHOLOGY */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Featured</div>
            <li>
              <MdBrush />
              <Link href='/'>Design</Link>
            </li>
            <li>
              <MdPsychology />
              <Link href='/'>Psychology</Link>
            </li>
          </div>

          {/* 2. DESIGN: ALL POSTS, HOME, OFFICE */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Design</div>
            <li>
              <MdOutlineGridView />
              <Link href='/posts/design'>All posts</Link>
            </li>
            <li>
              <MdHouse />
              <Link href='/posts/design/home'>Home</Link>
            </li>
            <li>
              <MdWork />
              <Link href='/posts/design/office'>Office</Link>
            </li>
          </div>

          {/* 3. PSYCHOLOGY: ALL POSTS, DESIGN */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Psychology</div>
            <li>
              <MdOutlineGridView />
              <Link href='/'>All posts</Link>
            </li>
            <li>
              <MdBrush />
              <Link href='/'>Design</Link>
            </li>
          </div>

          {/* 4. CONTACT */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Contact</div>
            <li>
              <MdOutlineHelp />
              <Link href='/contact'>Get help</Link>
            </li>
            <li>
              <Link href='/'>
                <a>
                  Discord
                  <MdCallMade />
                </a>
              </Link>
            </li>
          </div>
        </ul>
      </nav>

      {/* D - CTA */}
      <div className={classes['cta-container']}>
        <span>Sign in</span> | <span>Join us</span>
      </div>
    </header>
  );
};

export default MainNavigation;
