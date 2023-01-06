import React from 'react';

import bindTransactionTypeIconColor from 'helpers/bindTransactionTypeIconColor';

import Icon from 'components/Icon/Icon';

import styles from './Transaction.module.scss';

const Transaction = ({ transaction }) => {
  return (
    <li className={styles.transaction}>
      <div className={styles.transaction__type}>
        <Icon
          name={transaction.transaction_type?.toLowerCase()}
          width={30}
          height={30}
          fill={bindTransactionTypeIconColor(transaction.transaction_type)}
        />
      </div>
      <div className={styles.transaction__infos}>
        <div className={styles.transaction__header}>{transaction.observation}</div>
        <div className={styles.transaction__main}>
          <div>{transaction.value}</div>
          <div>{transaction.date}</div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
