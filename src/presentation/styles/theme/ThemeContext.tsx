import React, { createContext, useContext, ReactNode, useState } from 'react';
import { TextStyle } from 'react-native';

interface ThemeTypography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
}

interface Theme {
  typography: ThemeTypography;
  palette: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
}

const defaultTheme: Theme = {
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2d3436',
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2d3436',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: '#2d3436',
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2d3436',
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2d3436',
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2d3436',
      backgroundColor: '#636e72',
      padding: 5,
    },
    body1: {
      fontSize: 16,
      color: '#2d3436',
    },
    body2: {
      fontSize: 14,
      color: '#2d3436',
    },
  },
  palette: {
    primary: '#636e72',
    secondary: '#00b894',
    text: '#2d3436',
    background: '#ffffff',
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export type { Theme, ThemeTypography };