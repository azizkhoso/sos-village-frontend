/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import {
  Card,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';

import {
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';

import moment from 'moment';

import { useQuery, useMutation, useQueryClient } from 'react-query';

import useToastsStore from '../../../stores/toasts';

import NewReceipt from './NewReceipt';
import { deleteReceipt, getReceipts } from '../../../api/admin/receipts';
import UpdateReceipt from './UpdateReceipt';

export default function Receipts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore((state) => state);
  const [itemSearchText, setItemSearchText] = React.useState('');
  const { isLoading, data } = useQuery('receipts', getReceipts, { refetchOnMount: 'always' });
  const { mutate } = useMutation(
    (id) => deleteReceipt(id),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Receipt deleted successfully', severity: 'success' });
        queryClient.invalidateQueries('receipts');
        navigate('/admin/receipts');
      },
      onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
    },
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        index
        element={(
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex flex-wrap items-center w-full gap-3">
              <Typography variant="h6" align="center font-semibold">Receipts</Typography>
              <div className="flex gap-3 ml-auto">
                <TextField
                  label="Search by Item"
                  value={itemSearchText}
                  onChange={(e) => setItemSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-receipt')}>New Receipt</Button>
              </div>
            </div>
            <TableContainer className="w-full" component={Card}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Reg. No.</TableCell>
                    <TableCell className="font-bold">Date</TableCell>
                    <TableCell className="font-bold">Item</TableCell>
                    <TableCell className="font-bold">Qt. Received</TableCell>
                    <TableCell className="font-bold">Update</TableCell>
                    <TableCell className="font-bold">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.data.receipts.filter(
                      (r) => r.item.name.toLowerCase().includes(itemSearchText.toLowerCase()),
                    ).map((receipt) => (
                      <TableRow key={receipt._id}>
                        <TableCell>{receipt.registeryNumber}</TableCell>
                        <TableCell>{moment(receipt.issueDate).format('MMM DD, YYYY')}</TableCell>
                        <TableCell>{receipt.item.name}</TableCell>
                        <TableCell>{`${receipt.quantityReceived} ${receipt.item.unitShortform}`}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => navigate(`update/${receipt._id}`, { state: receipt })}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => mutate(receipt._id)}>
                            <Delete htmlColor="red" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      />
      <Route path="/new-receipt" element={<NewReceipt />} />
      <Route path="/update/:id" element={<UpdateReceipt />} />
      <Route path="/:id" element={<h1>View Receipt</h1>} />
    </Routes>
  );
}
