import { Fragment, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import PostContent from '../../components/Posts/PostDetail/PostContent';
import Comments from '../../components/Comment/Comments';
import { getPostsFiles, getPostData } from '../../lib/posts-util';

const PostDetailPage = (props) => {
  const [comments, setComments] = useState();

  // router.query.slug
  const router = useRouter();
  const postId = router.query.slug;

  const fetchComments = useCallback(async () => {
    // FETCH COMMENTS BASED ON SLUG
    const response = await fetch(`/api/comments/${postId}`);
    const data = await response.json();
    // DO SOMETHING WITH FETCHED DATA
    setComments(data.comments);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
      {/* FIXME REPLACE DUMMY COMMENTS WITH COMMENTS */}
      <Comments comments={comments} showCommentsHandler={fetchComments} />
    </Fragment>
  );
};

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 60,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
