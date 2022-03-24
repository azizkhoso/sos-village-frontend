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

import { useQuery } from 'react-query';

import NewHouse from './NewHouse';
import { getHouses } from '../../../api/admin/houses';

export default function Houses() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState('');
  const { isLoading, data: { data: { houses } } } = useQuery('houses', getHouses, { refetchOnMount: 'always' });
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
                    <TableCell className="font-bold" align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    houses.filter(
                      (h) => h.name.toLowerCase().includes(searchText.toLowerCase()),
                    ).map((house, index) => (
                      <TableRow key={house.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{house.name}</TableCell>
                        <TableCell>{house.mother}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => navigate(`update/${house.id}`)}>
                            <Edit />
                          </IconButton>
                          <IconButton>
                            <Delete />
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
      <Route path="/update/:id" element={<h1>Update house</h1>} />
      <Route path="/:id" element={<h1>View House</h1>} />
    </Routes>
  );
}
