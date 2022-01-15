import { useState, useEffect } from 'react';

import NewCommentForm from '../Forms/NewCommentForm';
import CommentList from './CommentList';

const Comments = (props) => {
  const { comments, showCommentsHandler } = props;

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
      <button type='button' onClick={writeCommentHandler}>
        {!writeComment ? 'Write a comment' : 'Cancel'}
      </button>

      {/* COMMENTS */}
      {isShowComments && comments && <CommentList comments={comments} />}

      {/* WRITE COMMENT */}
      {writeComment && <NewCommentForm />}
    </section>
  );
};

export default Comments;
