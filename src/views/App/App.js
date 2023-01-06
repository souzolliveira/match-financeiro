import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'hooks/useAuth';
import useLocale from 'hooks/useLocale';
import { NotificationProvider } from 'hooks/useNotification';
import useTheme from 'hooks/useTheme';

import Budget from 'views/Budget/Budget';
import Home from 'views/Home/Home';
import Login from 'views/Login/Login';
import Register from 'views/Register/Register';
import Stats from 'views/Stats/Stats';
import Transactions from 'views/Transactions/Transactions';

import Navbar from 'components/Navbar/Navbar';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

import styles from './App.module.scss';

const App = () => {
  useLocale();

  const { componentMounted } = useTheme();

  useEffect(() => {
    const clearPreloader = setInterval(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hide');
        clearInterval(clearPreloader);
      }
    }, 500);
  }, []);

  if (!componentMounted) return <div />;

  return (
    <Router basename='/'>
      <NotificationProvider>
        <AuthProvider>
          <div className={styles.app}>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/transactions' element={<Transactions />} />
                <Route exact path='/stats' element={<Stats />} />
                <Route exact path='/budget' element={<Budget />} />
              </Route>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </div>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
