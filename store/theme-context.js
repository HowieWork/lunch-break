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

  useEffect(() => {
    // SYNC WITH SYSTEM COLOR THEME
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark');
    console.log(isSystemDark.matches);
    isSystemDark.addEventListener('change', function (event) {
      // NOTE .MATCHES RETURNS TRUE/FALSE
      event.matches ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });

    // TOGGLE DARK THEME FOR BODY ELEMENT
    isDarkTheme
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme');
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
