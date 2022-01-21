import { Fragment } from 'react';
import Head from 'next/head';
import { getCategoryFeaturedPosts } from '../../lib/posts-util';
import Posts from '../../components/Posts/Posts';

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
      <Posts title='Featured' posts={props.posts} />
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
