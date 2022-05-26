/* eslint-disable no-useless-computed-key */
import { useContext, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  Box,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../contexts/data';
import { useDocTitle, useSnackbar } from '../../hooks';
import { PopConfirm, Notification } from '../../components/common';
import { ROUTES } from '../../constants';

const Customers = () => {
  useDocTitle('Customers delivery Inc');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const history = useHistory();
  const { isActive, message, snackType, openSnackBar } = useSnackbar();

  const {
    data: { customers },
    deleteCustomer,
  } = useContext(DataContext);

  // handle click delete customer button
  const handleDeleteCustomerBtnClick = id => {
    setCustomerId(id);
    setIsPopUpOpen(true);
  };

  // handle delete customer
  const onDeleteConfirm = () => {
    deleteCustomer(customerId);
    setCustomerId('');
    setIsPopUpOpen(false);
    openSnackBar('Customer Deleted Successfully', 'success');
  };

  const headCells = [
    {
      id: 'id',
      numeric: true,
      label: 'id',
    },
    {
      id: 'Name',
      numeric: false,
      label: 'Name',
    },
    {
      id: 'Action',
      numeric: false,
      label: 'Action',
    },
  ];

  return (
    <Box component='div'>
      <TableContainer component={Paper}>
        <Table aria-label='Customers table'>
          <TableHead>
            <TableRow sx={{ th: { textAlign: 'center' } }}>
              {headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map(customer => {
              return (
                <TableRow
                  key={customer.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    'th, td': { textAlign: 'center' },
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {customer.id}
                  </TableCell>
                  <TableCell sx={{ width: '30%', textAlign: 'center' }}>
                    {customer.name}
                  </TableCell>
                  <TableCell>
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ['@media (max-width:780px)']: {
                          flexDirection: 'column',
                        },
                      }}
                    >
                      <Button
                        onClick={() =>
                          history.push(`${ROUTES.INVOICES}/${customer.id}`)
                        }
                        sx={{
                          mr: '10px',
                          ['@media (max-width:576px)']: {
                            mr: '0',
                            mb: '10px',
                          },
                        }}
                        variant='contained'
                      >
                        Create Invoice
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteCustomerBtnClick(customer.id)
                        }
                        variant='contained'
                        color='error'
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PopConfirm
        open={isPopUpOpen}
        title='Are you sure to delete this Customer'
        onClose={() => setIsPopUpOpen(false)}
        onConfirm={onDeleteConfirm}
      />
      <Notification open={isActive} type={snackType} message={message} />
    </Box>
  );
};

export default Customers;
