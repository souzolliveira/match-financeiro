import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import useDate from 'hooks/useDate';
import useTime from 'hooks/useTime';
import { useTransactions } from 'hooks/useTransactions';

import Button from 'components/Button';
import Icon from 'components/Icon';

import Balance from './Balance/Balance';
import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = ({ isHome }) => {
  const { bindHour } = useTime();
  const { filters, lastUpdate, setIsHome, transactions } = useTransactions();
  const { formatDateFromAPIToFront } = useDate();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderTransactions = () => {
    if (isHome) return transactions?.slice(0, 3);
    return transactions;
  };

  useEffect(() => {
    setIsHome(isHome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  return (
    <div className={styles.transactions}>
      <div className={styles.transactions__header}>
        <h3 className={styles.transactions__title}>{t('TRANSACTIONS')}</h3>
        {transactions.length > 0 && (
          <span className={styles.transactions__lastupdate}>{t('TRANSACTIONS.LAST.UPDATE', { date: formatDateFromAPIToFront(lastUpdate), time: bindHour(lastUpdate) })}</span>
        )}
      </div>
      <div className={styles.transactions__container}>
        {!isHome && (
          <>
            <div className={styles.transactions__line} />
            <Balance />
          </>
        )}
        {transactions.length ? (
          <ul className={`${styles.transactions__list} ${isHome ? styles.transactions__listHeight : ''}`}>
            {renderTransactions()?.map((transaction, index) => {
              return (
                <Transaction key={index} transaction={transaction} disabled={isHome || filters.groupBy}>
                  {transaction.observation}
                </Transaction>
              );
            })}
          </ul>
        ) : (
          <div className={`${styles.transactions__empty} ${isHome ? styles.transactions__listHeight : ''}`}>
            <Icon name='list' width={128} height={128} fill='var(--gold-dark)' />
            <span className={styles.transactions__emptylabel}>{t('TRANSACTIONS.EMPTY')}</span>
          </div>
        )}
      </div>
      {!isHome && (
        <Button type='button' kind='primary' className={styles.transactions__add} onClick={() => navigate('/add')}>
          <Icon name='plus' width={24} height={24} fill='var(--gold-lightest)' />
        </Button>
      )}
    </div>
  );
};

export default Transactions;
