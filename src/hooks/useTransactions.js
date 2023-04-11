/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext, useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import filterTypes from 'constants/filterTypes';
import groupByTypes from 'constants/groupByTypes';
import convertToFloat from 'helpers/convertToFloat';
import handleParams from 'helpers/handleParams';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import { useAuth } from './useAuth';
import useDate from './useDate';
import { useLoader } from './useLoader';
import { useNotification } from './useNotification';

const TransactionsContext = createContext({});

const TransactionsProvider = ({ children }) => {
  const { addToast } = useNotification();
  const { handleError } = useAuth();
  const { t } = useTranslation();
  const { setIsLoading } = useLoader();
  const { getFirstDayOfMonth, getLastDayOfMonth, formatDateFromFrontToAPI } = useDate();

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investiments, setInvestiments] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');

  const defaultFilters = {
    startDate: '',
    endDate: '',
    transactionType: '',
    category: '',
    subcategory: '',
    groupBy: '',
  };
  const [filters, setFilters] = useState({ ...defaultFilters });
  const [intermediateFilters, setIntermediateFilters] = useState({ ...defaultFilters });

  const [isHome, setIsHome] = useState(false);
  const [isAddTransactionFormOpened, setIsAddTransactionFormOpened] = useState(false);
  const [isFiltersTabOpened, setIsFiltersTabOpened] = useState(false);

  const fetchTransactions = async params => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ params, handleError })
      .then(data => {
        setTransactions(data.data);
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

    return () => {
      setFilters({ ...defaultFilters });
      setIntermediateFilters({ ...defaultFilters });
      setTransactions([]);
      setCategories([]);
      setSubcategories([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveFilter = key => {
    setIsFiltersTabOpened(false);
    setTimeout(() => {
      setFilters(state => ({
        ...state,
        [key]: '',
        category: key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY ? '' : filters.category,
        subcategory:
          key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY || key === filterTypes.SUBCATEGORY
            ? ''
            : filters.subcategory,
      }));
      setIntermediateFilters(state => ({
        ...state,
        [key]: '',
        category: key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY ? '' : filters.category,
        subcategory:
          key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY || key === filterTypes.SUBCATEGORY
            ? ''
            : filters.subcategory,
      }));
      fetchTransactions(
        handleParams(
          {
            ...filters,
            [key]: '',
            category: key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY ? '' : filters.category,
            subcategory:
              key === filterTypes.TRANSACTION_TYPE || key === filterTypes.CATEGORY || key === filterTypes.SUBCATEGORY
                ? ''
                : filters.subcategory,
          },
          formatDateFromFrontToAPI
        )
      );
    });
  };

  const onClearFilters = () => {
    setIsFiltersTabOpened(false);
    setFilters({ ...defaultFilters });
    setIntermediateFilters({ ...defaultFilters });
    if (isHome)
      fetchTransactions(
        handleParams({
          startDate: getFirstDayOfMonth(),
          endDate: getLastDayOfMonth(),
          groupBy: groupByTypes.TRANSACTION_TYPE,
        })
      );
    else fetchTransactions();
  };

  useEffect(() => {
    if (isHome) onClearFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  return (
    <TransactionsContext.Provider
      value={{
        fetchTransactions,
        fetchCategories,
        fetchSubcategories,
        transactions,
        setTransactions,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
        balance,
        setBalance,
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        investiments,
        setInvestiments,
        lastUpdate,
        setLastUpdate,
        filters,
        setFilters,
        intermediateFilters,
        setIntermediateFilters,
        setIsHome,
        isFiltersTabOpened,
        setIsFiltersTabOpened,
        isAddTransactionFormOpened,
        setIsAddTransactionFormOpened,
        onRemoveFilter,
        onClearFilters,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('use context must be used within SectionProvider');
  return context;
}

export { TransactionsProvider, useTransactions };
