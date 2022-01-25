import { useState, useEffect } from 'react';
import Link from 'next/link';

import NewCommentForm from '../Forms/NewCommentForm';
import CommentList from './CommentList';

import classes from './Comments.module.css';

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
    <section className={classes.container}>
      {/* CTA */}
      <div className={classes.cta}>
        <button type='button' onClick={toggleShowCommentsHandler}>
          {`${!isShowComments ? 'Show' : 'Hide'} comments`}
        </button>
        {/* ONLY SHOW WRITE COMMENT WHEN LOGGED IN */}
        {isLogin && (
          <button type='button' onClick={writeCommentHandler}>
            {!writeComment ? 'Write a comment' : 'Cancel'}
          </button>
        )}

        {!isLogin && (
          <div>
            <Link href='/auth'>Sign in</Link> to write a comment
          </div>
        )}
      </div>

      {/* WRITE COMMENT */}
      {writeComment && <NewCommentForm user={user} />}

      {/* COMMENTS */}
      {isShowComments && comments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
