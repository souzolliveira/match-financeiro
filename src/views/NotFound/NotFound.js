import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Button from 'components/Button';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <span className={styles.notFound__message}>{t('LOST')}</span>
      <div className={styles.notFound__image} />
      <Button type='button' kind='primary' size='lg' onClick={() => navigate('/')}>
        {t('GO.HOME')}
      </Button>
    </div>
  );
};

export default NotFound;
