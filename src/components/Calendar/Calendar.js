import React from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';

import styles from './Calendar.module.scss';

const Calendar = ({ transactionDate, setTransactionDate, setStep }) => {
  const { t } = useTranslation();

  const handleChange = e => {
    setTransactionDate(e.target.value);
    setStep(steps.CATEGORY);
  };

  return (
    <div className={`${styles.calendar} ${transactionDate ? styles.selected : ''}`}>
      <span className={styles.categories__label}>{t('CALENDAR.LABEL')}</span>
      <input type='date' name='transaction-date' value={transactionDate} onChange={e => handleChange(e)} />
    </div>
  );
};

export default Calendar;
