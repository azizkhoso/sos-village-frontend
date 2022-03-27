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

import NewInkind from './NewInkind';
import { deleteInkind, getInkinds } from '../../../api/admin/inkinds';
import UpdateInkind from './UpdateInkind';

export default function Inkinds() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore((state) => state);
  const [itemSearchText, setItemSearchText] = React.useState('');
  const { isLoading, data } = useQuery('inkinds', getInkinds, { refetchOnMount: 'always' });
  const { mutate } = useMutation(
    (id) => deleteInkind(id),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Inkind deleted successfully', severity: 'success' });
        queryClient.invalidateQueries('inkinds');
        navigate('/admin/inkinds');
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
              <Typography variant="h6" align="center font-semibold">Inkinds</Typography>
              <div className="flex gap-3 ml-auto">
                <TextField
                  label="Search by Item"
                  value={itemSearchText}
                  onChange={(e) => setItemSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-inkind')}>New Inkind</Button>
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
                    data.data.inkinds.filter(
                      (r) => r.item.name.toLowerCase().includes(itemSearchText.toLowerCase()),
                    ).map((inkind) => (
                      <TableRow key={inkind._id}>
                        <TableCell>{inkind.registeryNumber}</TableCell>
                        <TableCell>{moment(inkind.issueDate).format('MMM DD, YYYY')}</TableCell>
                        <TableCell>{inkind.item.name}</TableCell>
                        <TableCell>{`${inkind.quantityReceived} ${inkind.item.unitShortform}`}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => navigate(`update/${inkind._id}`, { state: inkind })}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => mutate(inkind._id)}>
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
      <Route path="/new-inkind" element={<NewInkind />} />
      <Route path="/update/:id" element={<UpdateInkind />} />
      <Route path="/:id" element={<h1>View Inkind</h1>} />
    </Routes>
  );
}
