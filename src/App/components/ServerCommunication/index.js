import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/useAuth';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box } from '@mui/material';

export const ServerCommunication = () => {
  const { isAuth } = useAuth();

  // add functionality for this 

  const handleDownloadInfo = () => {

  }

  const handleUploadInfo = () => {

  }

  // handl error which can occur
  return (
    <Box sx={{ marginTop: '10px' }}>
      {isAuth  && (
        <Stack direction="row" justifyContent="center" spacing={1} >
          <Button
            variant="text"
            onClick={handleDownloadInfo}
            size="small"
            title='Download data from remote server'
            startIcon={<FileDownloadIcon />}
          >
            Download
          </Button>
          <Button
            variant="text"
            onClick={handleUploadInfo}
            size="small"
            title='Update data on remote server'
            startIcon={<FileUploadIcon />}
          >
            Upload
          </Button>
        </Stack>
      )}
      {!isAuth && (
        <Typography color={'primary'}> If you want to save your data on a remote server, you need to register or log in ! </Typography> 
      )}
    </Box>
  );
};
