import classes from './Hero.module.css';

const Hero = () => {
  return (
    <section className={classes['section-hero']}>
      <h2>Lunch Break - the Next Blog</h2>
      <div>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          * This is a product mockup. It is used to demonstrate my design and
          development (e.g. Next.js) skills for now. Some features are currently
          unavailable or still under construction.
        </p>
        <p>
          * Lunch Break idea is my own and this site will be updated in the
          future.
        </p>
      </div>
    </section>
  );
};

export default Hero;
