import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Box from '@mui/material/Box';
import { AppNavigation } from './../AppNavigation/index';


const Root = () => {
  return (
    <>
      <Header />
      <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
        <AppNavigation />
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
