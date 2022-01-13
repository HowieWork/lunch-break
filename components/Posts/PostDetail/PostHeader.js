import Image from 'next/image';

import classes from './PostHeader.module.css';

const PostHeader = (props) => {
  // EXTRACT POST HEADER INFO
  const { title, image, date, duration } = props;

  // FORMAT DATE
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <header>
      {/* COVER IMAGE */}
      <div className={classes['image']}>
        <Image
          src={image}
          alt={title}
          width={320}
          height={60}
          layout='responsive'
          objectFit='cover'
        />
      </div>
      {/* POST TITLE */}
      <h1 className={classes.title}>{title}</h1>
      {/* DATE AND DURATION */}
      <div className={classes['date-duration']}>
        {formattedDate} | {duration}
      </div>
    </header>
  );
};

export default PostHeader;
