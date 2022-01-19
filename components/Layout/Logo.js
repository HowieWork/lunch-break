// import Image from 'next/image';
import { MdLunchDining } from 'react-icons/md';

import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      {/* TODO REPLACE REACT ICON WITH SITE ICON IMAGE */}
      {/* <Image
        src='/'
        alt='site icon'
        width='24'
        height='24'
        layout='responsive'
      /> */}
      <MdLunchDining className={classes.image} />
      <h1 className={classes.text}>
        Lunch Break <span>BETA</span>
      </h1>
    </div>
  );
};

export default Logo;
