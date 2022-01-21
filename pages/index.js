import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../components/HomePage/Hero';
import SubscriptionForm from '../components/Forms/SubscriptionForm';
import Posts from '../components/Posts/Posts';

import { getAllFeaturedPosts } from '../lib/posts-util';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Lunch Break - built with Next</title>
        <meta
          name='description'
          content='A blog site focusing on work-life balance. Its content is around three topics: design, psychology and community.'
        />
      </Head>
      {/* INTRO OF WEBSITE */}
      <Hero />
      {/* NEWSLETTER SUBSCRIPTION */}
      <SubscriptionForm />
      {/* FEATURED POSTS */}
      <Posts title='Featured' posts={props.posts} />
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
