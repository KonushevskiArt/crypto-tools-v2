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

export default function Menu({ isShowMenu, setShowMenu }) {
  const { t } = useTranslation();

  const { colors, setColors } = useContext(ColorContext);
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
      console.log(color);
      localStorage.setItem("colorTheme", JSON.stringify(newColors));
    }
  };

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
          <div key={key}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={t(text)} />
                <input
                  onChange={(evt) => changeColorValue(evt, key)}
                  defaultValue={colors[key]}
                  type="color"
                ></input>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={"left"}
        open={isShowMenu}
        onClose={() => setShowMenu(false)}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
