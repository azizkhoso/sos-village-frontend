import React from 'react';

import {
  Stack,
  Card,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

import { Navigate } from 'react-router-dom';

import * as yup from 'yup';
import { useFormik } from 'formik';

import useLoginStore from '../../stores/login';
import useToastsStore from '../../stores/toasts';

export default function Login() {
  const loginStore = useLoginStore((state) => state);
  const toastsStore = useToastsStore((state) => state);
  const isLoading = false;
  // Form requirements
  const schema = yup.object({
    user: yup.string().required('User is required').min(3, 'User name should be at least 3 characters long'),
    password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters long'),
  });
  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      loginStore.login();
      toastsStore.addToast({ message: 'Working', severity: 'success' });
    },
  });
  // -----------------
  if (loginStore.isLoggedIn) return <Navigate to="/" />;
  return (
    <Card elevation={3} className="self-center w-full py-6 mx-3 md:w-1/2 lg:w-1/3 md:mx-auto">
      <Stack spacing={2}>
        <Typography variant="h5" align="center">Login as an Admin</Typography>
        <Stack spacing={2} className="px-6" component="form" onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="User"
            name="user"
            value={formik.values.user}
            onChange={formik.handleChange}
            error={formik.touched.user && formik.errors.user}
            helperText={formik.touched.user && formik.errors.user}
          />
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" disabled={isLoading} variant="contained">
            {
              isLoading
                ? <CircularProgress />
                : 'Login as Admin'
            }
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
