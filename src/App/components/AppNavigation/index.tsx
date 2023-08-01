import React from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalculateIcon from '@mui/icons-material/Calculate';
import TableChartIcon from '@mui/icons-material/TableChart';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import styles from "./styles.module.css";


export const AppNavigation: React.FC = () => {
  const { t } = useTranslation();

  const linksInfo = [
    {
      to: `/`,
      text: t("Currency_list"),
      icon: <FormatListNumberedIcon />,
    },
    {
      to: `calculators`,
      text: t("CommissionCalculator"),
      icon: <CalculateIcon />,
    },
    {
      to: `tables`,
      text: t("PageOfTables"),
      icon: <TableChartIcon />,
    },
  ];

  return (
    <nav 
      aria-label="main mailbox folders"
    >
          <List 
            sx={{
              'backgroundColor': "custom.navigation",
              padding: 0,
              margin: 0,
              width: '240px',

            }}
          >
            {linksInfo.map(({ to, text, icon }) => (
              <ListItem key={to + text} disablePadding>
                <NavLink
                  className={styles.link} 
                  style={({isActive}) => ({backgroundColor: isActive ? '#26a69a' : 'transparent'}) }
                  to={to}
                >
                <ListItemButton sx={{width: '100%', height: '100%' }}>
                  <ListItemIcon sx={{mr: '10px', minWidth: '0px'}}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
                  
                </NavLink>
              </ListItem>
            ))}
          </List>
        </nav>
  );
};

