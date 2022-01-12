import Link from 'next/link';
import Image from 'next/image';

import classes from './PostItem.module.css';

const PostItem = (props) => {
  // GETTING POST DATA
  const { title, image, excerpt, date, slug } = props.post;

  // FORMATTING DATE
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  // IMAGE FILE PATH
  const imagePath = `/images/posts/${slug}/${image}`;

  // POST LINK PATH
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={320}
              height={100}
              layout='responsive'
              objectFit='cover'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
