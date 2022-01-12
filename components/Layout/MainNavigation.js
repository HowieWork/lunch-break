import Link from 'next/link';
import Logo from './Logo';
import Footer from './Footer';

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
          SEARCH BLOG
        </div>
      </div>

      {/* C - NAVIGATION */}
      <nav className={classes['nav-container']}>
        <ul>
          {/* 1. ALL POSTS */}
          <div className={classes['nav-subcontainer']}>
            <li>
              <MdOutlineGridView />
              <Link href='/posts/design'>All posts</Link>
            </li>
          </div>
          {/* 2. FEATURED: DESIGN & PSYCHOLOGY */}
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

          {/* 3. PSYCHOLOGY: DESIGN */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Psychology</div>
            <li>
              <MdDevicesOther />
              <Link href='/'>Design & Develop Series</Link>
            </li>
          </div>

          {/* 4. CONTACT */}
          <div className={classes['nav-subcontainer']}>
            <div className={classes['nav-title']}>Contact</div>
            <li>
              <MdOutlineHelp />
              <Link href='/contact'>Get help</Link>
            </li>
          </div>
        </ul>
      </nav>

      {/* D - CTA */}
      <div className={classes['cta-container']}>
        <span>Sign in</span> | <span>Join us</span>
      </div>

      {/* E - FOOTER */}
      <Footer />
    </header>
  );
};

export default MainNavigation;
