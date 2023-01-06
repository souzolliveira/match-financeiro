import React, { useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import transactionService from 'services/transaction.service';

import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = () => {
  const { handleError } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    await transactionService
      .listTransactions({ handleError })
      .then(data => {
        setTransactions(data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.transactions}>
      <ul className={styles.transactions__list}>
        {transactions.map((transaction, index) => {
          return (
            <Transaction key={index} transaction={transaction}>
              {transaction.observation}
            </Transaction>
          );
        })}
      </ul>
    </div>
  );
};

export default Transactions;
