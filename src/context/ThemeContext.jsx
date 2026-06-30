import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('os-museum-theme');
    return savedTheme || 'dark'; // default is dark
  });

  useEffect(() => {
    localStorage.setItem('os-museum-theme', theme);
    document.documentElement.removeAttribute('data-theme');
    
    if (theme !== 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes: ['dark', 'light', 'retro']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
