import React from 'react';
import { Route, Routes as Routering } from 'react-router-dom';

import { useLoader } from 'hooks/useLoader';

import Home from 'views/Home/Home';
import Login from 'views/Login/Login';
import NotFound from 'views/NotFound/NotFound';
import Register from 'views/Register/Register';
import Stats from 'views/Stats/Stats';
import Transactions from 'views/Transactions/Transactions';

import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const Routes = () => {
  const { loader } = useLoader();

  return (
    <>
      {loader()}
      <Routering>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/transactions' element={<Transactions />} />
          <Route exact path='/stats' element={<Stats />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routering>
    </>
  );
};

export default Routes;
