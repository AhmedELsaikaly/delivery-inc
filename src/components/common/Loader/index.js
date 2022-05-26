import s from './index.module.css';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box className={s.loader} component='div'>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
