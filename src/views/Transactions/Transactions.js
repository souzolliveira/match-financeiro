import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import convertNumbers from 'helpers/convertNumbers';
import { useAuth } from 'hooks/useAuth';
import { useLoader } from 'hooks/useLoader';
import { useNotification } from 'hooks/useNotification';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import Icon from 'components/Icon/Icon';

import Add from './Add/Add';
import Balance from './Balance/Balance';
import Transaction from './Transaction/Transaction';

import styles from './Transactions.module.scss';

const Transactions = () => {
  const { t } = useTranslation();
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { setIsLoading } = useLoader();

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investiments, setInvestiments] = useState(0);

  const [isAddTransactionFormOpened, setIsAddTransactionFormOpened] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ handleError })
      .then(data => {
        setTransactions(data.data);
        setBalance(convertNumbers.convertToFloat(data.balance));
        setIncomes(convertNumbers.convertToFloat(data.income));
        setExpenses(convertNumbers.convertToFloat(data.expense));
        setInvestiments(convertNumbers.convertToFloat(data.investiment));
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
          <Balance
            balance={balance}
            incomes={incomes}
            expenses={expenses}
            investiments={investiments}
            categories={categories}
            subcategories={subcategories}
          />
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
        fetchCategories={fetchCategories}
        categories={categories}
        fetchSubcategories={fetchSubcategories}
        subcategories={subcategories}
      />
    </div>
  );
};

export default Transactions;
