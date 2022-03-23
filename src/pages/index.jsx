import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashbaord from './Dashboard';
import Login from './Login';
import NotFound from './404';

export default function Pages() {
  return (
    <div id="pages" className="flex w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashbaord />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
