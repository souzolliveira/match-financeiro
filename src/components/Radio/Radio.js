import React from 'react';

import styles from './Radio.module.scss';

const Radio = ({ reference, value, onChange, label, name }) => {
  return (
    <div className={styles.radio__container} onClick={() => onChange(value)} onKeyDown={() => onChange(value)} role='button' tabIndex={0}>
      <input
        className={styles.radio__input}
        type='radio'
        name={name}
        value={value}
        checked={reference === value}
        onChange={() => onChange(value)}
      />
      <span className={styles.radio__label}>{label}</span>
    </div>
  );
};

export default Radio;
