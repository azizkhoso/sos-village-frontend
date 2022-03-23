import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './login';
import Admin from './admin';
import NotFound from './404';

export default function Pages() {
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
