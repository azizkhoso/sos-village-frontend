import React from 'react';

import {
  IconButton,
  Typography,
} from '@mui/material';

import { useAtom } from 'jotai';

import {
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import {
  Logout,
  Menu,
} from '@mui/icons-material';

import Sidebar from './sidebar';

import login from '../../atoms/login';

export default function Dashboard() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = useAtom(login);
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <div className="flex flex-col w-full md:flex-row">
      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
      <section className="flex-grow md:w-9/12 lg:w-9/12 2xl:w-10/12">
        <div className={`flex ${openDrawer ? 'justify-between' : 'justify-end'} w-full py-2 px-4 border-b`} style={{ minHeight: '40px' }}>
          <IconButton className="block md:hidden" onClick={() => setOpenDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" className="flex items-center justify-center flex-grow">Admin</Typography>
          <IconButton onClick={() => setLoggedIn(false)}>
            <Logout />
          </IconButton>
        </div>
        <div className="block p-3">
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<h1>Admin dashboard</h1>} />
            <Route path="/houses" element={<h1>houses</h1>} />
            <Route path="/items" element={<h1>Items</h1>} />
            <Route path="/records" element={<h1>records</h1>} />
            <Route path="/inkinds" element={<h1>inkinds</h1>} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
