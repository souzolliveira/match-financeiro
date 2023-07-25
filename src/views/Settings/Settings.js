import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fill from 'components/Fill';
import Icon from 'components/Icon';

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
          <Link to='/cards' className={styles.settings__option}>
            {t('CARDS')}
          </Link>
          <Link to='/incomes' className={styles.settings__option}>
            {t('INCOMES')}
          </Link>
          <Link to='/expenses' className={styles.settings__option}>
            {t('EXPENSES')}
          </Link>
          <Link to='/investiments' className={styles.settings__option}>
            {t('INVESTIMENTS')}
          </Link>
          <Link to='/budgets' className={styles.settings__option}>
            {t('BUDGETS')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
