'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Apply dark mode
  },
});
export default function DarkModeProvider({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
