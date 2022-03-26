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

import NewHouse from './NewHouse';
import { deleteHouse, getHouses } from '../../../api/admin/houses';
import UpdateHouse from './UpdateHouse';

export default function Houses() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore((state) => state);
  const [searchText, setSearchText] = React.useState('');
  const { isLoading, data } = useQuery('houses', getHouses, { refetchOnMount: 'always' });
  const { mutate } = useMutation(
    (id) => deleteHouse(id),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Houses deleted successfully', severity: 'success' });
        queryClient.invalidateQueries('houses');
        navigate('/admin/houses');
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
              <Typography variant="h6" align="center font-semibold">Houses</Typography>
              <div className="flex gap-3 ml-auto">
                <TextField
                  label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-house')}>New House</Button>
              </div>
            </div>
            <TableContainer className="w-full" component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Sr. No.</TableCell>
                    <TableCell className="font-bold">Name</TableCell>
                    <TableCell className="font-bold">Mother</TableCell>
                    <TableCell className="font-bold">Update</TableCell>
                    <TableCell className="font-bold">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.data.houses.filter(
                      (h) => h.name.toLowerCase().includes(searchText.toLowerCase()),
                    ).map((house, index) => (
                      <TableRow key={house._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{house.name}</TableCell>
                        <TableCell>{house.mother}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => navigate(`update/${house._id}`, { state: house })}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => mutate(house._id)}>
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
      <Route path="/new-house" element={<NewHouse />} />
      <Route path="/update/:id" element={<UpdateHouse />} />
      <Route path="/:id" element={<h1>View House</h1>} />
    </Routes>
  );
}
