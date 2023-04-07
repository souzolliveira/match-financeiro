import React from 'react';

import { useTranslation } from 'react-i18next';

import bindBalanceColor from 'helpers/bindBalanceColor';
import convertToString from 'helpers/convertToString';
import useDate from 'hooks/useDate';
import { useTransactions } from 'hooks/useTransactions';

import styles from './Summary.module.scss';

const Summary = () => {
  const { t } = useTranslation();
  const { getMonth } = useDate();
  const { balance, incomes, expenses, investiments } = useTransactions();

  return (
    <div className={styles.summary}>
      <div className={styles.summary__header}>
        <h3 className={styles.summary__title}>{t('SUMMARY', { month: getMonth() })}</h3>
      </div>
      <div className={styles.summary__content}>
        <div className={styles.summary__column}>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>{t('SUMMARY.INCOMES')}</span>
            <span className={styles.summary__incomes}>R$ {convertToString(incomes)}</span>
          </div>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>{t('SUMMARY.EXPENSES')}</span>
            <span className={styles.summary__expenses}>R$ {convertToString(expenses)}</span>
          </div>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>{t('SUMMARY.INVESTIMENTS')}</span>
            <span className={styles.summary__investiments}>R$ {convertToString(investiments)}</span>
          </div>
        </div>
        <div className={styles.summary__balance}>
          <span className={styles.summary__label}>{t('SUMMARY.BALANCE')}</span>
          <span className={bindBalanceColor(balance, styles)}>R$ {convertToString(balance)}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
