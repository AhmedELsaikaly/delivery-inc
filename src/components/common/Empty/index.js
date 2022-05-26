import { Empty } from '../Icons';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const EmptyState = ({ message = '', buttonText, ButtonLink = '/' }) => {
  const history = useHistory();

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '400px',
      }}
    >
      <Empty />
      <Typography
        sx={{ margin: '30px 0 20px', textAlign: 'center' }}
        variant='h6'
        component='h1'
      >
        {message}
      </Typography>
      {!!buttonText && (
        <Button
          variant='contained'
          onClick={!!ButtonLink ? () => history.push(ButtonLink) : () => {}}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
