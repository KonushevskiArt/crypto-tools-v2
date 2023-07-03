/* eslint-env browser*/
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, red, blue } from '@mui/material/colors';


const defaultColors = {
  primary: blue[900],
  secondary:teal[900],
  error: red[900],
  success: blue[500],
  foreground: teal[50],
  background: teal[100],
  header: teal[500],
  navigation: teal[300],
  navActiveLink: red,
}

const colorTheme =
  JSON.parse(localStorage.getItem("colorTheme")) || defaultColors;

export const ColorContext = React.createContext(null);

const ColorThemeContext = ({ children }) => {
  const [colors, setColors] = React.useState(colorTheme);

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      error: {
        main: colors.error,
      },
      success: {
        main: colors.success,
      },
      custom: {
        foreground: colors.foreground,
        background: colors.background,
        header: colors.header,
        navigation: colors.navigation,
        navActiveLink: colors.navActiveLink
         
      },
    },
  });

  return (
    <ColorContext.Provider value={{ colors, setColors, defaultColors }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorContext.Provider>
  );
};

export default ColorThemeContext;
