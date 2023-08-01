
import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    custom: {
      foreground: string,
      background: string,
      header: string,
      navigation: string,
      navActiveLink: {
        [key: string]: string
      },
      authWindow: string,
    };
    
  }
}