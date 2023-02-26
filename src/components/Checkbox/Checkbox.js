/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({ checked, className, disabled }) => {
  const classes = [styles.container, className].join(' ');
  return (
    <label className={classes}>
      <input
        type='checkbox'
        onClick={e => {
          e.stopPropagation();
        }}
        onChange={e => {
          e.stopPropagation();
        }}
        checked={checked}
        disabled={disabled}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Checkbox;
