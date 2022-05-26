import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Typography variant='h4' component='h1'>
        This Page is not found
      </Typography>
    </Box>
  );
};

export default NotFound;
