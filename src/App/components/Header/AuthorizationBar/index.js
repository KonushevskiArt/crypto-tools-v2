/* eslint-env browser */
import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../../hooks/useAuth';
import { Typography } from '@mui/material';
import { removeUser } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';


export const AuthorizationBar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isAuth, email } = useAuth();
  console.log(isAuth)
  const handleSignUp = () => {
    navigate('/auth');
  } 

  const handleLogIn = () => {
    navigate('/login');
  } 

  const handleLogOut = () => {
    dispatch(removeUser());
  }

  return (
    <>
      {!isAuth && 
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
      }
      {isAuth && (
        <Stack direction="row" spacing={1} sx={{ mr: '40px', display: 'flex', alignItems: 'center' }}>
          <Typography>{email}</Typography>
          <Button 
              sx={{ minWidth: 'fit-content'}} 
              variant="" 
              startIcon={<ExitToAppIcon />}
              onClick={handleLogOut}
            >
              Log out
          </Button>
        </Stack>
      )}
    </>
    
  );
};
