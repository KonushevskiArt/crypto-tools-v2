import React from "react";
import ColorThemeContext from "./colorContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/system";
import AppRouter from "./AppRouter";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Container from '@mui/material/Container';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ru"],
    fallbackLng: "ru",
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

function App() {
  return (
    <Provider store={store}>
      <ColorThemeContext>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "custom.background",
            textAlign: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg">
              <AppRouter />
            </Container>
          </LocalizationProvider>
        </Box>
      </ColorThemeContext>
    </Provider>
  );
}

export default App;
