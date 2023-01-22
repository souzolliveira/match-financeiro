import moment from 'moment';
import { useState, useEffect } from 'react';

const useTime = () => {
  const [timeFormat, setTimeFormat] = useState('24h');

  const changeTimeFormat = format => {
    window.localStorage.setItem('time', format);
    setTimeFormat(format);
  };

  const bindHour = hour => {
    const h = moment(hour, 'YYYY-MM-DD-HH-mm-ss');
    const currentTime = window.localStorage.getItem('time');
    if (currentTime) {
      if (currentTime === '24h') return h.format('HH:mm');

      return h.format('hh:mm A');
    }
    return h.format('HH:mm');
  };

  useEffect(() => {
    const currentTime = window.localStorage.getItem('time');
    if (currentTime) {
      window.localStorage.setItem('time', currentTime);
      setTimeFormat(currentTime);
    } else {
      window.localStorage.setItem('time', '24h');
      setTimeFormat('24h');
    }
  }, []);

  return {
    timeFormat,
    changeTimeFormat,
    bindHour,
  };
};

export default useTime;
