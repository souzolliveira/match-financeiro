import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import authenticateService from 'services/auth.service';
import api from 'services/conf.service';

import useNetwork from 'hooks/useNetwork';
import { useNotification } from 'hooks/useNotification';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
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
      .logout(data?.sessionGuid, handleError)
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
  }, [data, handleError]);

  const signIn = useCallback(
    async ({ username, password }) => {
      try {
        setIsSigningIn(true);
        const response = await authenticateService.authenticate(username?.toLowerCase(), password, handleError);
        const sessionGuid = response?.session_guid;
        if (sessionGuid) {
          localStorage.setItem('@match-financeiro:session', JSON.stringify(response));
          api.defaults.headers.session_guid = sessionGuid;
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
    [addToast, handleError, t]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ session: data, signIn, signOut, isSigningIn, isSigningOut, handleError }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an authprovider');

  return context;
}
