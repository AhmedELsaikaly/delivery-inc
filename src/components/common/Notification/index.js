import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({
  open,
  handleClose,
  message,
  type = 'success',
  duration = 4000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
