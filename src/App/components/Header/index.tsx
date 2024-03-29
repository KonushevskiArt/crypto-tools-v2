import React from "react";
import i18next from "i18next";
import Logo from "./icons/Logo";
import Cookies from "js-cookie";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

import { useTranslation } from "react-i18next";

import { Menu } from "../Settings";
import { AuthorizationBar } from "./AuthorizationBar";
import { RuIcon } from './icons/RuIcon';
import { UsIcon } from './icons/UsIcon';

import { SelectChangeEvent } from "@mui/material/Select";

const Header = () => {
  const { t } = useTranslation();

  const [isShowMenu, setShowMenu] = React.useState(false);

  const currentLanguageCode = Cookies.get("i18next") || "en";

  const [language, setLanguage] = React.useState(currentLanguageCode);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
    Cookies.set("i18next", event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "custom.header",
        }}
      >
        <Toolbar>
          <Logo height={'80px'} width={'134px'} />

          <Box
            sx={{
              minWidth: 140,
              position: "absolute",
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              top: "12px",
              right: "20px",
              color: "inherit",
              border: "inherit",
            }}
          >
            <AuthorizationBar />
            <FormControl fullWidth>
              <InputLabel
                sx={{ color: "inherit" }}
                id="demo-simple-select-label"
              >
                {t("Language")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label={t("Language")}
                onChange={handleChange}
                size="small"
                sx={{ color: "inherit", display: 'flex', gap: '10px' }}
              >
                <MenuItem
                  onClick={() => i18next.changeLanguage("ru")}
                  value="ru"
                  
                >
                  <Box sx={{ display: 'flex', gap: '10px', mr: '-35px' }}>
                    {t("Ru")}
                    <RuIcon />
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => i18next.changeLanguage("en")}
                  value="en"
                >
                  <Box sx={{ display: 'flex', gap: '10px', mr: '-35px' }}>
                    {t("Eng")}
                    <UsIcon />
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setShowMenu(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu isShowMenu={isShowMenu} setShowMenu={setShowMenu} />
    </Box>
  );
};

export default Header;
