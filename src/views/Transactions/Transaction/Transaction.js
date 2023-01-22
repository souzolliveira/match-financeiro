import React from 'react';

import { useTranslation } from 'react-i18next';

import bindTransactionTypeIconColor from 'helpers/bindTransactionTypeIconColor';
import useDate from 'hooks/useDate';

import Icon from 'components/Icon/Icon';

import styles from './Transaction.module.scss';

const Transaction = ({ transaction }) => {
  const { t } = useTranslation();
  const { formatDateFromAPIToFront } = useDate();

  const renderHeader = () => {
    if (transaction.observation) return transaction.observation;
    if (transaction.subcategory) return `${transaction.category} - ${transaction.subcategory}`;
    if (transaction.category) return transaction.category;
    return t(`TRANSACTION_TYPE.${transaction.transaction_type}`);
  };

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
        <span className={styles.transaction__header}>{renderHeader()}</span>
        <div className={styles.transaction__main}>
          <span className={styles.transaction__value}>R$ {transaction.value}</span>
          <span className={styles.transaction__date}>{formatDateFromAPIToFront(transaction.transaction_date)}</span>
        </div>
      </div>
    </li>
  );
};

export default Transaction;
