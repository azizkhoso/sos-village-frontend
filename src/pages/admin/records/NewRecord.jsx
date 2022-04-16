import React, { useState } from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  Add,
} from '@mui/icons-material';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import useToastsStore from '../../../stores/toasts';

import { getHouses } from '../../../api/admin/houses';
import { getItems } from '../../../api/admin/items';
import { addRecord } from '../../../api/admin/records';

export default function NewRecord() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [item, setItem] = useState(''); // Item Id in string format
  const [house, setHouse] = useState(''); // Hosue Id in string format
  const [quantityIssued, setQuantityIssued] = useState(0);
  const toastsStore = useToastsStore((state) => state);
  const itemsQuery = useQuery('items', getItems, { refetchOnMount: true });
  const housesQuery = useQuery('houses', getHouses, { refetchOnMount: true });
  const { isLoading, mutate } = useMutation(
    () => addRecord(
      {
        item,
        house,
        quantityIssued,
        mother: housesQuery.data?.data.houses.find((h) => h._id === house).mother || 'N/A',
      },
    ),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Record added successfully', severity: 'success' });
        queryClient.invalidateQueries('records');
        navigate('/admin/records');
      },
      onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
    },
  );
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center" className="w-full lg:w-9/12">New Record</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Item</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Select
              fullWidth
              size="small"
              name="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            >
              {
                itemsQuery.data?.data.items.map((i) => (
                  <MenuItem key={i._id} value={i._id}>
                    {i.name}
                    &nbsp;
                    (
                    {i.unitShortform}
                    )
                  </MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">House</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <Select
              fullWidth
              size="small"
              name="house"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
            >
              {
                housesQuery.data?.data.houses.map((h) => (
                  <MenuItem key={h._id} value={h._id}>{h.name}</MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Quantity Issued</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: 1,
              }}
              size="small"
              name="quantityIssued"
              value={quantityIssued}
              onChange={(e) => setQuantityIssued(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="contained" disabled={isLoading} onClick={() => mutate()} startIcon={<Add />}>
              {
                isLoading
                  ? <CircularProgress />
                  : 'Add Record'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
