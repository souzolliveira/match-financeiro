import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import bindBalanceColor from 'helpers/bindBalanceColor';
import convertToString from 'helpers/convertToString';
import { useTransactions } from 'hooks/useTransactions';

import Icon from 'components/Icon/Icon';

import Filters from '../Filters/Filters';

import styles from './Balance.module.scss';

const Balance = () => {
  const { balance, incomes, expenses, investiments, isFiltersTabOpened, setIsFiltersTabOpened } = useTransactions();
  const { t } = useTranslation();

  const nav = useRef(null);
  const header = useRef(null);

  const handleClickOutside = event => {
    if (
      isFiltersTabOpened &&
      nav.current &&
      !nav.current.contains(event.target) &&
      header.current &&
      !header.current.contains(event.target)
    )
      setIsFiltersTabOpened(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={`${styles.balance} ${isFiltersTabOpened ? styles.balance__active : ''}`}>
      <div
        onClick={() => {
          setIsFiltersTabOpened(state => !state);
        }}
        onKeyDown={() => {
          setIsFiltersTabOpened(state => !state);
        }}
        ref={header}
        role='button'
        tabIndex={0}
        className={styles.balance__button}
      >
        <span className={styles.balance__label}>{t('TRANSACTIONS.BALANCE')}</span>
        <span className={`${styles.balance__value} ${bindBalanceColor(balance, styles)}`}>R$ {convertToString(balance)}</span>
        <Icon
          name='chevron-top'
          width={24}
          height={24}
          fill='var(--gold-darker)'
          className={`${styles.balance__icon} ${isFiltersTabOpened ? styles.balance__nav__active : ''}`}
        />
      </div>
      <div className={`${styles.balance__nav} ${isFiltersTabOpened ? styles.balance__nav__active : ''}`} ref={nav}>
        <div className={styles.balance__results}>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.INCOMES')}</span>
            <span className={styles.results__incomes}>R$ {convertToString(incomes)}</span>
          </div>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.EXPENSES')}</span>
            <span className={styles.results__expenses}>R$ {convertToString(expenses)}</span>
          </div>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.INVESTIMENTS')}</span>
            <span className={styles.results__investiments}>R$ {convertToString(investiments)}</span>
          </div>
        </div>
        <Filters />
      </div>
    </div>
  );
};

export default Balance;
