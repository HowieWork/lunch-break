import { Fragment } from 'react';

import Hero from '../components/HomePage/Hero';
import Subscription from '../components/HomePage/Subscription';
import FeaturedPosts from '../components/HomePage/FeaturedPosts';

import { getAllFeaturedPosts } from '../lib/posts-util';

const HomePage = (props) => {
  return (
    <Fragment>
      <Hero />
      <Subscription />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
};

export function getStaticProps() {
  const allFeaturedPosts = getAllFeaturedPosts();

  return {
    props: {
      posts: allFeaturedPosts,
    },
    revalidate: 60,
  };
}

export default HomePage;
