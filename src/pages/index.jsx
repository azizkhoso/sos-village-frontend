import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  Typography,
  LinearProgress,
} from '@mui/material';

import { useMutation } from 'react-query';

import Login from './login';
import Admin from './admin';
import NotFound from './404';

import useLoginStore from '../stores/login';

import { verifyLogin } from '../api/login';

export default function Pages() {
  const loginStore = useLoginStore((state) => state);
  const { isLoading, mutate } = useMutation(
    (token) => verifyLogin(token),
    {
      onSuccess: ({ data }) => {
        if (data.verified) {
          loginStore.login();
        } else {
          sessionStorage.removeItem('token');
          loginStore.logout();
        }
      },
    },
  );
  React.useEffect(() => {
    mutate(sessionStorage.getItem('token'));
  }, []);
  if (isLoading) {
    return (
      <div className="absolute flex items-center justify-center w-full h-full p-6 bg-white">
        <Typography variant="h4" align="center">
          SOS Village Management System
          <LinearProgress className="w-full" />
        </Typography>
      </div>
    );
  }
  return (
    <div id="pages" className="flex w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/admin" />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
