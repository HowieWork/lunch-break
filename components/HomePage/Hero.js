import classes from './Hero.module.css';

const Hero = () => {
  return (
    <section className={classes['section-hero']}>
      <div className={classes.title}>
        <h2>
          Lunch Break <span>BETA</span>
        </h2>
        <p>
          Delivering great content to help you think better, work better and
          live better!
        </p>
      </div>
      <div className={classes.content}>
        <div className={classes.container}>
          <h3>What is the goal</h3>
          <p>
            Help people to grow a positive mindset and live a better life by
            sharing design and psychology knowledge.
          </p>
        </div>
        <div className={classes.container}>
          <h3>What we believe</h3>
          <p>
            <span>Share</span> share the latest findings, new design trends and
            interesting storied in tech.
          </p>
          <p>
            <span>Impact</span> we believe in impact, even if it's just changing
            your perspective of looking at a problem.
          </p>
          <p>
            <span>Diversity</span> there has never been an era like today, and
            we have to process tremendous information and countless tasks.
            Diverse ways of thinking is crucial to reduce pressure in daily
            life.
          </p>
        </div>
        <div className={classes.container}>
          <h3>What we provide</h3>
          <p>
            <span>Popular posts</span> Read the trending and popular contents in
            tech field.
          </p>
          <p>
            <span>Search</span> Find your favorite content.
          </p>
          <p>
            <span>Newsletter</span> Join our community by subscribing to our
            weekly newsletter.
          </p>
          <p>
            <span>Member exclusive</span> Create your own profile and get access
            to member exclusive features.
          </p>
        </div>
      </div>
      <div className={classes.disclaim}>
        <h3>Disclaim:</h3>
        <p>
          * Idea of Lunch Break is my own and this site will be updated in the
          future. <br /> * Current version is mainly for demonstrating my design
          and development (e.g. Next.js) skills. <br /> * Some features are
          still unavailable or under construction.
        </p>
      </div>
    </section>
  );
};

export default Hero;
