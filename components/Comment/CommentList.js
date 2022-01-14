import CommentItem from './CommentItem';

import classes from './CommentList.module.css';

const CommentList = (props) => {
  const { comments } = props;

  return (
    <ul>
      {comments.map((comment) => {
        return <CommentItem key={comment._id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
