import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/useAuth';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box } from '@mui/material';
import { updateCurrenciesState } from '../../redux/currencySlice';
import { updateProfitTablesState } from '../../redux/profitTablesSlice';
import { useDispatch } from 'react-redux';
import { remoteApi } from '../../services/remoteApi';
import toast from 'react-hot-toast';
import AlertDialog from '../share/ConfirmationDialog';


export const ServerCommunication = ({ setLoading, isLoading }) => {
  const { isAuth, id, email } = useAuth();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isDownloading, setDownloading] = useState(false);

  const ProvedLoadingData = () => {
    if (isDownloading) {
      downloadInfo()
    } else {
      uploadInfo()
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadInfo = () => {
    setDownloading(true);
    setOpen(true);
  }

  const downloadInfo = async () => {
    try {
      setLoading(true);
      const {currencies, profitTables} = await  remoteApi.getUserData(id);
      
      dispatch(updateCurrenciesState({currencies}))
      dispatch(updateProfitTablesState({profitTables}))
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
      })
    }
  }

  const handleUploadInfo = () => {
    setDownloading(false);
    setOpen(true);
  }

  const uploadInfo = async () => {
    try {
      setLoading(true);
      await remoteApi.updateUserData(id, email);
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
      })
    }
  }

  const dialogeUploadTitle = "Are you sure that you want upload data ?";
  const dialogeDownloadTitle = "Are you sure that you want download data ?";

  return (
    <Box sx={{ marginTop: '10px' }}>
      {isAuth  && (
        <Stack direction="row" justifyContent="center" spacing={1} >
          <Button
            variant="text"
            onClick={handleDownloadInfo}
            size="small"
            disabled={isLoading}
            title='Download data from remote server'
            startIcon={<FileDownloadIcon />}
          >
            Download
          </Button>
          <Button
            variant="text"
            onClick={handleUploadInfo}
            size="small"
            disabled={isLoading}
            title='Update data on remote server'
            startIcon={<FileUploadIcon />}
          >
            Upload
          </Button>
        </Stack>
      )}
      {!isAuth && (
        <Typography  color={'primary'}> If you want to save your data on a remote server, you need to register or log in ! </Typography> 
      )}
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleAccept={() => ProvedLoadingData()}
        title={isDownloading ? dialogeDownloadTitle : dialogeUploadTitle}
      />
    </Box>
  );
};
