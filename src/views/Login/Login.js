import React from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useNotification } from 'hooks/useNotification';

import styles from './Login.module.scss';

const Login = () => {
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const { signIn, isSigningIn } = useAuth();

  return <div className={styles.login}>Login</div>;
};

export default Login;
