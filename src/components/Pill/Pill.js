import React from 'react';

import Icon from 'components/Icon/Icon';

import styles from './Pill.module.scss';

const Pill = ({ id, name, value, className, onRemovePill }) => {
  const classes = [styles.pill, className].join(' ');

  return (
    <div className={classes}>
      <span className={styles.pill__key}>{name}</span>
      <span className={styles.pill__value}>{value}</span>
      <button type='button' className={styles.pill__close} onClick={() => onRemovePill(id)}>
        <Icon name='close' width={20} height={20} fill='var(--gold-darker)' />
      </button>
    </div>
  );
};

export default Pill;
