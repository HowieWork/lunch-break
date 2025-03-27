import { useContext } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

import ThemeContext from "../../store/theme-context";

import classes from "./Footer.module.css";

const Footer = () => {
  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme, toggleDarkTheme } = themeCtx;

  return (
    <footer className={classes.footer}>
      © Made by{" "}
      <a target="_blank" href="https://www.howiework.com/">
        Howiework
      </a>{" "}
      <div onClick={toggleDarkTheme}>
        {isDarkTheme && <MdOutlineLightMode />}
        {!isDarkTheme && <MdDarkMode />}
      </div>
    </footer>
  );
};

export default Footer;
