import moment from 'moment';
import React, { useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { useTranslation } from 'react-i18next';

import filterTypes from 'constants/filterTypes';
import groupByTypes from 'constants/groupByTypes';
import transactionTypes from 'constants/transactionTypes';
import handleParams from 'helpers/handleParams';
import useDate from 'hooks/useDate';
import { useTransactions } from 'hooks/useTransactions';

import Button from 'components/Button';
import Select from 'components/Select';

import AppliedFilters from '../AppliedFilters/AppliedFilters';

import styles from './Filters.module.scss';

const Filters = () => {
  const { formatDateInFiltersInput, getDateFormat, formatDateFromFrontToAPI } = useDate();
  const { t } = useTranslation();
  const { categories, subcategories, setFilters, intermediateFilters, setIntermediateFilters, fetchTransactions, setIsFiltersTabOpened } =
    useTransactions();

  const [focusedStartDate, setFocusedStartDate] = useState(false);
  const [focusedEndDate, setFocusedEndDate] = useState(false);

  const handleFilter = () => {
    setIsFiltersTabOpened(false);
    setFilters({ ...intermediateFilters });
    fetchTransactions(handleParams({ ...intermediateFilters }, formatDateFromFrontToAPI));
  };

  const date = dt => {
    if (dt && moment(dt, formatDateInFiltersInput()).isValid()) {
      return moment(dt, formatDateInFiltersInput());
    }
    return null;
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.DATE.START')}:</span>
        <SingleDatePicker
          id='startDate'
          placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
          date={date(intermediateFilters.startDate)}
          onDateChange={dt =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.START_DATE]: dt,
            }))
          }
          focused={focusedStartDate}
          onFocusChange={({ focused: startDateFocus }) => setFocusedStartDate(startDateFocus)}
          numberOfMonths={1}
          small
          showClearDate
          hideKeyboardShortcutsPanel
          isOutsideRange={() => false}
          initialVisibleMonth={() => moment()}
          displayFormat={formatDateInFiltersInput()}
          readOnly
        />
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.DATE.END')}:</span>
        <SingleDatePicker
          id='endDate'
          placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
          date={date(intermediateFilters.endDate)}
          onDateChange={dt =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.END_DATE]: dt,
            }))
          }
          focused={focusedEndDate}
          onFocusChange={({ focused: endDateFocus }) => setFocusedEndDate(endDateFocus)}
          numberOfMonths={1}
          small
          showClearDate
          hideKeyboardShortcutsPanel
          isOutsideRange={() => false}
          initialVisibleMonth={() => moment()}
          displayFormat={formatDateInFiltersInput()}
          readOnly
        />
      </div>
      <div className={styles.filters__group}>
        <span className={styles.filters__label}>{t('FILTERS.TRANSACTION_TYPE')}:</span>
        <Select
          className={styles.filters__select}
          value={intermediateFilters.transactionType}
          onChange={e =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.TRANSACTION_TYPE]: e.target.value,
              [filterTypes.CATEGORY]: '',
              [filterTypes.SUBCATEGORY]: '',
            }))
          }
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
          value={intermediateFilters.category}
          onChange={e =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.CATEGORY]: e.target.value,
              [filterTypes.SUBCATEGORY]: '',
            }))
          }
          disabled={intermediateFilters.transactionType === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {categories
            .filter(cat => cat.transaction_type === intermediateFilters.transactionType)
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
          value={intermediateFilters.subcategory}
          onChange={e =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.SUBCATEGORY]: e.target.value,
            }))
          }
          disabled={intermediateFilters.category === ''}
        >
          <option value='' disabled>
            {t('SELECT')}
          </option>
          {subcategories
            .filter(subcat => subcat.category_name === intermediateFilters.category)
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
        <Select
          className={styles.filters__select}
          value={intermediateFilters.groupBy}
          onChange={e =>
            setIntermediateFilters(state => ({
              ...state,
              [filterTypes.GROUP_BY]: e.target.value,
            }))
          }
        >
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
      <AppliedFilters />
    </div>
  );
};

export default Filters;
