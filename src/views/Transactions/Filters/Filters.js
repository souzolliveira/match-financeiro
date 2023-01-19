import React from 'react';

import { useTranslation } from 'react-i18next';

import groupByTypes from 'constants/groupByTypes';
import transactionTypes from 'constants/transactionTypes';
import handleParams from 'helpers/handleParams';

import Button from 'components/Button/Button';
import Select from 'components/Select/Select';

import styles from './Filters.module.scss';

const Filters = ({
  setActive,
  categories,
  subcategories,
  transactionType,
  setTransactionType,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  groupBy,
  setGroupBy,
  fetchTransactions,
}) => {
  const { t } = useTranslation();

  const handleFilter = () => {
    setActive(false);
    fetchTransactions(handleParams({ transactionType, category, subcategory, groupBy }));
  };
  return (
    <div className={styles.filters}>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.PERIOD')}</span>
        <input type='date' />
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.TRANSACTION_TYPE')}</span>
        <Select
          className={styles.filters__select}
          value={transactionType}
          onChange={e => {
            setTransactionType(e.target.value);
            setCategory('');
            setSubcategory('');
          }}
          defaultValue=''
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          <option value={transactionTypes.INCOME}>{t('FILTERS.INCOMES')}</option>
          <option value={transactionTypes.EXPENSE}>{t('FILTERS.EXPENSES')}</option>
          <option value={transactionTypes.INVESTIMENT}>{t('FILTERS.INVESTIMENTS')}</option>
        </Select>
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.CATEGORY')}</span>
        <Select
          className={styles.filters__select}
          value={category}
          onChange={e => {
            setCategory(e.target.value);
            setSubcategory('');
          }}
          defaultValue=''
          disabled={transactionType === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {categories
            .filter(cat => cat.transaction_type === transactionType)
            .map((item, index) => {
              return (
                <option key={index} value={item.category_name}>
                  {item.category_name}
                </option>
              );
            })}
        </Select>
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.SUBCATEGORY')}</span>
        <Select
          className={styles.filters__select}
          value={subcategory}
          onChange={e => setSubcategory(e.target.value)}
          defaultValue=''
          disabled={category === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {subcategories
            .filter(subcat => subcat.category_name === category)
            .map((item, index) => {
              return (
                <option key={index} value={item.subcategory_name}>
                  {item.subcategory_name}
                </option>
              );
            })}
        </Select>
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.GROUP')}</span>
        <Select className={styles.filters__select} value={groupBy} onChange={e => setGroupBy(e.target.value)} defaultValue=''>
          <option value='' disabled>
            {t('SELECT')}
          </option>
          <option value={groupByTypes.TRANSACTION_TYPE}>{t('FILTERS.GROUP.TRANSACTION_TYPE')}</option>
          <option value={groupByTypes.CATEGORY}>{t('FILTERS.GROUP.CATEGORY')}</option>
          <option value={groupByTypes.SUBCATEGORY}>{t('FILTERS.GROUP.SUBCATEGORY')}</option>
        </Select>
      </div>
      <div className={styles.filters__group}>
        <Button type='button' size='md' kind='primary' onClick={() => handleFilter()} className={styles.filters__submit}>
          {t('FILTERS.FILTER')}
        </Button>
      </div>
    </div>
  );
};

export default Filters;
