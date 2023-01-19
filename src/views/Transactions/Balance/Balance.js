import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import bindBalanceColor from 'helpers/bindBalanceColor';
import convertNumbers from 'helpers/convertNumbers';

import Icon from 'components/Icon/Icon';

import Filters from '../Filters/Filters';

import styles from './Balance.module.scss';

const Balance = ({ active, setActive, balance, incomes, expenses, investiments, categories, subcategories, fetchTransactions }) => {
  const { t } = useTranslation();

  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [groupBy, setGroupBy] = useState('');

  return (
    <div className={`${styles.balance} ${active ? styles.balance__active : ''}`}>
      <div
        onClick={() => setActive(state => !state)}
        onKeyDown={() => setActive(state => !state)}
        role='button'
        tabIndex={0}
        className={styles.balance__button}
      >
        <span className={styles.balance__label}>{t('TRANSACTIONS.BALANCE')}</span>
        <span className={`${styles.balance__value} ${bindBalanceColor(balance, styles)}`}>
          R$ {convertNumbers.convertToString(balance)}
        </span>
        <Icon
          name='chevron-top'
          width={24}
          height={24}
          fill='var(--gold-darker)'
          className={`${styles.balance__icon} ${active ? styles.balance__nav__active : ''}`}
        />
      </div>
      <div className={`${styles.balance__nav} ${active ? styles.balance__nav__active : ''}`}>
        <div className={styles.balance__results}>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.INCOMES')}</span>
            <span className={styles.results__incomes}>R$ {convertNumbers.convertToString(incomes)}</span>
          </div>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.EXPENSES')}</span>
            <span className={styles.results__expenses}>R$ {convertNumbers.convertToString(expenses)}</span>
          </div>
          <div className={styles.results__column}>
            <span className={styles.results__label}>{t('TRANSACTIONS.INVESTIMENTS')}</span>
            <span className={styles.results__investiments}>R$ {convertNumbers.convertToString(investiments)}</span>
          </div>
        </div>
        <Filters
          setActive={setActive}
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
