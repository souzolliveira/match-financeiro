import React from 'react';

import { useTranslation } from 'react-i18next';

import filterTypes from 'constants/filterTypes';
import handleParams from 'helpers/handleParams';

import Button from 'components/Button/Button';
import Pill from 'components/Pill/Pill';

import styles from './AppliedFilters.module.scss';

const AppliedFilters = ({
  setActive,
  transactionType,
  setTransactionType,
  setIntermediateTransactionType,
  category,
  setCategory,
  setIntermediateCategory,
  subcategory,
  setSubcategory,
  setIntermediateSubcategory,
  groupBy,
  setGroupBy,
  setIntermediateGroupBy,
  fetchTransactions,
}) => {
  const { t } = useTranslation();

  const onRemoveFilter = key => {
    setActive(false);
    if (key === filterTypes.TRANSACTION_TYPE) {
      setTransactionType('');
      setIntermediateTransactionType('');
      setCategory('');
      setIntermediateCategory('');
      setSubcategory('');
      setIntermediateSubcategory('');
    } else if (key === filterTypes.CATEGORY) {
      setCategory('');
      setIntermediateCategory('');
      setSubcategory('');
      setIntermediateSubcategory('');
    } else if (key === filterTypes.SUBCATEGORY) {
      setSubcategory('');
      setIntermediateSubcategory('');
    } else if (key === filterTypes.GROUP_BY) {
      setGroupBy('');
      setIntermediateGroupBy('');
    }
    fetchTransactions(
      handleParams({
        transactionType: key === filterTypes.TRANSACTION_TYPE ? '' : transactionType,
        category: key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY ? '' : category,
        subcategory:
          key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY || key === filterTypes.SUBCATEGORY ? '' : subcategory,
        groupBy: key === filterTypes.GROUP_BY ? '' : groupBy,
      })
    );
  };

  const onClearFilters = () => {
    setActive(false);
    setTransactionType('');
    setIntermediateTransactionType('');
    setCategory('');
    setIntermediateCategory('');
    setSubcategory('');
    setIntermediateSubcategory('');
    setGroupBy('');
    setIntermediateGroupBy('');
    fetchTransactions({});
  };

  return (
    <div className={styles.appliedFilters}>
      {transactionType && (
        <Pill
          id={filterTypes.TRANSACTION_TYPE}
          name={t('FILTERS.TRANSACTION_TYPE')}
          value={`${t(`FILTERS.${transactionType}`)}`}
          onRemovePill={onRemoveFilter}
        />
      )}
      {category && <Pill id={filterTypes.CATEGORY} name={t('FILTERS.CATEGORY')} value={category} onRemovePill={onRemoveFilter} />}
      {subcategory && (
        <Pill id={filterTypes.SUBCATEGORY} name={t('FILTERS.SUBCATEGORY')} value={subcategory} onRemovePill={onRemoveFilter} />
      )}
      {groupBy && (
        <Pill id={filterTypes.GROUP_BY} name={t('FILTERS.GROUP')} value={`${t(`FILTERS.${groupBy}`)}`} onRemovePill={onRemoveFilter} />
      )}
      {(transactionType || category || subcategory || groupBy) && (
        <Button size='md' kind='outline' onClick={onClearFilters} className={styles.appliedFilters__clear}>
          {t('FILTERS.CLEAR')}
        </Button>
      )}
    </div>
  );
};

export default AppliedFilters;
