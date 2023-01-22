import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import groupByTypes from 'constants/groupByTypes';
import transactionTypes from 'constants/transactionTypes';
import handleParams from 'helpers/handleParams';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';

import AppliedFilters from '../AppliedFilters/AppliedFilters';

import styles from './Filters.module.scss';

const Filters = ({
  setActive,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
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

  const [intermediateStartDate, setIntermediateStartDate] = useState(startDate);
  const [intermediateEndDate, setIntermediateEndDate] = useState(endDate);
  const [intermediateTransactionType, setIntermediateTransactionType] = useState(transactionType);
  const [intermediateCategory, setIntermediateCategory] = useState(category);
  const [intermediateSubcategory, setIntermediateSubcategory] = useState(subcategory);
  const [intermediateGroupBy, setIntermediateGroupBy] = useState(groupBy);

  const handleFilter = () => {
    setActive(false);
    setStartDate(intermediateStartDate);
    setEndDate(intermediateEndDate);
    setTransactionType(intermediateTransactionType);
    setCategory(intermediateCategory);
    setSubcategory(intermediateSubcategory);
    setGroupBy(intermediateGroupBy);
    fetchTransactions(
      handleParams({
        startDate: intermediateStartDate,
        endDate: intermediateEndDate,
        transactionType: intermediateTransactionType,
        category: intermediateCategory,
        subcategory: intermediateSubcategory,
        groupBy: intermediateGroupBy,
      })
    );
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.DATE.START')}:</span>
        <Input
          className={styles.filters__input}
          type='date'
          name='start-date'
          value={intermediateStartDate}
          onChange={e => setIntermediateStartDate(e.target.value)}
        />
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.DATE.END')}:</span>
        <Input
          className={styles.filters__input}
          type='date'
          name='end-date'
          value={intermediateEndDate}
          onChange={e => setIntermediateEndDate(e.target.value)}
        />
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.TRANSACTION_TYPE')}:</span>
        <Select
          className={styles.filters__select}
          value={intermediateTransactionType}
          onChange={e => {
            setIntermediateTransactionType(e.target.value);
            setIntermediateCategory('');
            setIntermediateSubcategory('');
          }}
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
        <span className={styles.filters__label}>{t('FILTERS.CATEGORY')}:</span>
        <Select
          className={styles.filters__select}
          value={intermediateCategory}
          onChange={e => {
            setIntermediateCategory(e.target.value);
            setIntermediateSubcategory('');
          }}
          disabled={intermediateTransactionType === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {categories
            .filter(cat => cat.transaction_type === intermediateTransactionType)
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
        <span className={styles.filters__label}>{t('FILTERS.SUBCATEGORY')}:</span>
        <Select
          className={styles.filters__select}
          value={intermediateSubcategory}
          onChange={e => setIntermediateSubcategory(e.target.value)}
          disabled={intermediateCategory === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {subcategories
            .filter(subcat => subcat.category_name === intermediateCategory)
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
        <span className={styles.filters__label}>{t('FILTERS.GROUP')}:</span>
        <Select className={styles.filters__select} value={intermediateGroupBy} onChange={e => setIntermediateGroupBy(e.target.value)}>
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
      <AppliedFilters
        setActive={setActive}
        startDate={startDate}
        setStartDate={setStartDate}
        setIntermediateStartDate={setIntermediateStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setIntermediateEndDate={setIntermediateEndDate}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        setIntermediateTransactionType={setIntermediateTransactionType}
        category={category}
        setCategory={setCategory}
        setIntermediateCategory={setIntermediateCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        setIntermediateSubcategory={setIntermediateSubcategory}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        setIntermediateGroupBy={setIntermediateGroupBy}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default Filters;
