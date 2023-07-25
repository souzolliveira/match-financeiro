import React from 'react';
import { Route, Routes as Routering } from 'react-router-dom';

import { useLoader } from 'hooks/useLoader';

import Add from 'views/Add';
import Dividend from 'views/Add/Dividend';
import Expense from 'views/Add/Expense';
import Income from 'views/Add/Income';
import Investiment from 'views/Add/Investiment';
import Redemption from 'views/Add/Redemption';
import Budgets from 'views/Budgets';
import Card from 'views/Card';
import Expenses from 'views/Expenses';
import Home from 'views/Home/Home';
import Incomes from 'views/Incomes';
import Investiments from 'views/Investiments';
import Login from 'views/Login';
import NotFound from 'views/NotFound';
import Register from 'views/Register';
import Settings from 'views/Settings';
import Stats from 'views/Stats';
import Transactions from 'views/Transactions';
import User from 'views/User';

import PrivateRoute from 'components/PrivateRoute';

const Routes = () => {
  const { loader } = useLoader();

  return (
    <>
      {loader()}
      <Routering>
        <Route exact='true' path='/' element={<PrivateRoute />}>
          <Route exact='true' path='/' element={<Home />} />
          <Route exact='true' path='/cards' element={<Card />} />
          <Route exact='true' path='/incomes' element={<Incomes />} />
          <Route exact='true' path='/expenses' element={<Expenses />} />
          <Route exact='true' path='/investiments' element={<Investiments />} />
          <Route exact='true' path='/budgets' element={<Budgets />} />
          <Route exact='true' path='/stats' element={<Stats />} />
          <Route exact='true' path='/transactions' element={<Transactions />} />
          <Route exact='true' path='/add' element={<Add />} />
          <Route exact='true' path='/add/income' element={<Income />} />
          <Route exact='true' path='/add/expense' element={<Expense />} />
          <Route exact='true' path='/add/investiment' element={<Investiment />} />
          <Route exact='true' path='/add/redemption' element={<Redemption />} />
          <Route exact='true' path='/add/dividend' element={<Dividend />} />
          <Route exact='true' path='/settings' element={<Settings />} />
          <Route exact='true' path='/user' element={<User />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routering>
    </>
  );
};

export default Routes;
