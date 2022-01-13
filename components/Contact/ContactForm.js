import classes from './ContactForm.module.css';

const ContactForm = () => {
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your email</label>
            <input type='email' id='email' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your name</label>
            <input type='text' id='name' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Message</label>
            <textarea id='message' rows='6' required></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send message</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
