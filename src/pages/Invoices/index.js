/* eslint-disable no-useless-computed-key */
import { useContext, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
} from '@mui/material';
import { DataContext } from '../../contexts/data';
import { useDocTitle } from '../../hooks';

const Customers = () => {
  useDocTitle('Invoices delivery Inc');
  const { invoices, getInvoices } = useContext(DataContext);

  useEffect(() => {
    getInvoices();
  }, []);

  const headCells = [
    {
      id: 'customerName',
      numeric: false,
      label: 'Customer Name',
    },
    {
      id: 'packagesCount',
      numeric: false,
      label: 'Packages Count',
    },
    {
      id: 'totalWeight',
      numeric: false,
      label: 'Total Weight',
    },
    {
      id: 'totalPrice',
      numeric: false,
      label: 'Total Price',
    },
  ];

  return (
    <Box component='div'>
      <TableContainer component={Paper}>
        <Table aria-label='Invoices table'>
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
            {invoices?.map(invoice => {
              return (
                <>
                  {invoice?.packagesCount > 0 && (
                    <TableRow
                      key={invoice?.customerId}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        'th, td': { textAlign: 'center' },
                      }}
                    >
                      <TableCell sx={{ width: '30%', textAlign: 'center' }}>
                        {invoice?.customerName}
                      </TableCell>
                      <TableCell>{invoice?.packagesCount}</TableCell>
                      <TableCell>{invoice?.totalWeight}Kg</TableCell>
                      <TableCell>{invoice?.totalPrice}</TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
