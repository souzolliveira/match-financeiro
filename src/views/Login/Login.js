import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useNotification } from 'hooks/useNotification';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

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
    <form className={styles.login} onSubmit={e => login(e)}>
      <div className={styles.login__fields}>
        <div className={styles.login__inputgroup}>
          <span className={styles.login__label}>{t('LOGIN.EMAIL')}</span>
          <Input name='username' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.login__inputgroup}>
          <span className={styles.login__label}>{t('LOGIN.PASSWORD')}</span>
          <Input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.login__inputsubmit}>
          <Button type='submit' kind='primary' size='lg' disabled={isSigningIn}>
            {t('LOGIN.SUBMIT')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
