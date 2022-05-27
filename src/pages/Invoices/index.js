/* eslint-disable no-useless-computed-key */
import { useContext, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  TablePagination,
} from '@mui/material';
import { DataContext } from '../../contexts/data';
import { useDocTitle } from '../../hooks';

const Customers = () => {
  useDocTitle('Invoices delivery Inc');
  const { invoices, getInvoices } = useContext(DataContext);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getInvoices();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {invoices
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map(invoice => {
                return (
                  <>
                    {console.log(invoice, 'invoiceinvoice')}
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
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={invoices?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Customers;
