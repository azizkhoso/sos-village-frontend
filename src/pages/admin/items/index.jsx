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

import { useQuery, useMutation, useQueryClient } from 'react-query';

import useToastsStore from '../../../stores/toasts';

import NewItem from './NewItem';
import { deleteItem, getItems } from '../../../api/admin/items';
import UpdateItem from './UpdateItem';

export default function Items() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore((state) => state);
  const [searchText, setSearchText] = React.useState('');
  const { isLoading, data } = useQuery('items', getItems, { refetchOnMount: 'always' });
  const { mutate } = useMutation(
    (id) => deleteItem(id),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Item deleted successfully', severity: 'success' });
        queryClient.invalidateQueries('items');
        navigate('/admin/items');
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
              <Typography variant="h6" align="center font-semibold">Items</Typography>
              <div className="flex gap-3 ml-auto">
                <TextField
                  label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-item')}>New Item</Button>
              </div>
            </div>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Sr. No.</TableCell>
                    <TableCell className="font-bold">Name</TableCell>
                    <TableCell className="font-bold">Unit</TableCell>
                    <TableCell className="font-bold">Unit Shortform</TableCell>
                    <TableCell className="font-bold">Update</TableCell>
                    <TableCell className="font-bold">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.data.items.filter(
                      (h) => h.name.toLowerCase().includes(searchText.toLowerCase()),
                    ).map((item, index) => (
                      <TableRow key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.measurementUnit}</TableCell>
                        <TableCell>{item.unitShortform}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => navigate(`update/${item._id}`, { state: item })}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => mutate(item._id)}>
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
      <Route path="/new-item" element={<NewItem />} />
      <Route path="/update/:id" element={<UpdateItem />} />
      <Route path="/:id" element={<h1>View Item</h1>} />
    </Routes>
  );
}
