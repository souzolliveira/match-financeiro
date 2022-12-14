import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'hooks/useAuth';
import { NotificationProvider } from 'hooks/useNotification';
import useLocale from 'hooks/useLocale';
import useTheme from 'hooks/useTheme';

import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Login from 'views/Login/Login';
import NoConnection from 'views/NoConnection/NoConnection';
import Register from 'views/Register/Register';

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
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<NoConnection />} />
            </Route>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
