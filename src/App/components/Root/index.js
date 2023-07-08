import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Box from '@mui/material/Box';
import { AppNavigation } from './../AppNavigation/index';
import Stack from '@mui/material/Stack';
import { ServerCommunication } from "../ServerCommunication";
import Skeleton from '@mui/material/Skeleton';

const Root = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
        <AppNavigation />
        <Stack direction="column" spacing={1} sx={{width: '70%'}}>
          <ServerCommunication setLoading={setLoading} isLoading={isLoading} />
        
          {isLoading && (
            <Box sx={{width: '100%'}}>
              <Box sx={{display: 'grid', width: '100%'}}>
                <Skeleton variant="text" width={'100%'} height={50} />
                <Box sx={{display: 'grid', gap: '10px', gridTemplateColumns: '1fr 4fr 2fr'}}>
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton variant="rounded" height={120} />
                </Box>
              </Box>
              <Box sx={{display: 'grid', width: '100%'}}>
                <Skeleton variant="text" width={'100%'} height={50} />
                <Box sx={{display: 'grid', gap: '10px', gridTemplateColumns: '1fr 4fr 2fr'}}>
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton variant="rounded" height={120} />
                </Box>
              </Box>
              <Box sx={{display: 'grid', width: '100%'}}>
                <Skeleton variant="text" width={'100%'} height={50} />
                <Box sx={{display: 'grid', gap: '10px', gridTemplateColumns: '1fr 4fr 2fr'}}>
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton variant="rounded" height={120} />
                </Box>
              </Box>
            </Box>
          )}
            {!isLoading && (<Outlet />)}
        </Stack>
      </Box>
    </>
  );
};

export default Root;
