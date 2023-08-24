import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes/Routes';

import { AuthProvider } from 'hooks/useAuth';
import { LoaderProvider } from 'hooks/useLoader';
import useLocale from 'hooks/useLocale';
import { NotificationProvider } from 'hooks/useNotification';
import useTheme from 'hooks/useTheme';

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
    <Router basename='/app'>
      <NotificationProvider>
        <LoaderProvider>
          <AuthProvider>
            <div className={styles.app}>
              <Routes />
            </div>
          </AuthProvider>
        </LoaderProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
