import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import convertToFloat from 'helpers/convertToFloat';
import { useAuth } from 'hooks/useAuth';
import useDate from 'hooks/useDate';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import useTime from 'hooks/useTime';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import Icon from 'components/Icon/Icon';

import Add from './Add/Add';
import Balance from './Balance/Balance';
import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = ({ hasFilters }) => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();
  const { formatDateFromAPIToFront } = useDate();
  const { bindHour } = useTime();

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investiments, setInvestiments] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  const [isAddTransactionFormOpened, setIsAddTransactionFormOpened] = useState(false);
  const [isFiltersTabOpened, setIsFiltersTabOpened] = useState(false);

  const fetchTransactions = async params => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ params, handleError })
      .then(data => {
        if (!hasFilters) {
          setTransactions(data.data.slice(0, 3));
        } else {
          setTransactions(data.data);
        }
        setBalance(convertToFloat(data.balance));
        setIncomes(convertToFloat(data.income));
        setExpenses(convertToFloat(data.expense));
        setInvestiments(convertToFloat(data.investiment));
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
    await transactionService.lastUpdate({ handleError }).then(data => {
      setLastUpdate(data?.date);
    });
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    await categoryService
      .listCategory({ handleError })
      .then(data => {
        setCategories(data);
      })
      .catch(() => {
        addToast({
          content: t('CATEGORIES.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchSubcategories = async () => {
    setIsLoading(true);
    await subcategoryService
      .listSubcategory({
        handleError,
      })
      .then(data => {
        setSubcategories(data);
      })
      .catch(() => {
        addToast({
          content: t('SUBCATEGORIES.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.transactions}>
      <div className={styles.transactions__header}>
        <h3 className={styles.transactions__title}>{t('TRANSACTIONS')}</h3>
        {transactions.length > 0 && (
          <span className={styles.transactions__lastupdate}>
            {t('TRANSACTIONS.LAST.UPDATE', { date: formatDateFromAPIToFront(lastUpdate), time: bindHour(lastUpdate) })}
          </span>
        )}
      </div>
      <div className={styles.transactions__container}>
        {hasFilters && (
          <>
            <div className={styles.transactions__line} />
            <Balance
              active={isFiltersTabOpened}
              setActive={setIsFiltersTabOpened}
              balance={balance}
              incomes={incomes}
              expenses={expenses}
              investiments={investiments}
              categories={categories}
              subcategories={subcategories}
              fetchTransactions={fetchTransactions}
            />
          </>
        )}
        {transactions.length ? (
          <ul className={`${styles.transactions__list} ${hasFilters ? '' : styles.transactions__listHeight}`}>
            {transactions.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  transaction={transaction}
                  categories={categories}
                  subcategories={subcategories}
                  fetchTransactions={fetchTransactions}
                >
                  {transaction.observation}
                </Transaction>
              );
            })}
          </ul>
        ) : (
          <div className={`${styles.transactions__empty} ${hasFilters ? '' : styles.transactions__listHeight}`}>
            <Icon name='list' width={128} height={128} fill='var(--gold-dark)' />
            <span className={styles.transactions__emptylabel}>{t('TRANSACTIONS.EMPTY')}</span>
          </div>
        )}
      </div>
      {hasFilters && (
        <Add
          isAddTransactionFormOpened={isAddTransactionFormOpened}
          setIsAddTransactionFormOpened={setIsAddTransactionFormOpened}
          fetchTransactions={fetchTransactions}
          fetchCategories={fetchCategories}
          categories={categories}
          fetchSubcategories={fetchSubcategories}
          subcategories={subcategories}
          setIsFiltersTabOpened={setIsFiltersTabOpened}
        />
      )}
    </div>
  );
};

export default Transactions;
