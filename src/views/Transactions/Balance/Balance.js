import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import transactionTypes from 'constants/transactionTypes';
import bindBalanceColor from 'helpers/bindBalanceColor';
import convertNumbers from 'helpers/convertNumbers';

import Icon from 'components/Icon/Icon';

import styles from './Balance.module.scss';

const Balance = ({ balance, incomes, expenses, investiments, categories, subcategories }) => {
  const { t } = useTranslation();

  const [active, setActive] = useState(false);

  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [costing, setCosting] = useState('');

  return (
    <div className={styles.balance}>
      <div onClick={() => setActive(state => !state)} onKeyDown={() => setActive(state => !state)} role='button' tabIndex={0}>
        <span className={styles.balance__label}>{t('TRANSACTIONS.BALANCE')}</span>
        <span className={`${styles.balance__value} ${bindBalanceColor(balance, styles)}`}>
          R$ {convertNumbers.convertToString(balance)}
        </span>
        <Icon
          name='chevron-top'
          width={24}
          height={24}
          fill='var(--gold-darker)'
          className={`${styles.balance__icon} ${active ? styles.balance__active : ''}`}
        />
      </div>
      <div className={`${styles.balance__nav} ${active ? styles.balance__active : ''}`}>
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
        <div className={styles.balance__filters}>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.PERIOD')}</span>
            <input type='date' />
          </div>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.TRANSACTION_TYPE')}</span>
            <select onChange={e => setTransactionType(e.target.value)} defaultValue=''>
              <option value='' disabled>
                {t('SELECT')}
              </option>
              <option value={transactionTypes.INCOME}>{t('FILTERS.INCOMES')}</option>
              <option value={transactionTypes.EXPENSE}>{t('FILTERS.EXPENSES')}</option>
              <option value={transactionTypes.INVESTIMENT}>{t('FILTERS.INVESTIMENTS')}</option>
            </select>
          </div>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.CATEGORY')}</span>
            <select>
              <option>{t('SELECT')}</option>
              {categories
                .filter(cat => cat.transaction_type === transactionType)
                .map((item, index) => {
                  return <option key={index}>{item.category_name}</option>;
                })}
            </select>
          </div>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.SUBCATEGORY')}</span>
            <select>
              <option>{t('SELECT')}</option>
              {subcategories.map((item, index) => {
                return <option key={index}>{item.subcategory_name}</option>;
              })}
            </select>
          </div>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.COSTING')}</span>
            <select>
              <option>{t('SELECT')}</option>
              <option>{t('FILTERS.COSTING.FIXED')}</option>
              <option>{t('FILTERS.COSTING.VARIABLE')}</option>
            </select>
          </div>
          <div className={styles.filters__group}>
            <span className={styles.filters__label}>{t('FILTERS.GROUP')}</span>
            <select>
              <option>{t('FILTERS.GROUP.NONE')}</option>
              <option>{t('FILTERS.GROUP.TRANSACTION_TYPE')}</option>
              <option>{t('FILTERS.GROUP.CATEGORY')}</option>
              <option>{t('FILTERS.GROUP.SUBCATEGORY')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
