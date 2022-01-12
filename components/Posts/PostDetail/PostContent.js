import ReactMarkdown from 'react-markdown';

import PostHeader from './PostHeader';

import classes from './PostContent.module.css';
import React from 'react';

const PostContent = (props) => {
  const { post } = props;

  // COVER IMAGE PATH
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <div className={classes['container']}>
      <aside className={classes['side-bar-container']}>STATUS</aside>
      <article className={classes['post-container']}>
        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default PostContent;
