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

import { getItems } from '../../../api/admin/items';
import { addInkind } from '../../../api/admin/inkinds';

export default function NewInkind() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [registeryNumber, setRegisteryNumber] = useState(0);
  const [item, setItem] = useState(''); // Item Id in string format
  const [quantityReceived, setQuantityReceived] = useState(0);
  const toastsStore = useToastsStore((state) => state);
  const itemsQuery = useQuery('items', getItems, { refetchOnMount: true });
  const { isLoading, mutate } = useMutation(
    () => addInkind(
      {
        registeryNumber,
        item,
        quantityReceived,
      },
    ),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Inkind added successfully', severity: 'success' });
        queryClient.invalidateQueries('inkinds');
        navigate('/admin/inkinds');
      },
      onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
    },
  );
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center" className="w-full lg:w-9/12">New Inkind</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Registery Number</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: 1,
              }}
              size="small"
              name="registeryNumber"
              value={registeryNumber}
              onChange={(e) => setRegisteryNumber(e.target.value)}
            />
          </Grid>
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
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Quantity Received</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: 1,
              }}
              size="small"
              name="quantityReceived"
              value={quantityReceived}
              onChange={(e) => setQuantityReceived(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="contained" disabled={isLoading} onClick={() => mutate()} startIcon={<Add />}>
              {
                isLoading
                  ? <CircularProgress />
                  : 'Add Inkind'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
