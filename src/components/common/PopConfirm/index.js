import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import Transition from '../Transition';

const PopConfirm = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
      aria-describedby='Pop confirm'
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <ErrorIcon sx={{ mr: '10px', fill: '#FFD700' }} /> {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='dialog-description'></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Disagree
        </Button>
        <Button variant='contained' onClick={onConfirm}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopConfirm;
