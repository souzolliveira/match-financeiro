import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fill from 'components/Fill';
import Icon from 'components/Icon';

import styles from './Add.module.scss';

const Add = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.add}>
      <div className={styles.add__header}>
        <button type='button' onClick={() => navigate('/')} className={styles.add__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.add__returnicon} />
        </button>
        <span className={styles.add__title}>{t('ADD')}</span>
      </div>
      <Fill />
      <div className={styles.add__container}>
        <div className={styles.add__options}>
          <Link to='/add/income' className={styles.add__option}>
            {t('INCOMES')}
          </Link>
          <Link to='/add/expense' className={styles.add__option}>
            {t('EXPENSES')}
          </Link>
          <Link to='/add/investiment' className={styles.add__option}>
            {t('INVESTIMENTS')}
          </Link>
          <Link to='/add/redemption' className={styles.add__option}>
            {t('REDEMPTIONS')}
          </Link>
          <Link to='/add/dividend' className={styles.add__option}>
            {t('DIVIDENDS')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Add;
