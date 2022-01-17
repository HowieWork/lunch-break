import { useState, useEffect } from 'react';
import Link from 'next/link';

import NewCommentForm from '../Forms/NewCommentForm';
import CommentList from './CommentList';

const Comments = (props) => {
  const { comments, showCommentsHandler, isLogin, user } = props;

  const [isShowComments, setIsShowComments] = useState(false);
  const [writeComment, setWriteComment] = useState(false);

  // HANDLING TOGGLE SHOW COMMENTS BUTTON
  const toggleShowCommentsHandler = () => {
    setIsShowComments((prevState) => !prevState);
  };

  // HANDLING WRITE COMMENT BUTTON
  const writeCommentHandler = () => {
    setWriteComment(!writeComment);
  };

  useEffect(() => {
    if (isShowComments) showCommentsHandler();
  }, [isShowComments]);

  return (
    <section>
      {/* CTA */}
      <button type='button' onClick={toggleShowCommentsHandler}>
        {`${!isShowComments ? 'Show' : 'Hide'} comments`}
      </button>
      {/* TODO ONLY SHOW WRITE COMMENT WHEN LOGGED IN */}
      {isLogin && (
        <button type='button' onClick={writeCommentHandler}>
          {!writeComment ? 'Write a comment' : 'Cancel'}
        </button>
      )}
      {!isLogin && <Link href='/auth'>LOG IN TO WRITE A COMMENT</Link>}

      {/* COMMENTS */}
      {isShowComments && comments && <CommentList comments={comments} />}

      {/* WRITE COMMENT */}
      {writeComment && <NewCommentForm user={user} />}
    </section>
  );
};

export default Comments;
