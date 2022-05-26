import { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import { DataContext } from '../../../../contexts/data';
import { weightOrPriceValidation, required } from './validations';
import { Transition, Notification } from '../../../../components/common';
import { useSnackbar } from '../../../../hooks/useSnackbar';

const CustomDialog = ({ open, handleClose }) => {
  const { isActive, message, snackType, openSnackBar } = useSnackbar();

  // data content
  const {
    data: { customers },
    createNewPackage,
  } = useContext(DataContext);

  // form data
  const {
    handleSubmit,
    handleChange,
    resetData,
    data: packageData,
    errors,
  } = useForm({
    validations: {
      weight: weightOrPriceValidation,
      price: weightOrPriceValidation,
      customerid: { required },
    },
    onSubmit: () => {
      createNewPackage({
        ...packageData,
        price: parseInt(packageData.price),
        id: `pak${new Date().getTime() * Math.random() * 100000}`,
        weight: `${packageData.weight}kg`,
        shippingOrder: 1,
      });
      openSnackBar('New Package created successfully', 'success');
      onClose();
    },
  });

  // handle dialog close
  const onClose = () => {
    resetData();
    handleClose();
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={onClose}
        aria-describedby='Add new Package dialog'
      >
        <DialogTitle> Add new Package</DialogTitle>
        <DialogContent>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete='off'
          >
            {/* weight */}
            <FormControl variant='standard' fullWidth>
              <TextField
                error={!!errors?.weight}
                id='weight'
                label='Weight'
                variant='outlined'
                type='number'
                value={packageData?.weight || ''}
                fullWidth
                onChange={handleChange('weight')}
                helperText={errors?.weight || ''}
                required
              />
            </FormControl>

            {/* price */}
            <FormControl variant='standard' fullWidth>
              <TextField
                error={!!errors?.price}
                id='price'
                label='Price'
                variant='outlined'
                type='number'
                fullWidth
                value={packageData?.price || ''}
                onChange={handleChange('price')}
                helperText={errors?.price || ''}
                required
              />
            </FormControl>

            {/* customer */}
            <FormControl fullWidth>
              <InputLabel id='customer'>Customer</InputLabel>
              <Select
                error={!!errors?.customerid}
                labelId='customer id'
                id='customerid'
                value={packageData?.customerid || ''}
                label='Age'
                onChange={handleChange('customerid')}
                required
              >
                {customers?.map(customer => (
                  <MenuItem key={customer?.id} value={customer?.id}>
                    {customer?.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.customerid && (
                <FormHelperText error>{errors?.customerid}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained'>
            Create
          </Button>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Notification open={isActive} type={snackType} message={message} />
    </>
  );
};

export default CustomDialog;
