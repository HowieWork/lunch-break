import { Fragment } from 'react';
import Head from 'next/head';
import AllPosts from '../../components/Posts/AllPosts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='A list of all posts' />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
}

export default AllPostsPage;
