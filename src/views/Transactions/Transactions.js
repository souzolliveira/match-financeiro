import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import steps from 'constants/steps';
import { useAuth } from 'hooks/useAuth';
import categoryService from 'services/category.service';
import subcategoryService from 'services/subcategory.service';
import transactionService from 'services/transaction.service';

import Button from 'components/Button/Button';
import Calendar from 'components/Calendar/Calendar';
import Categories from 'components/Categories/Categories';
import Confirm from 'components/Confirm/Confirm';
import Observation from 'components/Observation/Observation';
import Subcategories from 'components/Subcategories/Subcategories';
import TransactionType from 'components/TransactionType/TransactionType';
import Value from 'components/Value/Value';

import styles from './Transactions.module.scss';

const Transactions = () => {
  const { handleError } = useAuth();
  const { t } = useTranslation();

  const [transactionType, setTransactionType] = useState('');
  const [step, setStep] = useState(steps.TYPE);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionObservation, setTransactionObservation] = useState('');

  const fetchCategories = async () => {
    await categoryService
      .listCategory({ transactionType, handleError })
      .then(data => {
        setCategories(data);
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    if (transactionType) fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType]);

  const fetchSubcategories = async () => {
    await subcategoryService
      .listSubcategory({
        transactionType,
        categoryName: selectedCategory,
        handleError,
      })
      .then(data => {
        setSubcategories(data);
      })
      .catch()
      .finally();
  };

  useEffect(() => {
    if (selectedCategory) fetchSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType, selectedCategory]);

  const handleSubmit = async e => {
    e.preventDefault();
    await transactionService
      .createTransaction({
        transactionType,
        categoryName: selectedCategory,
        subcategoryName: selectedSubcategory,
        transactionDate,
        transactionValue,
        transactionObservation,
      })
      .then(data => {
        console.log(data);
      })
      .catch()
      .finally();
  };

  return (
    <form className={styles.transactions} onSubmit={e => handleSubmit(e)}>
      <TransactionType transactionType={transactionType} setTransactionType={setTransactionType} setStep={setStep} />
      <Calendar transactionDate={transactionDate} setTransactionDate={setTransactionDate} step={step} setStep={setStep} />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        step={step}
        setStep={setStep}
      />
      <Subcategories
        subcategories={subcategories}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        step={step}
        setStep={setStep}
      />
      <Value transactionValue={transactionValue} setTransactionValue={setTransactionValue} step={step} setStep={setStep} />
      <Observation
        transactionObservation={transactionObservation}
        setTransactionObservation={setTransactionObservation}
        step={step}
        setStep={setStep}
      />
      <Confirm step={step} />
    </form>
  );
};

export default Transactions;