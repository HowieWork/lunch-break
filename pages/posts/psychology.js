import { Fragment } from 'react';
import Head from 'next/head';
import { getCategoryFeaturedPosts } from '../../lib/posts-util';
import FeaturedPosts from '../../components/HomePage/FeaturedPosts';

const PsychologyFeaturedPosts = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Psychology Featured Posts</title>
        <meta
          name='description'
          content='A list of psychology featured posts'
        />
      </Head>
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
};

export function getStaticProps() {
  const psychologyFeaturedPosts = getCategoryFeaturedPosts('psychology');
  return {
    props: {
      posts: psychologyFeaturedPosts,
    },
  };
}

export default PsychologyFeaturedPosts;
