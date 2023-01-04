import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useNotification } from 'hooks/useNotification';

import styles from './Login.module.scss';

const Login = () => {
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const { signIn, isSigningIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = e => {
    e.preventDefault();
    if (!email || !password) {
      addToast({
        content: '',
        type: 'warning',
      });
      return;
    }
    signIn({ email, password });
  };

  return (
    <div className={styles.login}>
      <form onSubmit={e => login(e)}>
        <div className={styles.inputGroup}>
          <span>Email</span>
          <input name='username' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <span>Password</span>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.inputSubmit}>
          <button type='submit' disabled={isSigningIn}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
