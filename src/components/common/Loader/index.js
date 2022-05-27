import { CircularProgress, Box } from '@mui/material';
import styles from './index.module.css';

const Loader = () => {
  return (
    <Box className={styles.loader} component='div'>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
