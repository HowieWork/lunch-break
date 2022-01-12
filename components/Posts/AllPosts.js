import PostsGrid from './PostsGrid';

import classes from './AllPosts.module.css';

const AllPosts = (props) => {
  const { posts } = props;

  return (
    <section className={classes['section-all-posts']}>
      <h2>All Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
