import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import useNetwork from 'hooks/useNetwork';
import { useNotification } from 'hooks/useNotification';
import authenticateService from 'services/auth.service';
import api from 'services/conf.service';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const [data, setData] = useState(() => {
    const sessionGuid = JSON.parse(localStorage.getItem('@match-financeiro:session'))?.session_guid;
    if (sessionGuid) return { sessionGuid };
    return null;
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      if (!localStorage.getItem('@match-financeiro:session')) {
        setData(null);
        localStorage.removeItem('@match-financeiro:session');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleError = useCallback(error => {
    const isOnline = useNetwork;
    return new Promise((resolve, reject) => {
      if (error && !error?.response) {
        if (isOnline) {
          localStorage.removeItem('@match-financeiro:session');
          setData(null);
        }
        reject(error);
      } else {
        const statusGroup = String(error?.response?.status).charAt(0);
        if (!(statusGroup === '2' || statusGroup === '3'))
          if ([401].indexOf(error?.response?.status) !== -1) {
            localStorage.removeItem('@match-financeiro:session');
            setData(null);
          }
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ ...error?.response?.data, code: error?.response?.status } || error?.response?.statusText);
      }
    });
  }, []);

  const signOut = useCallback(() => {
    setIsSigningOut(true);
    authenticateService
      .signOut({ handleError })
      .then(() => {
        localStorage.removeItem('@match-financeiro:session');
        setData(null);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        setIsSigningOut(false);
      });
  }, [handleError]);

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        setIsSigningIn(true);
        const response = await authenticateService.signIn({
          email: email?.toLowerCase(),
          password,
          handleError,
        });
        const sessionGuid = response?.session_guid;
        if (sessionGuid) {
          localStorage.setItem('@match-financeiro:session', JSON.stringify(response));
          api.defaults.headers.session_guid = sessionGuid;
          navigate('/');
        }
        setData({ sessionGuid });
        setIsSigningIn(false);
      } catch (error) {
        setIsSigningIn(false);
        addToast({
          content: t('LOGIN.ERROR'),
          type: 'danger',
        });
      }
    },
    [addToast, handleError, navigate, t]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ session: data, signIn, isSigningIn, signOut, isSigningOut, handleError }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an authprovider');

  return context;
}
