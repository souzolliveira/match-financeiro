import React from 'react';

import bindTransactionTypeIconColor from 'helpers/bindTransactionTypeIconColor';
import useDate from 'hooks/useDate';

import Icon from 'components/Icon/Icon';

import styles from './Transaction.module.scss';

const Transaction = ({ transaction }) => {
  const { formatDateFromAPIToFront } = useDate();

  return (
    <li className={styles.transaction}>
      <div className={styles.transaction__type}>
        <Icon
          name={transaction.transaction_type?.toLowerCase()}
          width={24}
          height={24}
          fill={bindTransactionTypeIconColor(transaction.transaction_type)}
        />
      </div>
      <div className={styles.transaction__infos}>
        <div className={styles.transaction__header}>{transaction.observation}</div>
        <div className={styles.transaction__main}>
          <div>R$ {transaction.value}</div>
          <div>{formatDateFromAPIToFront(transaction.date)}</div>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
