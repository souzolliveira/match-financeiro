import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';

import Input from 'components/Input/Input';

import styles from './Calendar.module.scss';

const Calendar = ({ transactionDate, setTransactionDate, setStep }) => {
  const { t } = useTranslation();

  const [isChangedStep, setIsChangedStep] = useState(false);

  const handleChange = e => {
    setTransactionDate(e.target.value);
    setStep(steps.TYPE);
    setIsChangedStep(true);
  };

  return (
    <>
      <div className={`${styles.calendar} ${isChangedStep ? styles.calendar__top : ''}`}>
        <span className={styles.calendar__label}>{t('CALENDAR.LABEL')}</span>
        <Input type='date' name='transaction-date' value={transactionDate} onChange={e => handleChange(e)} />
      </div>
      <div className={isChangedStep ? styles.calendar__selected : styles.calendar__unselected}>
        <span className={styles.calendar__label}>{t('CALENDAR.LABEL')}</span>
        <Input
          className={styles.calendar__input}
          type='date'
          name='transaction-date'
          value={transactionDate}
          onChange={e => handleChange(e)}
        />
      </div>
    </>
  );
};

export default Calendar;
