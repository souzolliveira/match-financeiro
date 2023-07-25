/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext, useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import filterTypes from 'constants/filterTypes';
import groupByTypes from 'constants/groupByTypes';
import convertToFloat from 'helpers/convertToFloat';
import handleParams from 'helpers/handleParams';
import assetService from 'services/asset.service';
import cardService from 'services/card.service';
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
  const [assets, setAssets] = useState([]);
  const [cards, setCards] = useState([]);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [expensesFixed, setExpensesFixed] = useState(0);
  const [expensesVariable, setExpensesVariable] = useState(0);
  const [investiments, setInvestiments] = useState(0);
  const [redemptions, setRedemptions] = useState(0);
  const [dividends, setDividends] = useState(0);
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
  const [isFiltersTabOpened, setIsFiltersTabOpened] = useState(false);

  const fetchTransactions = async params => {
    setIsLoading(true);
    await transactionService
      .listTransactions({ params, handleError })
      .then(data => {
        setTransactions(data.data);
        setBalance(convertToFloat(data.balance));
        setIncomes(convertToFloat(data.incomes));
        setExpenses(convertToFloat(data.expenses));
        setExpensesFixed(convertToFloat(data.expenses_fixed));
        setExpensesVariable(convertToFloat(data.expenses_variable));
        setInvestiments(convertToFloat(data.investiments));
        setRedemptions(convertToFloat(data.redemptions));
        setDividends(convertToFloat(data.dividends));
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

  const fetchAssets = async () => {
    setIsLoading(true);
    await assetService
      .list({
        handleError,
      })
      .then(data => {
        setAssets(data);
      })
      .catch(() => {
        addToast({
          content: t('ASSETS.FETCH.ERROR'),
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCards = async () => {
    setIsLoading(true);
    await cardService
      .list({ handleError })
      .then(data => data.data)
      .then(data => setCards(data))
      .catch(() => {
        addToast({
          content: t('CARDS.FETCH.ERROR'),
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
    fetchCards();
    fetchAssets();

    return () => {
      setFilters({ ...defaultFilters });
      setIntermediateFilters({ ...defaultFilters });
      setTransactions([]);
      setCategories([]);
      setSubcategories([]);
      setAssets([]);
      setCards([]);
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
        handleParams(
          {
            startDate: getFirstDayOfMonth(),
            endDate: getLastDayOfMonth(),
            groupBy: groupByTypes.TRANSACTION_TYPE,
          },
          formatDateFromFrontToAPI
        )
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
        fetchCards,
        fetchAssets,
        transactions,
        setTransactions,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
        assets,
        setAssets,
        cards,
        setCards,
        balance,
        setBalance,
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        expensesFixed,
        expensesVariable,
        investiments,
        setInvestiments,
        redemptions,
        setRedemptions,
        dividends,
        setDividends,
        lastUpdate,
        setLastUpdate,
        filters,
        setFilters,
        intermediateFilters,
        setIntermediateFilters,
        setIsHome,
        isFiltersTabOpened,
        setIsFiltersTabOpened,
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
