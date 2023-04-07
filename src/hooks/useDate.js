import moment from 'moment';
import { useState, useEffect } from 'react';

const useDate = () => {
  const [dateFormat, setDateFormat] = useState('L');

  const getMonth = () => {
    const date = new Date();
    return new Intl.DateTimeFormat(window.localStorage.getItem('locale'), { month: 'long' }).format(date);
  };

  const getFirstDayOfMonth = () => {
    return moment().startOf('month').format('YYYY-MM-DD');
  };

  const getLastDayOfMonth = () => {
    return moment().endOf('month').format('YYYY-MM-DD');
  };

  const getDateFormat = () => {
    const currentDateFormat = window.localStorage.getItem('date');
    return currentDateFormat || 'L';
  };

  const changeDateFormat = format => {
    window.localStorage.setItem('date', format);
    setDateFormat(format);
  };

  const formatDateFromPreviousToNewFormat = (date, previousFormat, newFormat) => {
    if (!date) return null;
    let formatedPreviousDate;
    let formatedNewDate;
    if (previousFormat === 'L') formatedPreviousDate = moment(date, 'DD/MM/YYYY');
    else if (previousFormat === 'M') formatedPreviousDate = moment(date, 'MM/DD/YYYY');
    else if (previousFormat === 'B') formatedPreviousDate = moment(date, 'YYYY/MM/DD');
    else formatedPreviousDate = moment(date, 'DD/MM/YYYY');
    if (newFormat === 'L') formatedNewDate = formatedPreviousDate.format('DD/MM/YYYY');
    else if (newFormat === 'M') formatedNewDate = formatedPreviousDate.format('MM/DD/YYYY');
    else if (newFormat === 'B') formatedNewDate = formatedPreviousDate.format('YYYY/MM/DD');
    else formatedNewDate = formatedPreviousDate.format('DD/MM/YYYY');

    return formatedNewDate;
  };

  const formatDateFromAPIToFront = date => {
    if (!date) return null;
    const d = moment(date, 'YYYY-MM-DD-HH-mm-ss');
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat) {
      if (currentDateFormat === 'L') return d.format('DD/MM/YYYY');
      if (currentDateFormat === 'M') return d.format('MM/DD/YYYY');
      if (currentDateFormat === 'B') return d.format('YYYY/MM/DD');
      return d.format('DD/MM/YYYY');
    }
    return d.format('DD/MM/YYYY');
  };

  const formatDateInFiltersInput = () => {
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat) {
      if (currentDateFormat === 'L') return 'DD/MM/YYYY';
      if (currentDateFormat === 'M') return 'MM/DD/YYYY';
      if (currentDateFormat === 'B') return 'YYYY/MM/DD';
      return 'DD/MM/YYYY';
    }
    return 'DD/MM/YYYY';
  };

  const formatDateFromFrontToAPI = date => {
    if (!date) return null;
    let dateMoment;
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat)
      if (currentDateFormat === 'L') {
        dateMoment = moment(date, 'DD/MM/YYYY');
      } else if (currentDateFormat === 'M') {
        dateMoment = moment(date, 'MM/DD/YYYY');
      } else if (currentDateFormat === 'B') {
        dateMoment = moment(date, 'YYYY/MM/DD');
      } else {
        dateMoment = moment(date, 'DD/MM/YYYY');
      }
    else dateMoment = moment(date, 'DD/MM/YYYY');

    return dateMoment.format('YYYY-MM-DD');
  };

  const formatDateFromFrontToAPIWithHours = date => {
    if (!date) return null;
    let dateMoment;
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat)
      if (currentDateFormat === 'L') {
        dateMoment = moment(date, 'DD/MM/YYYY-hh-mm-ss');
      } else if (currentDateFormat === 'M') {
        dateMoment = moment(date, 'MM/DD/YYYY-hh-mm-ss');
      } else if (currentDateFormat === 'B') {
        dateMoment = moment(date, 'YYYY/MM/DD-hh-mm-ss');
      } else {
        dateMoment = moment(date, 'DD/MM/YYYY-hh-mm-ss');
      }
    else dateMoment = moment(date, 'DD/MM/YYYY-hh-mm-ss');

    return dateMoment.format('YYYY-MM-DD-hh-mm-ss');
  };

  const formatDateFromURLToFilters = date => {
    if (!date) return null;
    const reverseDateMoment = moment(date, 'YYYY-MM-DD', true);
    if (!reverseDateMoment.isValid()) return moment.invalid().format();
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat) {
      if (currentDateFormat === 'L') return reverseDateMoment.format('DD/MM/YYYY');
      if (currentDateFormat === 'M') return reverseDateMoment.format('MM/DD/YYYY');
      if (currentDateFormat === 'B') return reverseDateMoment.format('YYYY/MM/DD');
      return reverseDateMoment.format('DD/MM/YYYY');
    }
    return reverseDateMoment.format('DD/MM/YYYY');
  };

  const regexDate = () => {
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat) {
      window.localStorage.setItem('date', currentDateFormat);
      setDateFormat(currentDateFormat);
      if (currentDateFormat === 'L') return '^([0-2][0-9]|(3)[0-1])([/])(((0)[0-9])|((1)[0-2]))([/])[1-2][0-9][0-9][0-9]';
      if (currentDateFormat === 'M') return '^(((0)[0-9])|((1)[0-2]))([/])([0-2][0-9]|(3)[0-1])([/])[1-2][0-9][0-9][0-9]';
      if (currentDateFormat === 'B') return '^[1-2][0-9][0-9][0-9]([/])(((0)[0-9])|((1)[0-2]))([/])([0-2][0-9]|(3)[0-1])';
      return '^([0-2][0-9]|(3)[0-1])([/])(((0)[0-9])|((1)[0-2]))([/])[1-2][0-9][0-9][0-9]';
    }
    return '^([0-2][0-9]|(3)[0-1])([/])(((0)[0-9])|((1)[0-2]))([/])[1-2][0-9][0-9][0-9]';
  };

  useEffect(() => {
    const currentDateFormat = window.localStorage.getItem('date');
    if (currentDateFormat) {
      window.localStorage.setItem('date', currentDateFormat);
      setDateFormat(currentDateFormat);
    } else {
      window.localStorage.setItem('date', 'L');
      setDateFormat(currentDateFormat);
    }
  }, []);

  return {
    dateFormat,
    getMonth,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getDateFormat,
    changeDateFormat,
    formatDateFromPreviousToNewFormat,
    formatDateFromAPIToFront,
    formatDateInFiltersInput,
    formatDateFromFrontToAPI,
    formatDateFromFrontToAPIWithHours,
    formatDateFromURLToFilters,
    regexDate,
  };
};

export default useDate;
