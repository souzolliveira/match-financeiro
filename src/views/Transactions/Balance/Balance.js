import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import bindBalanceColor from 'helpers/bindBalanceColor';
import convertToString from 'helpers/convertToString';

import Icon from 'components/Icon/Icon';

import Filters from '../Filters/Filters';

import styles from './Balance.module.scss';

const Balance = ({
  active,
  setActive,
  balance,
  incomes,
  expenses,
  investiments,
  categories,
  subcategories,
  fetchTransactions,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  transactionType,
  setTransactionType,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  groupBy,
  setGroupBy,
}) => {
  const { t } = useTranslation();

  const nav = useRef(null);
  const header = useRef(null);

  const handleClickOutside = event => {
    if (active && nav.current && !nav.current.contains(event.target) && header.current && !header.current.contains(event.target))
      setActive(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={`${styles.balance} ${active ? styles.balance__active : ''}`}>
      <div
        onClick={() => {
          setActive(state => !state);
        }}
        onKeyDown={() => {
          setActive(state => !state);
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
          className={`${styles.balance__icon} ${active ? styles.balance__nav__active : ''}`}
        />
      </div>
      <div className={`${styles.balance__nav} ${active ? styles.balance__nav__active : ''}`} ref={nav}>
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
        <Filters
          setActive={setActive}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          categories={categories}
          subcategories={subcategories}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          category={category}
          setCategory={setCategory}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          fetchTransactions={fetchTransactions}
        />
      </div>
    </div>
  );
};

export default Balance;
