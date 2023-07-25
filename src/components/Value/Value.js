import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Input from 'components/Input';

import styles from './Value.module.scss';

const Value = ({ value, setValue }) => {
  const { t } = useTranslation();

  const [focused, setFocused] = useState(false);

  const handleChange = data => {
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseFloat(data))) {
      setValue(state => parseFloat(state * 10 + parseFloat(data) / 100).toFixed(2));
    }
  };

  const handleKeyDown = e => {
    if (focused)
      if (e.key === 'Backspace') {
        setValue(state => parseFloat(state / 10).toFixed(2));
      }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={styles.value}>
      <span className={styles.value__label}>{t('VALUE.LABEL')}</span>
      <div className={styles.value__inputcontainer}>
        <Input
          className={styles.value__input}
          id='value'
          name='value'
          type='number'
          value=''
          onInput={e => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
        />
        <div className={styles.value__showcontainer}>
          <span className={styles.value__show}>{value.replace('.', ',')}</span>
          <div className={focused ? styles.value__cursor : ''} />
        </div>
      </div>
    </div>
  );
};

export default Value;
