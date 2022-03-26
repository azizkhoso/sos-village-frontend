import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  Add,
} from '@mui/icons-material';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useMutation, useQueryClient } from 'react-query';

import useToastsStore from '../../../stores/toasts';

import { addItem } from '../../../api/admin/items';

export default function NewItem() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toastsStore = useToastsStore((state) => state);
  const { isLoading, mutate } = useMutation(
    (values) => addItem(values),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Item added successfully', severity: 'success' });
        queryClient.invalidateQueries('items');
        navigate('/admin/items');
      },
      onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
    },
  );
  // Form requirements
  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Full Name should be at least 2 characters long'),
    measurementUnit: yup.string().required('Measurement Unit name is required').min(2, 'Measurement Unit name should be at least 2 characters long'),
    unitShortform: yup.string().required('Unit short form is required').min(1, 'Unit short form should be at least 1 character long'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      measurementUnit: '',
      unitShortform: '',
    },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
  });
  // -----------------
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center" className="w-full lg:w-9/12">New Item</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" onSubmit={formik.handleSubmit} xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Full Name</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="name"
              placeholder="Flour"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Measurement Unit</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="measurementUnit"
              placeholder="Kilogram"
              value={formik.values.measurementUnit}
              onChange={formik.handleChange}
              error={formik.touched.measurementUnit && Boolean(formik.errors.measurementUnit)}
              helperText={formik.touched.measurementUnit && formik.errors.measurementUnit}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Unit Short form</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="unitShortform"
              placeholder="kg"
              value={formik.values.unitShortform}
              onChange={formik.handleChange}
              error={formik.touched.unitShortform && Boolean(formik.errors.unitShortform)}
              helperText={formik.touched.unitShortform && formik.errors.unitShortform}
            />
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="contained" disabled={isLoading} startIcon={<Add />}>
              {
                isLoading
                  ? <CircularProgress />
                  : 'Add Item'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
