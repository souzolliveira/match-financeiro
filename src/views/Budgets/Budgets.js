import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fill from 'components/Fill';
import Icon from 'components/Icon';

import styles from './Budgets.module.scss';

const Budgets = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.budgets}>
      <div className={styles.budgets__header}>
        <button type='button' onClick={() => navigate('/settings')} className={styles.budgets__return}>
          <Icon name='arrow-right' width={24} height={24} fill='white' className={styles.budgets__returnicon} />
        </button>
        <span className={styles.budgets__title}>{t('BUDGETS')}</span>
        <Fill />
        <button type='button' onClick={() => {}}>
          <Icon name='plus' width={24} height={24} fill='white' />
        </button>
      </div>
    </div>
  );
};

export default Budgets;
