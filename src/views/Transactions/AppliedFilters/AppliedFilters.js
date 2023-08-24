import React from 'react';

import { useTranslation } from 'react-i18next';

import filterTypes from 'constants/filterTypes';
import useDate from 'hooks/useDate';
import { useTransactions } from 'hooks/useTransactions';

import Button from 'components/Button';
import Pill from 'components/Pill/Pill';

import styles from './AppliedFilters.module.scss';

const AppliedFilters = () => {
  const { t } = useTranslation();
  const { formatDateFromAPIToFront } = useDate();
  const { filters, onRemoveFilter, onClearFilters } = useTransactions();

  return (
    <div className={styles.appliedFilters}>
      {filters.startDate && <Pill id={filterTypes.START_DATE} name={t('FILTERS.DATE.START')} value={formatDateFromAPIToFront(filters.startDate)} onRemovePill={onRemoveFilter} />}
      {filters.endDate && <Pill id={filterTypes.END_DATE} name={t('FILTERS.DATE.END')} value={formatDateFromAPIToFront(filters.endDate)} onRemovePill={onRemoveFilter} />}
      {filters.transactionType && (
        <Pill id={filterTypes.TRANSACTION_TYPE} name={t('FILTERS.TRANSACTION_TYPE')} value={`${t(`FILTERS.${filters.transactionType}`)}`} onRemovePill={onRemoveFilter} />
      )}
      {filters.category && <Pill id={filterTypes.CATEGORY} name={t('FILTERS.CATEGORY')} value={filters.category} onRemovePill={onRemoveFilter} />}
      {filters.subcategory && <Pill id={filterTypes.SUBCATEGORY} name={t('FILTERS.SUBCATEGORY')} value={filters.subcategory} onRemovePill={onRemoveFilter} />}
      {filters.groupBy && <Pill id={filterTypes.GROUP_BY} name={t('FILTERS.GROUP')} value={`${t(`FILTERS.${filters.groupBy}`)}`} onRemovePill={onRemoveFilter} />}
      {(filters.startDate || filters.endDate || filters.transactionType || filters.category || filters.subcategory || filters.groupBy) && (
        <Button size='md' kind='outline' onClick={onClearFilters} className={styles.appliedFilters__clear}>
          {t('FILTERS.CLEAR')}
        </Button>
      )}
    </div>
  );
};

export default AppliedFilters;
