/*eslint-env browser*/
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { ColorContext } from "../../colorContext";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const paletteInfo = [
  {
    text: "Background",
    key: "background",
  },
  {
    text: "Foreground",
    key: "foreground",
  },
  {
    text: "Header",
    key: "header",
  },
  {
    text: "Success",
    key: "success",
  },
  {
    text: "Error",
    key: "error",
  },
  {
    text: "Primary",
    key: "primary",
  },
  {
    text: "Secondary",
    key: "secondary",
  },
];

export default function Menu({ isShowMenu, setShowMenu }) {
  const { t } = useTranslation();

  const { colors, setColors, defaultColors } = useContext(ColorContext);
  let lastCall = React.useRef(undefined);
  let previousCall = React.useRef(lastCall.current);

  const changeColorValue = (evt, color) => {
    const value = evt.target.value;
    const newColors = { ...colors, [color]: value };

    previousCall.current = lastCall.current;
    lastCall.current = Date.now();
    if (
      previousCall.current === undefined ||
      lastCall.current - previousCall.current > 300
    ) {
      setColors(newColors);
      localStorage.setItem("colorTheme", JSON.stringify(newColors));
    }
  };

  const handleClickByDefaultColors = () => {
    setColors(defaultColors);
    localStorage.setItem("colorTheme", JSON.stringify(defaultColors));
  }

  const list = () => (
    <Box sx={{ minWidth: 300 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <Typography ml={"20px"} fontSize={"26px"} sx={{ fontWeight: "700" }}>
            {t("Palette")}
          </Typography>
          ;
        </ListItem>
        {paletteInfo.map(({ text, key }) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              <ListItemText primary={t(text)} />
              <input
                onChange={(evt) => changeColorValue(evt, key)}
                defaultValue={colors[key]}
                type="color"
              ></input>
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickByDefaultColors}>
            Use Default colors
          </ListItemButton>
          <Divider />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={isShowMenu}
        onClose={() => setShowMenu(false)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
