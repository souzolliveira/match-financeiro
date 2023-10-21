/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useLoader } from 'hooks/useLoader';
import useNetwork from 'hooks/useNetwork';
import { useNotification } from 'hooks/useNotification';
import authenticateService from 'services/auth.service';
import api from 'services/conf.service';

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const { setIsLoading } = useLoader();

  const [data, setData] = useState(() => {
    const sessionGuid = JSON.parse(localStorage.getItem('@match-financeiro:session'))?.session_guid;
    if (sessionGuid) return { sessionGuid };
    return null;
  });

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
          if (error?.response?.status?.includes(401)) {
            localStorage.removeItem('@match-financeiro:session');
            setData(null);
          }
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ ...error?.response?.data, code: error?.response?.status } || error?.response?.statusText);
      }
    });
  }, []);

  const signOut = useCallback(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [handleError]);

  const signIn = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      try {
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
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        addToast({
          content: t('LOGIN.ERROR'),
          type: 'danger',
        });
        setData(null);
      }
    },
    [addToast, handleError, navigate, t]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ session: data, signIn, signOut, handleError }}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an authprovider');

  return context;
}
