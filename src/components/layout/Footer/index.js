import { Box, Typography } from '@mui/material';
import s from './index.module.css';

const Footer = () => {
  return (
    <Box component='footer' className={s.footer}>
      <Typography variant='p' component='p'>
        Delivery inc made with <span>&#9829;</span> by Ahmed Elsaikaly
      </Typography>
    </Box>
  );
};

export default Footer;
