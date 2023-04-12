import moment from 'moment';
import React, { useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import useDate from 'hooks/useDate';

import Input from 'components/Input/Input';

import styles from './Calendar.module.scss';

const Calendar = ({ transactionDate, setTransactionDate, step, setStep }) => {
  const { t } = useTranslation();
  const { formatDateInFiltersInput, getDateFormat, formatDateFromFrontToAPI } = useDate();

  const [isChangedStep, setIsChangedStep] = useState(false);
  const [flowFocused, setFlowFocused] = useState(false);
  const [afterFocused, setAfterFocused] = useState(false);

  const handleChange = dt => {
    setTransactionDate(dt);
    if (step !== steps.DATE) return;
    setStep(steps.TYPE);
    setIsChangedStep(true);
  };

  const date = dt => {
    if (dt && moment(dt, formatDateFromFrontToAPI()).isValid()) {
      return moment(dt, formatDateFromFrontToAPI());
    }
    return null;
  };

  return (
    <>
      <div className={`${styles.calendar} ${isChangedStep ? styles.calendar__top : ''}`}>
        <span className={styles.calendar__label}>{t('CALENDAR.LABEL')}</span>
        <SingleDatePicker
          id='flowDate'
          placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
          date={date(transactionDate)}
          onDateChange={dt => handleChange(dt)}
          focused={flowFocused}
          onFocusChange={({ focused: dateFocused }) => setFlowFocused(dateFocused)}
          numberOfMonths={1}
          small
          showClearDate
          hideKeyboardShortcutsPanel
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          initialVisibleMonth={() => moment()}
          displayFormat={formatDateInFiltersInput()}
          readOnly
          openDirection='up'
        />
      </div>
      <div className={isChangedStep ? styles.calendar__selected : styles.calendar__unselected}>
        <span className={styles.calendar__label}>{t('CALENDAR.LABEL')}</span>
        <SingleDatePicker
          id='afterDate'
          placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
          date={date(transactionDate)}
          onDateChange={dt => handleChange(dt)}
          focused={afterFocused}
          onFocusChange={({ focused: dateFocused }) => setAfterFocused(dateFocused)}
          numberOfMonths={1}
          small
          showClearDate
          hideKeyboardShortcutsPanel
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          initialVisibleMonth={() => moment()}
          displayFormat={formatDateInFiltersInput()}
          readOnly
        />
      </div>
    </>
  );
};

export default Calendar;
