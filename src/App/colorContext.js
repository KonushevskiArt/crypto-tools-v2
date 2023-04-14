/* eslint-env browser*/
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const defaultColors = {
  primary:"#235490",
  secondary:"#c091ca",
  error:"#6e2121",
  success:"#476780",
  foreground:"#ffffff",
  background:"#81a785",
  header:"#539d5b"
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
