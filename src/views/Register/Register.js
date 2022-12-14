import React from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useNotification } from 'hooks/useNotification';

import styles from './Register.module.scss';

const Register = () => {
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const { signIn, isSigningIn } = useAuth();

  return <div className={styles.Register}>Register</div>;
};

export default Register;
