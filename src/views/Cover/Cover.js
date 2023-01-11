import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';

import Logo from 'assets/logo_main.png';

import styles from './Cover.module.scss';

const Cover = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.cover}>
      <img alt='Match Financeiro Logo' src={Logo} className={styles.cover__logo} />
      <div className={styles.cover__buttons}>
        <div className={styles.cover__login}>
          <Button type='submit' kind='primary' size='lg' onClick={() => navigate('/login')}>
            {t('LOGIN')}
          </Button>
        </div>
        <div className={styles.cover__register}>
          <Button type='submit' kind='outline' size='lg' onClick={() => navigate('/register')}>
            {t('REGISTER')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cover;
