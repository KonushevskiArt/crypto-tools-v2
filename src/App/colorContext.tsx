
import React, { FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, red, blue, pink,  } from '@mui/material/colors';

interface IColors {
  primary: string,
  secondary: string,
  error: string,
  success: string,
  foreground: string,
  background: string,
  header: string,
  navigation: string,
  navActiveLink: { 
    [key: string]: string
  },
  authWindow: string, 
}

const defaultColors: IColors = {
  primary: blue[900],
  secondary: teal[900],
  error: pink[700],
  success: blue[500],
  foreground: teal[50],
  background: teal[100],
  header: teal[500],
  navigation: teal[300],
  navActiveLink: red,
  authWindow: blue[400], 
}

const colorTheme: IColors =
  JSON.parse(localStorage.getItem("colorTheme") as string) || defaultColors;

type Props = {
  children: React.ReactNode
}

interface IColorContext {
  colors: IColors, 
  setColors: React.Dispatch<React.SetStateAction<IColors>>,
  defaultColors: IColors
}

export const ColorContext = React.createContext<IColorContext>({} as IColorContext);

const ColorThemeContext: FC<Props> = ({ children }) => {
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
        navActiveLink: colors.navActiveLink,
        authWindow: colors.authWindow,
         
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
