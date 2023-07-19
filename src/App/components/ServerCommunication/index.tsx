import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';
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


type TProps = {
  setLoading: (arg: boolean) => void,
  isLoading: boolean
}

export const ServerCommunication: FC<TProps> = ({ setLoading, isLoading }) => {
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
      if (id) {
        setLoading(true);
        const data = await remoteApi.getUserData(id);
        const { currencies, profitTables} = data;
        console.log(data);
        dispatch(updateCurrenciesState({currencies}))
        dispatch(updateProfitTablesState({profitTables}))
    
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const customError = error as { message: string };
      toast.error(customError.message, {
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
      if (id && email) {
        setLoading(true);
        await remoteApi.updateUserData(id, email);
    
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const customError = error as { message: string };
      toast.error(customError.message, {
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
