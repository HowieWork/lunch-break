import AllPosts from '../../components/Posts/AllPosts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = (props) => {
  return <AllPosts posts={props.posts} />;
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
