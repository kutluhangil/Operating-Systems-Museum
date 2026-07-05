import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('os-museum-theme');
    return savedTheme || 'light'; // default is Claude warm cream
  });

  useEffect(() => {
    localStorage.setItem('os-museum-theme', theme);
    document.documentElement.removeAttribute('data-theme');

    if (theme !== 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes: ['light', 'dark', 'retro']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
