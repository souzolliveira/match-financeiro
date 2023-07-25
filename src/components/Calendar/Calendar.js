import moment from 'moment';
import React, { useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { useTranslation } from 'react-i18next';

import useDate from 'hooks/useDate';

import styles from './Calendar.module.scss';

const Calendar = ({ date, setDate }) => {
  const { t } = useTranslation();
  const { formatDateInFiltersInput, getDateFormat, formatDateFromFrontToAPI } = useDate();

  const [focused, setFocused] = useState(false);

  const handleDate = dt => {
    if (dt && moment(dt, formatDateFromFrontToAPI()).isValid()) {
      return moment(dt, formatDateFromFrontToAPI());
    }
    return null;
  };

  return (
    <div className={styles.calendar}>
      <span className={styles.calendar__label}>{t('CALENDAR.LABEL')}</span>
      <SingleDatePicker
        id='afterDate'
        placeholder={t(`FILTERS.DATE.${getDateFormat()}`)}
        date={handleDate(date)}
        onDateChange={dt => setDate(dt)}
        focused={focused}
        onFocusChange={({ focused: dateFocused }) => setFocused(dateFocused)}
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
  );
};

export default Calendar;
