import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import transactionService from 'services/transaction.service';

import Icon from 'components/Icon/Icon';

import Add from './Add/Add';
import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = () => {
  const { t } = useTranslation();
  const { handleError } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const [isAddTransactionFormOpened, setIsAddTransactionFormOpened] = useState(false);

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
      <div className={styles.transactions__header}>
        <h3 className={styles.transactions__title}>{t('TRANSACTIONS')}</h3>
        {!!transactions.length && (
          <span className={styles.transactions__count}>{t('TRANSACTIONS.COUNT', { count: transactions.length })}</span>
        )}
      </div>
      {transactions.length ? (
        <ul className={styles.transactions__list}>
          {transactions.map((transaction, index) => {
            return (
              <Transaction key={index} transaction={transaction}>
                {transaction.observation}
              </Transaction>
            );
          })}
        </ul>
      ) : (
        <div className={styles.transactions__empty}>
          <Icon name='list' width={128} height={128} fill='var(--gold-dark)' />
          <span className={styles.transactions__emptylabel}>{t('TRANSACTIONS.EMPTY')}</span>
        </div>
      )}
      <Add
        isAddTransactionFormOpened={isAddTransactionFormOpened}
        setIsAddTransactionFormOpened={setIsAddTransactionFormOpened}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;
