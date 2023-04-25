import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import registerService from 'services/register.service';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import Logo from 'assets/logo_main.png';

import styles from './Register.module.scss';

const Register = () => {
  const { addToast } = useNotification();
  const { t } = useTranslation();
  const { handleError, signIn } = useAuth();
  const { setIsLoading } = useLoader();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = e => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      addToast({
        content: t('REGISTER.WARNING.FIELDS'),
        type: 'warning',
      });
      return;
    }
    if (password !== confirmPassword) {
      addToast({
        content: t('REGISTER.WARNING.PASSWORD'),
        type: 'warning',
      });
      return;
    }
    setIsLoading(true);
    registerService
      .register({ name, email, password, handleError })
      .then(() => {
        signIn({ email, password });
      })
      .catch(() => {
        addToast({
          content: t('REGISTER.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.register} onSubmit={e => register(e)}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.register__logo} />
      <div className={styles.register__fields}>
        <div className={styles.register__inputgroup}>
          <span className={styles.register__label}>{t('NAME')}</span>
          <Input name='name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className={styles.register__inputgroup}>
          <span className={styles.register__label}>{t('EMAIL')}</span>
          <Input name='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.register__inputgroup}>
          <span className={styles.register__label}>{t('PASSWORD')}</span>
          <Input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.register__inputgroup}>
          <span className={styles.register__label}>{t('PASSWORD.CONFIRM')}</span>
          <Input type='password' name='confirm-password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div className={styles.register__submit}>
          <Button type='submit' kind='primary' size='lg'>
            {t('REGISTER')}
          </Button>
        </div>
        <div className={styles.register__login}>
          <span className={styles.register__label}>{t('HAS.ACCOUNT')}</span>
          <Link to='/login' className={styles.register__loginlink}>
            {t('DO.LOGIN')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
