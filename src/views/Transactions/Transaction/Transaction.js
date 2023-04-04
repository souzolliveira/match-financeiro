/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import bindTransactionTypeIcon from 'helpers/bindTransactionTypeIcon';
import bindTransactionTypeIconColor from 'helpers/bindTransactionTypeIconColor';
import useDate from 'hooks/useDate';

import Icon from 'components/Icon/Icon';

import Details from './Details/Details';

import styles from './Transaction.module.scss';

const Transaction = ({ transaction, categories, subcategories, fetchTransactions, disabled }) => {
  const { formatDateFromAPIToFront } = useDate();
  const { t } = useTranslation();

  const [showDetails, setShowDetails] = useState(false);

  const renderHeader = () => {
    if (transaction.observation) return transaction.observation;
    if (transaction.subcategory) return `${transaction.category} - ${transaction.subcategory}`;
    if (transaction.category) return transaction.category;
    return t(`TRANSACTION_TYPE.${transaction.transaction_type}`);
  };

  return (
    <>
      <li
        className={styles.transaction}
        onClick={() => {
          if (disabled) return;
          setShowDetails(true);
        }}
        onKeyDown={() => {
          if (disabled) return;
          setShowDetails(true);
        }}
        role='button'
        tabIndex={0}
      >
        <div className={styles.transaction__type}>
          <Icon
            name={bindTransactionTypeIcon(transaction.transaction_type)}
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
      {showDetails && (
        <Details
          transaction={transaction}
          setShowDetails={setShowDetails}
          categories={categories}
          subcategories={subcategories}
          fetchTransactions={fetchTransactions}
        />
      )}
    </>
  );
};

export default Transaction;
