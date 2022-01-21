import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
});

export const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkThemeHandler = () => {
    document.body.classList.toggle('dark-theme');
    setIsDarkTheme((prevState) => !prevState);
  };

  const context = {
    isDarkTheme: isDarkTheme,
    toggleDarkTheme: toggleDarkThemeHandler,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
