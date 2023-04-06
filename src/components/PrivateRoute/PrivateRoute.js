import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { TransactionsProvider } from 'hooks/useTransactions';

import Header from 'components/Header/Header';
import Navbar from 'components/Navbar/Navbar';

import styles from './PrivateRoute.module.scss';

const PrivateRoute = () => {
  const { session } = useAuth();

  return session ? (
    <div className={styles.privateRoute}>
      <TransactionsProvider>
        <Header />
        <Outlet />
        <Navbar />
      </TransactionsProvider>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
