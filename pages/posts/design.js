import { Fragment } from 'react';
import Head from 'next/head';
import { getCategoryFeaturedPosts } from '../../lib/posts-util';
import Posts from '../../components/Posts/Posts';

const DesignFeaturedPosts = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Design Featured Posts</title>
        <meta name='description' content='A list of design featured posts' />
      </Head>
      <Posts title='Featured' posts={props.posts} />
    </Fragment>
  );
};

export function getStaticProps() {
  const designFeaturedPosts = getCategoryFeaturedPosts('design');
  return {
    props: {
      posts: designFeaturedPosts,
    },
  };
}

export default DesignFeaturedPosts;
