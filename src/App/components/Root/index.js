import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Box from '@mui/material/Box';
import { AppNavigation } from './../AppNavigation/index';
import Stack from '@mui/material/Stack';
import { ServerCommunication } from "../ServerCommunication";

const Root = () => {
  return (
    <>
      <Header />
      <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
        <AppNavigation />
        <Stack direction="column" spacing={1}>
          <ServerCommunication />
          <Outlet />
        </Stack>
      </Box>
    </>
  );
};

export default Root;
