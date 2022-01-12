import { getCategoryFeaturedPosts } from '../../lib/posts-util';
import FeaturedPosts from '../../components/HomePage/FeaturedPosts';

const PsychologyFeaturedPosts = (props) => {
  return <FeaturedPosts posts={props.posts} />;
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
