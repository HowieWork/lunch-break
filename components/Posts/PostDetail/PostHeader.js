import Image from 'next/image';

import classes from './PostHeader.module.css';

const PostHeader = (props) => {
  const { title, image } = props;

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
      <h1 className={classes['title']}>{title}</h1>
    </header>
  );
};

export default PostHeader;
