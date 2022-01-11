// import Image from 'next/image';
import { MdLunchDining } from 'react-icons/md';

import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes['logo-container']}>
      {/* TODO REPLACE REACT ICON WITH SITE ICON IMAGE */}
      {/* <Image
        src='/'
        alt='site icon'
        width='24'
        height='24'
        layout='responsive'
      /> */}
      <MdLunchDining className={classes['logo-image']} />
      <h1 className={classes['logo-text']}>Lunch Break</h1>
    </div>
  );
};

export default Logo;
