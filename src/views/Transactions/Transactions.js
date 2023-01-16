import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import transactionService from 'services/transaction.service';

import Icon from 'components/Icon/Icon';

import Add from './Add/Add';
import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = () => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const [isAddTransactionFormOpened, setIsAddTransactionFormOpened] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ handleError })
      .then(data => {
        setTransactions(data.data);
        setBalance(data.balance);
      })
      .catch(() => {
        addToast({
          content: t('TRANSACTIONS.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        <div className={styles.transactions__container}>
          <ul className={styles.transactions__list}>
            {transactions.map((transaction, index) => {
              return (
                <Transaction key={index} transaction={transaction}>
                  {transaction.observation}
                </Transaction>
              );
            })}
          </ul>
          <div className={styles.transactions__balance}>
            <span className={styles.transactions__label}>{t('TRANSACTIONS.BALANCE')}</span>
            <span className={styles.transactions__difference}>R$ {balance}</span>
          </div>
        </div>
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
