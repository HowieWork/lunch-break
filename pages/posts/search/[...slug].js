import { useRouter } from 'next/router';

import Posts from '../../../components/Posts/Posts';
import { getFilteredPostsMetaData } from '../../../lib/posts-util';

const FilteredPostsPage = (props) => {
  const filteredPosts = props.posts;

  return <Posts title='Searching results' posts={filteredPosts} />;
};

export function getServerSideProps(context) {
  const slug = context.query.slug;

  let filteredPosts;

  // 1. SEARCHING KEYWORD
  if (slug.length === 1) {
    const keyword = context.query.slug[0];
    filteredPosts = getFilteredPostsMetaData({
      keyword,
    });
  }

  // 2. FILTERING MONTH YEAR
  if (slug.length === 2) {
    const year = context.query.slug[0];
    const month = context.query.slug[1];

    filteredPosts = getFilteredPostsMetaData({
      year: +year,
      month: +month,
    });
  }

  // 3. RETURN SEARCH / FILTER RESULTS
  return { props: { posts: filteredPosts } };
}

export default FilteredPostsPage;
