import PostsGrid from '../Posts/PostsGrid';

import classes from './FeaturedPosts.module.css';

const FeaturedPosts = (props) => {
  return (
    <section className={classes['section-featured']}>
      <h2>FEATURED POSTS</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
