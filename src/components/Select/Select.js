import React from 'react';

import styles from './Select.module.scss';

const Select = ({ name, defaultValue, value, className, children, onChange, disabled }) => {
  const classes = [styles.select, className].join(' ');

  return (
    <select name={name} value={value || ''} defaultValue={defaultValue} className={classes} onChange={onChange} disabled={disabled}>
      {children}
    </select>
  );
};

export default Select;
