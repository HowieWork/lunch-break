import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  const { _id, email, name, commentDetail, date } = props.comment;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <li key={_id} className={classes.container}>
      <div className={classes.title}>
        <div className={classes.name}>{name}</div>
        <div className={classes.date}>·</div>
        <div className={classes.date}>{formattedDate}</div>
      </div>
      <p className={classes.content}>{commentDetail}</p>
    </li>
  );
};

export default CommentItem;
