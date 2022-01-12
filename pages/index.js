import { Fragment } from 'react';

import Hero from '../components/HomePage/Hero';
import Subscription from '../components/HomePage/Subscription';
import FeaturedPosts from '../components/HomePage/FeaturedPosts';

const DUMMY_POSTS = [
  {
    slug: 'lunch-break-post-1',
    title: 'Lunch Break Post 1',
    image: 'lunch-break-post-1.jpg',
    excerpt: 'This is lunch break post 1. SOME TEXT SOME TEXT SOME TEXT',
    date: '2022-01-12',
  },
  {
    slug: 'lunch-break-post-2',
    title: 'Lunch Break Post 2',
    image: 'lunch-break-post-2.jpg',
    excerpt:
      'This is lunch break post 2. SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT',
    date: '2022-01-12',
  },
  {
    slug: 'lunch-break-post-3',
    title: 'Lunch Break Post 3',
    image: 'lunch-break-post-3.jpg',
    excerpt: 'This is lunch break post 3. SOME TEXT SOME TEXT SOME TEXT',
    date: '2022-01-12',
  },
  {
    slug: 'lunch-break-post-4',
    title: 'Lunch Break Post 4',
    image: 'lunch-break-post-4.jpg',
    excerpt:
      'This is lunch break post 4. SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT',
    date: '2022-01-12',
  },
];

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <Subscription />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
};

export default HomePage;
