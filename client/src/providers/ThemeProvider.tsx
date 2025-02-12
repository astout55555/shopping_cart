/* eslint-disable react-refresh/only-export-components */

import React from 'react';

// context

export type ThemeOption = 'dark' | 'light';

export interface ThemeContextType {
  theme: ThemeOption,
  handleThemeChange: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>(
  {
    theme: 'dark',
    handleThemeChange: () => {}
  }
);

// provider

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<ThemeOption>('dark');

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <ThemeContext.Provider value={{theme, handleThemeChange}}>
      {children}
    </ThemeContext.Provider>
  )
}

// styles and style types

const darkThemeStyles = {
  color: "#e0e0e0",
  backgroundColor: "#121212",
};

interface ThemeStyles {
  dark: {color: string, backgroundColor: string},
  light: object
}

export const themeStyles: ThemeStyles = {
  dark: darkThemeStyles,
  light: {},
}
