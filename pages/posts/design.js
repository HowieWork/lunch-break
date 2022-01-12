import { getCategoryFeaturedPosts } from '../../lib/posts-util';
import FeaturedPosts from '../../components/HomePage/FeaturedPosts';

const DesignFeaturedPosts = (props) => {
  return <FeaturedPosts posts={props.posts} />;
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
