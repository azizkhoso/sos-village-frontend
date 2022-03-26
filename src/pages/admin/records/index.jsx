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

import NewRecord from './NewRecord';
import { deleteRecord, getRecords } from '../../../api/admin/records';
import UpdateRecord from './UpdateRecord';

export default function Records() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastsStore = useToastsStore((state) => state);
  const [itemSearchText, setItemSearchText] = React.useState('');
  const [houseSearchText, setHouseSearchText] = React.useState('');
  const [motherSearchText, setMotherSearchText] = React.useState('');
  const { isLoading, data } = useQuery('records', getRecords, { refetchOnMount: 'always' });
  const { mutate } = useMutation(
    (id) => deleteRecord(id),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Record deleted successfully', severity: 'success' });
        queryClient.invalidateQueries('records');
        navigate('/admin/records');
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
              <Typography variant="h6" align="center font-semibold">Records</Typography>
              <div className="flex gap-3 ml-auto">
                <TextField
                  label="Search by Item"
                  value={itemSearchText}
                  onChange={(e) => setItemSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <TextField
                  label="Search by House"
                  value={houseSearchText}
                  onChange={(e) => setHouseSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <TextField
                  label="Search by Mother"
                  value={motherSearchText}
                  onChange={(e) => setMotherSearchText(e.target.value)}
                  size="small"
                  variant="outlined"
                  className="min-w-max"
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('new-record')}>New Record</Button>
              </div>
            </div>
            <TableContainer className="w-full" component={Card}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Date</TableCell>
                    <TableCell className="font-bold">Item</TableCell>
                    <TableCell className="font-bold">House</TableCell>
                    <TableCell className="font-bold">Quantity Issued</TableCell>
                    <TableCell className="font-bold">Mother</TableCell>
                    <TableCell className="font-bold">Update</TableCell>
                    <TableCell className="font-bold">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.data.records.filter(
                      (r) => r.item.name.toLowerCase().includes(itemSearchText.toLowerCase()),
                    ).filter(
                      (r) => r.house.name.toLowerCase().includes(houseSearchText.toLowerCase()),
                    ).filter(
                      (r) => r.mother.toLowerCase().includes(motherSearchText.toLowerCase()),
                    ).map((record) => (
                      <TableRow key={record._id}>
                        <TableCell>{moment(record.issueDate).format('MMM DD, YYYY')}</TableCell>
                        <TableCell>{record.item.name}</TableCell>
                        <TableCell>{record.house.name}</TableCell>
                        <TableCell>{`${record.quantityIssued} ${record.item.unitShortform}`}</TableCell>
                        <TableCell>{record.mother}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => navigate(`update/${record._id}`, { state: record })}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => mutate(record._id)}>
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
      <Route path="/new-record" element={<NewRecord />} />
      <Route path="/update/:id" element={<UpdateRecord />} />
      <Route path="/:id" element={<h1>View Record</h1>} />
    </Routes>
  );
}
