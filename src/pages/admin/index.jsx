import React from 'react';

import {
  IconButton,
  Typography,
} from '@mui/material';

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
import Houses from './houses';
import Items from './items';
import Records from './records';

import useLoginStore from '../../stores/login';

export default function Dashboard() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const loginStore = useLoginStore((state) => state);
  if (!loginStore.isLoggedIn) return <Navigate to="/login" />;
  return (
    <div className="flex flex-col w-full md:flex-row">
      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
      <section className="flex-grow md:w-9/12 lg:w-9/12 2xl:w-10/12">
        <div className={`flex ${openDrawer ? 'justify-between' : 'justify-end'} w-full py-2 px-4 border-b`} style={{ minHeight: '40px' }}>
          <IconButton className="block md:hidden" onClick={() => setOpenDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" className="flex items-center justify-center flex-grow">Admin</Typography>
          <IconButton onClick={() => { loginStore.logout(); sessionStorage.removeItem('token'); }}>
            <Logout />
          </IconButton>
        </div>
        <div className="block p-3">
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<h1>Admin dashboard</h1>} />
            <Route path="/houses/*" element={<Houses />} />
            <Route path="/items/*" element={<Items />} />
            <Route path="/records/*" element={<Records />} />
            <Route path="/inkinds/*" element={<h1>inkinds</h1>} />
          </Routes>
        </div>
      </section>
    </div>
  );
}
