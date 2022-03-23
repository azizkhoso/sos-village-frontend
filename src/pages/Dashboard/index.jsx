import React from 'react';

import { useAtom } from 'jotai';

import { Navigate } from 'react-router-dom';

import login from '../../atoms/login';

export default function Dashboard() {
  const [isLoggedIn] = useAtom(login);
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <div className="w-full">
      <h1>Dashboard</h1>
    </div>
  );
}
