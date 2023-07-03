/* eslint-env browser */
import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';


export const AuthorizationBar = () => {
  const handleSignUp = () => {
    console.log('sign up')
  } 

  const handleLogIn = () => {
    console.log('log in')
  } 

  return (
    <Stack direction="row" spacing={1} sx={{ mr: '40px' }}>
      <Button 
        sx={{ minWidth: 'fit-content'}} 
        variant="" 
        startIcon={<HowToRegIcon />}
        onClick={handleSignUp}
      >
         Sign up 
      </Button>
      <Button 
        sx={{ minWidth: 'fit-content'}} 
        variant="" 
        startIcon={<ExitToAppIcon />}
        onClick={handleLogIn}
      >
        Log in
      </Button>
    </Stack>
  );
};
