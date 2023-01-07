import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import Navbar from 'components/Navbar/Navbar';

const PrivateRoute = () => {
  const { session } = useAuth();

  return session ? (
    <>
      <Outlet />
      <Navbar />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
