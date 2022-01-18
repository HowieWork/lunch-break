import PostsGrid from './PostsGrid';

import classes from './Posts.module.css';

const Posts = (props) => {
  const { title, posts } = props;

  return (
    <section className={classes['section-posts']}>
      <h2>{title}</h2>
      {posts.length !== 0 && <PostsGrid posts={posts} />}
      {posts.length === 0 && <div>No post found!</div>}
    </section>
  );
};

export default Posts;
