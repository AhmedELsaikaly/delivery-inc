import { useState, useEffect } from 'react';
export const useSnackbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [snackType, setSnackType] = useState('success');

  useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
        setMessage('');
      }, 3000);
    }
  }, [isActive]);

  const openSnackBar = (msg = '', type) => {
    setMessage(msg);
    setSnackType(type);
    setIsActive(true);
  };

  return { isActive, snackType, message, openSnackBar };
};
