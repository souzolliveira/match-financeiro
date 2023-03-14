import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fill from 'components/Fill/Fill';
import Icon from 'components/Icon/Icon';

import styles from './Settings.module.scss';

const Settings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.settings}>
      <div className={styles.settings__header}>
        <button type='button' onClick={() => navigate('/')} className={styles.settings__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.settings__returnicon} />
        </button>
        <span className={styles.settings__title}>{t('SETTINGS')}</span>
      </div>
      <Fill />
      <div className={styles.settings__container}>
        <div className={styles.settings__options}>
          <Link to='/categories' className={styles.settings__option}>
            {t('CATEGORIES')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
