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
  ButtonGroup,
  Box,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DataContext } from '../../contexts/data';
import AddPackageModal from './components/AddPackage';
import { useDocTitle, useSnackbar } from '../../hooks';
import { PopConfirm, Notification } from '../../components/common';
import { getCustomerNameById } from '../../helpers';

const Packages = () => {
  const [open, setOpen] = useState(false);
  const [packageId, setPackageId] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { isActive, message, snackType, openSnackBar } = useSnackbar();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  useDocTitle('Packages delivery Inc');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    data: { packages, customers },
    changePackageOrder,
    deletePackage,
  } = useContext(DataContext);

  // handle Delete package
  const handleClickDeleteBtnPackage = id => {
    setPackageId(id);
    setIsPopUpOpen(true);
  };

  // handle delete Package
  const onDeleteConfirm = () => {
    deletePackage(packageId);
    setPackageId('');
    setIsPopUpOpen(false);
    openSnackBar('Package Deleted Successfully', 'success');
  };

  const headCells = [
    {
      id: 'id',
      numeric: true,
      label: 'id',
    },
    {
      id: 'customer-name',
      numeric: false,
      label: 'Customer Name',
    },
    {
      id: 'weight',
      numeric: true,
      label: 'Weight',
    },
    {
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'Action',
      numeric: false,
      label: 'Action',
    },
    {
      id: 'order',
      numeric: false,
      label: 'Order',
    },
  ];

  return (
    <>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ marginBottom: '20px' }}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add new Package
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='Packages table'>
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
            {packages
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      'th, td': { textAlign: 'center' },
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {getCustomerNameById(row.customerid, customers)}
                    </TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleClickDeleteBtnPackage(row.id)}
                        variant='contained'
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup
                        orientation='vertical'
                        aria-label='vertical contained button group'
                        variant='contained'
                      >
                        <Button
                          onClick={() => changePackageOrder(index, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUpwardIcon />
                        </Button>
                        <Button
                          onClick={() => changePackageOrder(index, 'down')}
                          disabled={index === packages?.length - 1}
                        >
                          <ArrowDownwardIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <AddPackageModal open={open} handleClose={() => setOpen(false)} />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={customers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <PopConfirm
        open={isPopUpOpen}
        title='Are you sure to delete this Package'
        onClose={() => setIsPopUpOpen(false)}
        onConfirm={onDeleteConfirm}
      />
      <Notification open={isActive} type={snackType} message={message} />
    </>
  );
};

export default Packages;
