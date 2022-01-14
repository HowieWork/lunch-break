import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  // TODO DO WE NEED EMAIL HERE? FOR AUTH?
  // TODO GET RID OF DASH IN FRONT OF ID
  const { _id, email, name, commentDetail, date } = props.comment;

  return (
    // FIXME REWRITE COMMENT ITEM
    <li key={_id}>
      <div>{name}</div>
      <div>{date}</div>
      <div>{commentDetail}</div>
    </li>
  );
};

export default CommentItem;
