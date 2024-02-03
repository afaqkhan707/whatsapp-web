import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme } from '@/app/componentsmui/ThemeColors';

export const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleDarkMode = (theme) => {
    setSelectedTheme(theme);
  };

  const theme = selectedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, toggleDarkMode, selectedTheme, setSelectedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
