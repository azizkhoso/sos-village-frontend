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

import { addHouse } from '../../../api/admin/houses';

export default function NewHouse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toastsStore = useToastsStore((state) => state);
  const { isLoading, mutate } = useMutation(
    (values) => addHouse(values),
    {
      onSuccess: () => {
        toastsStore.addToast({ message: 'Houses added successfully', severity: 'success' });
        queryClient.invalidateQueries('houses');
        navigate('/admin/houses');
      },
      onError: (err) => toastsStore.addToast({ message: err.response?.data?.error || err.message, severity: 'error' }),
    },
  );
  // Form requirements
  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Full Name should be at least 2 characters long'),
    mother: yup.string().required('Mother name is required').min(2, 'Mother name should be at least 2 characters long'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      mother: '',
    },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
  });
  // -----------------
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" align="center" className="w-full lg:w-9/12">New House</Typography>
      <Grid container direction="column" rowSpacing={3} maxWidth="md">
        <Grid item container component="form" onSubmit={formik.handleSubmit} xs={12} lg={8} alignItems="center" rowSpacing={1}>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Full Name</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}><Typography variant="body1">Mother</Typography></Grid>
          <Grid item xs={8} md={8} lg={9}>
            <TextField
              fullWidth
              size="small"
              name="mother"
              value={formik.values.mother}
              onChange={formik.handleChange}
              error={formik.touched.mother && Boolean(formik.errors.mother)}
              helperText={formik.touched.mother && formik.errors.mother}
            />
          </Grid>
          <Grid item xs={12} className="flex items-center justify-center">
            <Button type="submit" variant="contained" disabled={isLoading} startIcon={<Add />}>
              {
                isLoading
                  ? <CircularProgress />
                  : 'Add House'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
